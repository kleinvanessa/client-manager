# client-manager
ClientManager is a web application designed to manage store clients, facilitating the registration, editing, and listing of clients. The application uses C# and .NET Core on the backend and React on the frontend, with a SQL Server database for data storage.

## Requirements

Before you start, make sure you have the following requirements installed:

### Back-End (.NET Core)

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download/dotnet) — Version 8.0 or higher of the .NET SDK is required to build and run the application.
- [SQL Server](https://www.microsoft.com/en-us/sql-server) (or another compatible database) — The application uses Entity Framework Core with SQL Server for database management.

### Front-End (React)

- [Node.js 18+](https://nodejs.org/)
- [npm or yarn](package manager for Node.js)

## Environment Setup

### 1. Cloning the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/kleinvanessa/client-manager.git
cd client-manager
```

### 2. Back-End Setup

#### 1. Install Dependencies:

Navigate to the backend directory and run:

```bash
cd ClientManager.Backend
dotnet restore
```
#### 2. Database Setup

- Configure your database connection in the appsettings.json file. Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=ClientManager;Trusted_Connection=True;"
}
```

- Make sure the database is configured and run migrations to create the database 
(or create it manually with the script:  *client-manager\database-scripts\CreateDatabase.sql* ):

```bash
dotnet ef database update
```

- If you need test data, use the script: *client-manager\database-scripts\InsertData.sql*

#### 3. Running the Application:

```bash
dotnet run
```
The API will be available at http://localhost:5000.


### 3. Front-End Setup

#### 1. Install Dependencies:

Navigate to the frontend directory and run:

```bash
cd client-manager-frontend
npm install
```

#### 1. API Configuration:

In the file *src/api/clientApi.js*, if necessary, configure the base URL for the API:

```javascript
const API_URL = 'http://localhost:5000/api/Client';
```

#### 3. Running the Application:

Run the following command to start the frontend:

```bash
npm start
```
The frontend will be available at http://localhost:3000.

## Testing

### Back-End Tests

#### 1. Running Unit Tests:

Navigate to the ClientManager.Backend.Tests directory and run:

```bash
cd ClientManager.Backend.Tests
dotnet test
```

### Front-End Tests

#### 1. Running Unit Tests:

Navigate to the client-manager-frontend directory and run:

```bash
npm test
```


This README provides clear instructions to set up, run, and test the application,
as well as to configure the API endpoint and run both front-end and back-end applications.
If you need further adjustments or information, feel free to ask!

*Developer : Vanessa Klein*

