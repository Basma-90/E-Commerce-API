## E-Commerce API 

### Table of Contents

- [Overview](#overview)
- [Authentication Routes](#authentication-routes)
- [Category Routes](#category-routes)
- [Order Routes](#order-routes)
- [Product Routes](#product-routes)
- [User Routes](#user-routes)
- [Configuration](#configuration)
- [Setup and Installation](#setup-and-installation)

---

### Overview

This API supports an e-commerce platform, providing routes for authentication, user management, product categories, orders, and products.
- **JWT (JSON Web Tokens)** for authentication
- **TypeScript** for enhanced code readability and maintainability
- **MongoDB** as the database for storing persistent data
- **Express** as the web framework for Node.js applications
- **Node.js** as the server-side runtime environment

---

### Authentication Routes

**POST /api/sessions**

Creates a new user session and returns an access token.

**GET /api/sessions**

Retrieves all active sessions for the authenticated user.

**DELETE /api/sessions**

Deletes the current user's session.

---

### Category Routes

**POST /api/categories**

Creates a new product category.

**GET /api/categories/:id**

Retrieves details of a specific category.

**PUT /api/categories/:id**

Updates an existing category.

**DELETE /api/categories/:id**

Deletes a specific category.

**GET /api/categories**

Retrieves a list of all categories.

---

### Order Routes

**POST /api/orders**

Creates a new order.

**GET /api/orders/:id**

Retrieves details of a specific order.

**PUT /api/orders/:id**

Updates an existing order.

**DELETE /api/orders/:id**

Deletes a specific order.

**GET /api/orders**

Retrieves a list of all orders.

**GET /api/orders/user/:userId**

Retrieves orders placed by a specific user.

**GET /api/orders/status/:status**

Retrieves orders by their status.

---

### Product Routes

**POST /api/products**

Creates a new product.

**GET /api/products/:id**

Retrieves details of a specific product.

**PUT /api/products/:id**

Updates an existing product.

**DELETE /api/products/:id**

Deletes a specific product.

**GET /api/products**

Retrieves a list of all products.

---

### User Routes

**POST /api/users**

Registers a new user.

---

### Configuration

**Default Configuration (config/default.ts)**

```javascript
export default {
    saltWorkFactor: 10,
    accessTokenTTL: "15m",
    refreshTokenTTL: "1y",
    accessPrivateKey: process.env.PRIVATE_KEY || '',
    accessPublicKey: process.env.PUBLIC_KEY || '',
    refreshPrivateKey: process.env.REFRESH_PRIVATE_KEY || '',
    refreshPublicKey: process.env.REFRESH_PUBLIC_KEY || '',
};

```


### Setup and Installation

Clone the Repository

```bash
git clone https://github.com/your-repo/e-commerce-api.git
cd e-commerce-api
```

### Install Dependencies

```bash
npm install
    
```

### Set Environment Variables

Create a .env file in the root directory and add the necessary environment variables as specified in the configuration section.

### Run the Server

```bash
npm start
    
```

