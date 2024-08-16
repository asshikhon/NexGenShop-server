#  NextGenShop

## Project Overview:


NextGenShop is a fullstack single-page application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project enables users to browse, filter, search, and sort products efficiently, with a focus on providing a smooth and intuitive user experience. It includes functionalities such as pagination, searching by product name, categorization, sorting, and user authentication.


## Uses Package

**1**. cors

**2**. dotenv

**3**. express

**4**. MongoDB

# Website Link = https://nexgenshop-cba7d.web.app

## Getting Started

To run this project locally, follow these steps:

1. **Clone the Repository**

2. **Install Dependencies**

- For backend dependencies, navigate to the backend directory and run:
  ```
  npm install
  ```

  3. **Start the Backend Server**
- Use `nodemon` to start the backend server:
  ```
  nodemon index.js
  ```
- Ensure MongoDB URI, username, and password are set in a `.env` file in the backend directory:
  ```
  MONGODB_URI=<your-mongodb-uri>
  DB_USERNAME=<your-db-username>
  DB_PASSWORD=<your-db-password>
  ```

4. **Set Environment Variables**
- Update `.env.local` or `.env` with necessary variables, for example:
  ```
  VITE_API_URL='http://localhost:5000'
  ```



