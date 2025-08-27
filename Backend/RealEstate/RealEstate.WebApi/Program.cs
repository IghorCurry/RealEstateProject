using RealEstate.DAL.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RealEstate.DAL.Entities;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Managers.BlobStorageManager;
using RealEstate.BLL;
using Microsoft.OpenApi.Models;
using RealEstate.DAL.Persistance.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using FluentValidation;
using System.Reflection;
using Serilog;
using RealEstate.WebApi.Validators.FavoriteValidators;
using RealEstate.WebApi.Validators.PropertyValidators;


var builder = WebApplication.CreateBuilder(args);

// Визначаємо середовище
var environment = builder.Configuration["Environment"] ?? "Development";
Console.WriteLine($"🚀 Starting application in {environment} environment");

// Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/app-.log", 
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 7)  
    .CreateLogger();

builder.Host.UseSerilog();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
        {
            // Дозволяємо localhost для розробки та Azure Static Web App
            return origin.StartsWith("http://localhost:") ||
                   origin.StartsWith("http://127.0.0.1:") ||
                   origin.StartsWith("https://real-estate-front-") ||
                   origin.StartsWith("https://white-desert-") ||
                   origin.StartsWith("https://witty-mushroom-"); // New Static Web App
        })
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

// FluentValidation
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

builder.Services.AddScoped<FavoriteCreateValidator>();
builder.Services.AddScoped<PropertyImageCreateValidator>();

builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "RealEstate", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

// Database connection
var dbConnectionString = builder.Configuration.GetConnectionString("REDatabase");
var azureStorageConnectionString = builder.Configuration.GetConnectionString("AzureStorage");

Console.WriteLine($"📊 Database: {(environment == "Production" ? "Azure PostgreSQL" : "Local PostgreSQL")}");
Console.WriteLine($"☁️ Storage: Azure Blob Storage");

builder.Services.AddDbContext<RealEstateDbContext>(options =>
    options.UseNpgsql(dbConnectionString));

builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
{
    // Налаштування вимог до паролів
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
    options.Password.RequiredUniqueChars = 1;
    
    // Налаштування користувача
    options.User.RequireUniqueEmail = true;
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
})
    .AddEntityFrameworkStores<RealEstateDbContext>()
    .AddTokenProvider("RealEstate", typeof(DataProtectorTokenProvider<User>))
    .AddDefaultTokenProviders();

builder.Services.Configure<DefaultAdminSettings>(builder.Configuration.GetSection(nameof(DefaultAdminSettings)));
builder.Services.Configure<AccessTokenSettings>(builder.Configuration.GetSection(nameof(AccessTokenSettings)));

MapsterConfig.RegisterMappings();


builder.Services.AddScoped<IPropertyManager, PropertyManager>();
builder.Services.AddScoped<IUserManager, UserManager>();
builder.Services.AddScoped<IInquiryManager, InquiryManager>();
builder.Services.AddScoped<IAuthManager, AuthManager>();
builder.Services.AddScoped<IFavoriteManager, FavoriteManager>();
builder.Services.AddScoped<IBlobStorageManager, BlobStorageManager>();

builder.Services.AddAuthorization(option =>
{
    option.AddPolicy("RequireAdmin", policy =>
    policy.RequireRole("Admin"));
    option.AddPolicy("RequireUser", policy =>
    policy.RequireRole("User"));
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero,

        ValidAudience = builder.Configuration["AccessTokenSettings:Audience"],
        ValidIssuer = builder.Configuration["AccessTokenSettings:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AccessTokenSettings:SigningKey"] ?? throw new InvalidOperationException("SigningKey is not configured")))
    };
});
builder.Services.AddHttpContextAccessor();


builder.Services.AddMemoryCache();
builder.Services.AddResponseCaching();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

// Use CORS
app.UseCors("AllowFrontend");


app.UseResponseCaching();


app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();


Log.CloseAndFlush();
// Test trigger
