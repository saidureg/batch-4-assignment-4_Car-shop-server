# _Car Order Management System_

A professional RESTful API built to manage car inventory, orders, and revenue calculations. Designed for scalability and reliability, this application leverages modern technologies and follows industry best practices.

## _🚀 Live Demo_

Access the live API [Here](https://car-shop-backend-sooty.vercel.app/)

## Features

1.  **Car Management**

- Add new cars to the inventory.
- Retrieve a list of all available cars.
- Search for cars by brand, model, or category.
- Get details of a specific car by ID.
- Update car details (e.g., price, quantity).
- Delete a car from the inventory.

2. **Order Management**

- Create new orders for purchasing cars.
- Make payment 
- Calculate revenue from orders

## _🔧 Tech Stack_

- _Frontend:_ React, Redux Toolkit, Ant Design, Tailwind CSS
- _Backend:_ Node.js, Express.js
- _Database:_ MongoDB with Mongoose
- _Payment Integration:_ SurjoPay
- _Validation:_ Zod for schema validation
- _Authentication:_ JWT, bcrypt
- _Environment:_ dotenv for secure configuration



## _🌟 API Endpoints_

## User

1. **Register**

- _URL:_ /api/auth/register
- _Method:_ POST

2. **Login**

- _URL:_ /api/auth/login
- _Method:_ POST

3. **User Can Change Password**

- _URL:_ /api/auth/change-password
- _Method:_ POST

4. **Admin Can See All Users**

- _URL:_ /api/users
- _Method:_ GET

5. **Admin Block a User**

- _URL:_ /api/admin/:userId/block
- _Method:_ PATCH

6. **Admin Delete a User**

- _URL:_ /api/admin/:userId/block
- _Method:_ DELETE/:userId

## Cars

1. **Admin Add Car**

- _URL:_ /api/cars
- _Method:_ POST

2. **Get All Car**

- _URL:_ /api/cars
- _Method:_ GET
- _Query:_ /api/cars?searchTerm=category

3. **Get a Specific Car**

- _URL:_ /api/cars/:carId
- _Method:_ GET

4. **Admin Update Car**

- _URL:_ /api/cars/:carId
- _Method:_ PATCH

5. **Admin Delete Car**

- _URL:_ /api/cars/:carId
- _Method:_ DELETE

## Orders Related API

1. **USer Place an Order**

- _URL:_ /api/orders
- _Method:_ POST

2. **Admin See All Orders**

- _URL:_ /api/orders
- _Method:_ GET

3. **User See his/her Orders**

- _URL:_ /api/orders/:userId
- _Method:_ GET

4. **Payment Verify**

- _URL:_ /api/orders/verify
- _Method:_ GET

5. **Admin Update Order**

- _URL:_ /api/orders/:orderId
- _Method:_ PATCH

6. **Admin Delete Car**

- _URL:_ /api/orders/:orderId
- _Method:_ DELETE

## _Project Setup Guide_

Follow the instructions below to set up the project on your local development environment.

## Prerequisites

Before starting, ensure the following are installed on your system:

- Node.js (v16+)
- `yarn` or `npm` installed globally on your system.
- MongoDB (running locally or a connection string for a cloud database like MongoDB Atlas)
- Visual Studio Code
- TypeScript (installed globally via npm install -g typescript)

## Steps to Set Up the Project

1. **Clone the Repository:**

   - Open your terminal and navigate to the desired folder.
   - Clone the repository using the command:
     ```bash
     git clone <repository-link>
     ```

2. **Open the Project in Visual Studio Code:**

   - Open the cloned project folder in VS Code.

3. **Install Dependencies:**

   - Install project dependencies using npm or Yarn:
     ```bash
     yarn
     ```

4. **Configure Environment Variables:**

   - Create a `.env` file in the root directory.
   - Add the following environment variables:

     ```bash
     PORT=5000
     ```

     ```bash
     DATABASE_URL=mongodb://<Your Database URL>
     ```

     ```bash
     BCRYPT_SALT_ROUNDS=<Number> 
     ```

     ```bash
     JWT_ACCESS_SECRET=<HashCode> 
     ```

     ```bash
     JWT_ACCESS_EXPIRATION=<Time Frame> 
     ```

     ```bash
      SP_ENDPOINT=https://sandbox.shurjopayment.com
     ```

     ```bash
      SP_USERNAME=sp_sandbox
     ```

     ```bash
      SP_PASSWORD=pyyk97hu&6u6
     ```

     ```bash
      SP_PREFIX=SP
     ```

     ```bash
      SP_RETURN_URL=http://localhost:5173/orders/verify
     ```


5. **Start the Development Server:**

   - To start the development server, use one of the following commands:
     ```bash
     yarn run start:dev
     ```
     or
     ```bash
     yarn start:dev
     ```

6. **Linting and Formatting:**

   - To check and fix linting issues using ESLint, run:
     ```bash
     yarn run lint:fix
     ```
   - To format the code using Prettier, run:
     ```bash
     yarn run prettier
     ```

7. **Build the Project:**
   - Compile TypeScript files to JavaScript using:
     ```bash
     yarn run build
     ```
   - This will run the `tsc` command to transpile TypeScript files into JavaScript.
