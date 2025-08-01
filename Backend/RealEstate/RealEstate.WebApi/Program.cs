using RealEstate.DAL.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RealEstate.DAL.Entities;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Managers.FavoriteManager;
using RealEstate.BLL;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext
builder.Services.AddDbContext<RealEstateDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("REDatabase")));

// Add Identity
builder.Services.AddIdentity<User, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<RealEstateDbContext>()
    .AddDefaultTokenProviders();

// Configure Mapster
MapsterConfig.RegisterMappings();

// Add Managers
builder.Services.AddScoped<PropertyManager, PropertyManager>();
builder.Services.AddScoped<UserManager, UserManager>();
builder.Services.AddScoped<InquiryManager, InquiryManager>();
builder.Services.AddScoped<AuthManager, AuthManager>();
builder.Services.AddScoped<FavoriteManager, FavoriteManager>();

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
