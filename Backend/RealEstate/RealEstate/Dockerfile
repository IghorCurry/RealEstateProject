# Use the official .NET 8 runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Use the official .NET 8 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution file and project files
COPY ["RealEstate.sln", "./"]
COPY ["RealEstate/RealEstate.WebApi.csproj", "RealEstate/"]
COPY ["RealEstate.Core/RealEstate.DAL.csproj", "RealEstate.Core/"]
COPY ["RealEstate.Infrastructure/RealEstate.BLL.csproj", "RealEstate.Infrastructure/"]
COPY ["RealEstate.Tests/RealEstate.Tests.csproj", "RealEstate.Tests/"]

# Restore dependencies
RUN dotnet restore "RealEstate.sln"

# Copy the rest of the source code
COPY . .

# Build the solution
RUN dotnet build "RealEstate.sln" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "RealEstate/RealEstate.WebApi.csproj" -c Release -o /app/publish

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set the entry point
ENTRYPOINT ["dotnet", "RealEstate.WebApi.dll"]
