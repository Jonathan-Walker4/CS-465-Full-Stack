```markdown
# Travlr Getaways Application Setup and Execution Guide

This guide provides step-by-step instructions to set up and run the Travlr Getaways application from the `module4` branch of the repository.

## Prerequisites

1. **Node.js** and **npm** installed on your machine.
2. **MongoDB** installed and configured on your machine.
3. **Git** installed on your machine.
```
## Setup Instructions

### 1. Create a Folder for the Program

Create a folder where you want to clone the repository and navigate into it.

```
mkdir TravlrGetaways
cd TravlrGetaways
```

### 2. Initialize Git and Fetch the Repository

Initialize Git in your directory, add the remote repository, fetch all branches, and checkout the `module4` branch.

```sh
git init
git remote add origin https://github.com/oQuickZzz/CS-465-Full-Stack.git
git fetch --all
git checkout module4
```

### 3. Install Dependencies

Install all the necessary Node.js dependencies.

```
npm install
```

### 4. Start MongoDB

In a new PowerShell window, start the MongoDB server. Ensure you have created a `C:\data\db` directory or the path where MongoDB stores its data.

```sh
cd C:\data\db
mongod --dbpath C:\data\db
```

### 5. Start the Application

Go back to the original PowerShell window and start the application.

```
npm start
```

### 6. Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

You should now see the Travlr Getaways application running.

## Notes

- Ensure MongoDB is properly installed and the `C:\data\db` directory exists before starting MongoDB.
- Make sure to open two separate PowerShell windows: one for running MongoDB and another for running the application.
- If you encounter any issues, ensure all dependencies are installed and MongoDB is running correctly.
