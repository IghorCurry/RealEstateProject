using RealEstate.DAL.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RealEstate.DAL.Entities;
using RealEstate.BLL.Managers;
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
            // Дозволяємо тільки localhost для розробки
            return origin.StartsWith("http://localhost:") ||
                   origin.StartsWith("http://127.0.0.1:");
        })
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

// FluentValidation
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

// ВИПРАВЛЕНО: реєстрація валідаторів з залежностями
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

builder.Services.AddDbContext<RealEstateDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("REDatabase")));

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

// ВИПРАВЛЕНО: реєстрація інтерфейсів замість конкретних класів для правильної архітектури
builder.Services.AddScoped<IPropertyManager, PropertyManager>();
builder.Services.AddScoped<IUserManager, UserManager>();
builder.Services.AddScoped<IInquiryManager, InquiryManager>();
builder.Services.AddScoped<IAuthManager, AuthManager>();
builder.Services.AddScoped<IFavoriteManager, FavoriteManager>();

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

// ВИПРАВЛЕНО: додано кешування для покращення продуктивності
builder.Services.AddMemoryCache();
builder.Services.AddResponseCaching();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS
app.UseCors("AllowFrontend");

// ВИПРАВЛЕНО: додано кешування відповідей
app.UseResponseCaching();

// Add static files support for uploaded images
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

// Закриття логера при завершенні додатку
Log.CloseAndFlush();
# Test trigger
