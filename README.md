 # Full-Stack Agile Task Management System (Jira Clone)
    2
    3 A high-performance task management platform built with a .NET 8/10 Web API and an Angular 17+ standalone frontend. This project demonstrates enterprise-level development patterns, including JWT-based
      security, optimistic concurrency handling, and a modular N-Tier architecture.
    4
    5 ## Overview
    6
    7 The application provides a dynamic Kanban-style environment for project and issue tracking. It is architected as a Modular Monolith, ensuring a clear separation of concerns between the presentation layer,
      the application logic, and the data persistence layer.
    8
    9 ## Key Features
   10
   11 *   **Interactive Kanban Board**: Dynamic issue tracking with drag-and-drop status transitions.
   12 *   **Optimistic UI Updates**: Instant frontend state changes with automated backend synchronization and error-reversal logic.
   13 *   **Secure Authentication**: JWT-based identity management with password hashing via BCrypt.Net.
   14 *   **Project Management**: Full CRUD operations for projects and associated issues with one-to-many relationship mapping.
   15 *   **Automated Authorization**: Centralized request handling via Angular HttpInterceptors to manage bearer tokens.
   16 *   **Concurrency Control**: Implementation of optimistic concurrency detection to prevent data loss in collaborative environments.
   17
   18 ## Technical Stack
   19
   20 ### Backend
   21 *   **Framework**: ASP.NET Core Web API (.NET 8/10)
   22 *   **ORM**: Entity Framework Core
   23 *   **Database**: PostgreSQL / Microsoft SQL Server
   24 *   **Security**: JSON Web Tokens (JWT), BCrypt.Net-Next
   25 *   **Testing**: xUnit
   26
   27 ### Frontend
   28 *   **Framework**: Angular 17+ (Standalone Components)
   29 *   **State Management**: RxJS Observables and BehaviorSubjects
   30 *   **Styling**: Vanilla CSS3
   31 *   **UI Components**: Angular CDK (Drag & Drop)
   32
   33 ## Architecture
   34
   35 The project follows a Layered N-Tier Architecture:
   36
   37 1.  **Presentation Layer**: Built with Angular 17+, focusing on reactive UI components and service-based data fetching.
   38 2.  **Application Layer**: ASP.NET Core Controllers handling request validation, routing, and dependency injection.
   39 3.  **Data Layer**: Entity Framework Core managing the repository pattern, database migrations, and relational mapping.
   40 4.  **Security Layer**: Middleware-based authentication and resource-based authorization.
   41
   42 ## Getting Started
   43
   44 ### Prerequisites
   45 *   .NET SDK 8.0 or later
   46 *   Node.js (v18+) and npm
   47 *   PostgreSQL or SQL Server instance
   48
   49 ### Installation
   50
   51 1.  Clone the repository:
      git clone https://github.com/your-username/Jira-Clone.git
      cd Jira-Clone

   1
   2 2.  Configure Backend Secrets:
   3     Navigate to the backend directory and initialize the local secret store to avoid hardcoding credentials:
      cd backend
      dotnet user-secrets init
      dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Database=JiraClone;Username=your_user;Password=your_password"
      dotnet user-secrets set "JwtSettings:Secret" "your_secure_32_byte_secret_key"
   1
   2 3.  Apply Database Migrations:
      dotnet ef database update

   1
   2 4.  Install Frontend Dependencies:
      cd ../frontend
      npm install
   1
   2 ### Running the Application
   3
   4 1.  Start the Backend API:
      cd backend
      dotnet run
   1
   2 2.  Start the Frontend Development Server:
      cd frontend
      npm start

   1
   2 3.  Access the application:
   3     Open `http://localhost:4200` in your browser.
   4
   5 ## Security Implementation
   6
   7 *   **Credential Protection**: Utilizes .NET User Secrets for local development and Environment Variables for production environments.
   8 *   **Password Security**: Industry-standard BCrypt hashing is used to ensure user passwords are never stored in plain text.
   9 *   **Stateless Auth**: Employs JWTs to maintain a stateless backend, improving scalability and security.
