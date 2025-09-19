# Project Overview

This document provides a high-level overview of the RealEstate project: goals, architecture, and main components.

## Goals

- Property listing, details, favorites, inquiries.
- Secure authentication with JWT.
- Simple, fast UX on modern stack (React + Vite, .NET API, SQL).

## Architecture

- Frontend: Vite + React + TypeScript, React Query, MUI.
- Backend: ASP.NET Core Web API, Identity, EF Core.
- Database: SQL (EF Core migrations).
- Storage: image hosting via API endpoints.

## Key Features

- Properties: list, filters, create/edit/delete (owner/admin), images.
- Favorites: per-user, instant UI updates via React Query.
- Auth: register/login, role-based access.
- Inquiries: contact property owner.

## Conventions

- API base: `/api`.
- JWT in Authorization header (Bearer).
- React Query keys: stable and descriptive (e.g., ["user-favorites"]).

## Environments

- Local dev: Vite and Web API.
- Production: Azure App Service (example), static hosting for frontend.

For endpoints and models, see `API_DOCUMENTATION.md`.
