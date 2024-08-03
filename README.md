# ZK Tech Store Inventory Management System

ZK Tech Store project is an Inventory Management System designed to manage IT assets. It includes features such as inventory tracking, user management, reports and analytics, asset management, maintenance schedules, and device status reporting.

## Features

- **Inventory Tracking**: Keep track of all IT assets, including their current status (available or faulty).
- **User Management**: Manage user roles and permissions.
- **Reports and Analytics**: Generate reports and analyze data related to IT assets.
- **Asset Management**: Manage the lifecycle of IT assets from procurement to disposal.
- **Maintenance Schedules**: Track maintenance schedules and service history for each asset.
- **Device Status Reporting**: Report on the status of devices, including available and faulty devices.

## Technology Stack

- **Backend**: ASP.NET Core
- **Frontend**: Angular
- **Database**: SQL Server

## Prerequisites

- .NET SDK 8.0 or higher
- Node.js 20.0 or higher
- Angular CLI 18.0 or higher
- SQL Server

## Getting Started

### Backend (ASP.NET API)

1. **Clone the Repository**
    ```bash
    git clone https://github.com/shahzaibkhan1993/IMS-Zk-tech-store.git
    cd IMS-Zk-tech-store
    ```

2. **Setup Database**

    Ensure SQL Server is running and update the connection string in `appsettings.json` to match your database configuration.
    ```json
    "ConnectionStrings": {
        "sqlConnection": "server=.; database=InventrySystemDb; Integrated Security=true; TrustServerCertificate=true"
    }
    ```

3. **Run Migrations**

    The application uses the Code First approach of Entity Framework Core. Open the Package Manager Console in Visual Studio. Set `InventrySystem` as the default project. Run the following command to update the database:
    ```powershell
    Update-Database
    ```

4. **Run the API**

    The API will be available at [https://localhost:5001/swagger/index.html](https://localhost:5001/swagger/index.html).

### Frontend (Angular App)

1. **Navigate to Frontend Directory**
    ```bash
    cd /InventrySystem/InventryUI
    ```

2. **Install Dependencies**

    Install the necessary npm packages:
    ```bash
    npm install
    ```

3. **Update Environment Configuration**

    Update the API endpoint in `src/environments/environment.ts` to match the URL where your backend API is running:
    ```typescript
    export const environment = {
        production: false,
        apiUrl: 'https://localhost:5001'
    };
    ```

4. **Run the Angular App**

    Use the following command to start the Angular development server:
    ```bash
    ng serve
    ```

    The Angular app will be available at [http://localhost:4200](http://localhost:4200).

## Login

### Default Administrator Account

- **Email**: testuser@example.com
- **Password**: Password.123

