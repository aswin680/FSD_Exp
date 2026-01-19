# State Management App

React application demonstrating Context API and Redux Toolkit integration.

## Features

### Context API (Authentication)
- Manages: isLoggedIn, userName, role, token
- Login/Logout functionality
- Role-based access control

### Redux Toolkit (Products & Cart)
- Products Slice: add, update, remove products
- Cart Slice: add to cart, remove from cart
- Persistent state management

## Setup

```bash
npm install
npm run dev
```

## Usage

1. Login with username and select role (User/Admin)
2. Admin can add/edit/delete products
3. All users can add products to cart
4. Cart shows total and allows item removal
