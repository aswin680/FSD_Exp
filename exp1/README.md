# E-Commerce Application with Redux

## Project Overview
A React-based e-commerce application demonstrating state management using Redux Toolkit. The application features role-based access control, shopping cart functionality, and theme customization.

## Features

### User Features
- Browse products with prices
- Add items to cart
- Adjust item quantities in cart
- Remove items from cart
- View cart total
- Toggle between light and dark themes

### Admin Features
- Add new products with name and price
- Edit existing products
- Delete products
- All user features

## Technology Stack
- React 19.2.0
- Redux Toolkit 2.11.2
- Vite 7.2.4
- React-Redux 9.2.0

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── login.jsx          # Login component with role selection
│   ├── Products.jsx       # Product listing and management
│   └── cart.jsx           # Shopping cart with quantity controls
├── store/
│   ├── store.js           # Redux store configuration
│   ├── productsSlice.jsx  # Products state management
│   └── cartSlice.jsx      # Cart state management
├── App.jsx                # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and theme
```

## Usage

1. Login with any email and password
2. Select role (User or Admin)
3. Browse and add products to cart
4. Manage cart quantities
5. Toggle theme using switch in top-right corner

## Default Products
- Laptop - ₹49,999
- Phone - ₹15,999
- Headphones - ₹1,999
