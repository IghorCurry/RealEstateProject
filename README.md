Real Estate Listing Platform

A full-stack web application for managing and browsing real estate listings. Built with ASP.NET Core, React, PostgreSQL, and Docker.

Project Overview

This platform allows users to browse property listings, search and filter properties, contact agents, and provides an admin panel for managing listings.

Tech Stack

- Backend

- ASP.NET Core 8.0
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- RESTful API

Frontend

- React 18
- TypeScript
- Material-UI
- Vite

Development

- Docker
- Git
- Visual Studio / VS Code

Features

Public Features

- Browse property listings
- Search properties by location, price, type
- Filter by amenities
- View property details
- Contact form for inquiries
- Responsive design

Admin Features

- User authentication
- Property management
- Image upload
- User management
- Inquiry management
- Dashboard

Project Structure


RealEstatePlatform/
├── Backend/
│   ├── RealEstate.WebApi/
│   ├── RealEstate.BLL/
│   ├── RealEstate.DAL/
│   └── RealEstate.Tests/
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── docker-compose.yml
└── README.md


Database Schema

#Core Tables

- Properties: Property listings
- Users: Admin users and agents
- Inquiries: Contact form submissions
- PropertyImages: Images for properties
- Amenities: Property features
- PropertyAmenities: Property-amenity relationships

Getting Started

Prerequisites

- .NET 8.0 SDK
- Node.js 18+
- PostgreSQL
- Docker

Quick Start

```bash
# Clone repository
git clone [repository-url]
cd RealEstatePlatform

# Start with Docker
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

Manual Setup

Backend

```bash
cd Backend
dotnet restore
dotnet ef database update
dotnet run --project RealEstate.WebApi
```

Frontend

```bash
cd Frontend
npm install
npm start
```

API Endpoints

Public

- GET /api/properties - Get all properties
- GET /api/properties/{id} - Get property by ID
- GET /api/properties/search - Search properties
- POST /api/inquiries - Submit inquiry

Admin

- POST /api/auth/login - Admin login
- POST /api/properties - Create property
- PUT /api/properties/{id} - Update property
- DELETE /api/properties/{id} - Delete property

Development

Backend Development

- Use Visual Studio or VS Code
- Entity Framework migrations
- Swagger for API testing

Frontend Development

- React with TypeScript
- Material-UI components
- Vite for fast development

 Deployment

 Backend

- Azure App Service
- Docker containers

 Frontend

- Azure Static Web Apps
- Netlify
- Vercel

 Database

- Azure PostgreSQL
- AWS RDS

 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

 License

This project is licensed under the MIT License.
