using RealEstate.DAL.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RealEstate.DAL.Entities;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Managers.FavoriteManager;
using RealEstate.BLL;
using Microsoft.OpenApi.Models;
using RealEstate.DAL.Persistance.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using FluentValidation;
using System.Reflection;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Add FluentValidation
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

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

builder.Services.AddIdentity<User, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<RealEstateDbContext>()
    .AddTokenProvider("RealEstate", typeof(DataProtectorTokenProvider<User>))
    .AddDefaultTokenProviders();

builder.Services.Configure<DefaultAdminSettings>(builder.Configuration.GetSection(nameof(DefaultAdminSettings)));
builder.Services.Configure<AccessTokenSettings>(builder.Configuration.GetSection(nameof(AccessTokenSettings)));

MapsterConfig.RegisterMappings();

builder.Services.AddScoped<PropertyManager, PropertyManager>();
builder.Services.AddScoped<UserManager, UserManager>();
builder.Services.AddScoped<InquiryManager, InquiryManager>();
builder.Services.AddScoped<AuthManager, AuthManager>();
builder.Services.AddScoped<FavoriteManager, FavoriteManager>();

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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
