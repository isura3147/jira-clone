# Full-Stack Agile Task Management System (Jira Clone)

A high-performance task management platform built with a .NET 8/10 Web API and an Angular 17+ standalone frontend. This project demonstrates enterprise-level development patterns, including JWT-based security, optimistic concurrency handling, and a modular N-Tier architecture.

## Overview

The application provides a dynamic Kanban-style environment for project and issue tracking. It is architected as a Modular Monolith, ensuring a clear separation of concerns between the presentation layer, the application logic, and the data persistence layer.

## Key Features

* **Interactive Kanban Board**: Dynamic issue tracking with drag-and-drop status transitions.
* **Optimistic UI Updates**: Instant frontend state changes with automated backend synchronization and error-reversal logic.
* **Secure Authentication**: JWT-based identity management with password hashing via BCrypt.Net.
* **Project Management**: Full CRUD operations for projects and associated issues with one-to-many relationship mapping.
* **Automated Authorization**: Centralized request handling via Angular HttpInterceptors to manage bearer tokens.
* **Concurrency Control**: Implementation of optimistic concurrency detection to prevent data loss in collaborative environments.

## Technical Stack

### Backend
* **Framework**: ASP.NET Core Web API (.NET 8/10)
* **ORM**: Entity Framework Core
* **Database**: PostgreSQL / Microsoft SQL Server
* **Security**: JSON Web Tokens (JWT), BCrypt.Net-Next
* **Testing**: xUnit

### Frontend
* **Framework**: Angular 17+ (Standalone Components)
* **State Management**: RxJS Observables and BehaviorSubjects
* **Styling**: Vanilla CSS3
* **UI Components**: Angular CDK (Drag & Drop)

## Architecture

The project follows a Layered N-Tier Architecture:

1. **Presentation Layer**: Built with Angular 17+, focusing on reactive UI components and service-based data fetching.
2. **Application Layer**: ASP.NET Core Controllers handling request validation, routing, and dependency injection.
3. **Data Layer**: Entity Framework Core managing the repository pattern, database migrations, and relational mapping.
4. **Security Layer**: Middleware-based authentication and resource-based authorization.

## Getting Started

### Prerequisites
* .NET SDK 8.0 or later
* Node.js (v18+) and npm
* PostgreSQL or SQL Server instance

### Installation

1. Clone the repository:
    ```bash
    git clone [https://github.com/your-username/Jira-Clone.git](https://github.com/your-username/Jira-Clone.git)
    cd Jira-Clone
    ```

2. Configure Backend Secrets:  
   Navigate to the backend directory and initialize the local secret store to avoid hardcoding credentials:
    ```bash
    cd backend
    dotnet user-secrets init
    dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Database=JiraClone;Username=your_user;Password=your_password"
    dotnet user-secrets set "JwtSettings:Secret" "your_secure_32_byte_secret_key"
    ```

3. Apply Database Migrations:
    ```bash
    dotnet ef database update
    ```

4. Install Frontend Dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1. Start the Backend API:
    ```bash
    cd backend
    dotnet run
    ```

2. Start the Frontend Development Server:
    ```bash
    cd frontend
    npm start
    ```

3. Access the application:  
   Open `http://localhost:4200` in your browser.

## Security Implementation

* **Credential Protection**: Utilizes .NET User Secrets for local development and Environment Variables for production environments.
* **Password Security**: Industry-standard BCrypt hashing is used to ensure user passwords are never stored in plain text.
* **Stateless Auth**: Employs JWTs to maintain a stateless backend, improving scalability and security.
