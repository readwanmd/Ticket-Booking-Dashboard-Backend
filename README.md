# Ticket Booking Dashboard

## Overview

This is a simple ticket booking dashboard built with the Node.js, Express.js, MongoDB. The application includes user authentication, event management, booking management, and a simulated payment system for handling both free and paid tickets.

## Features

- User Registration and Authentication
- Event Creation and Management
- Ticket Booking for Events
- Simulated Payment Processing (Fake Payment System)
- Role-based Access Control (Admin and User)
- JWT-based Authentication

## Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login a user.
- `POST /api/auth/refresh-token` - Refresh JWT token.
- `POST /api/auth/logout` - Logout a user.

### Users

- `GET /api/users` - Get list of users (Admin only).
- `GET /api/profile/:id` - Get user profile (Authenticated user only).
- `PATCH /api/profile/:id` - Update user profile (Admin only).
- `DELETE /api/delete-user/:id` - Delete a user (Admin only).

### Events

- `GET /api/events` - Get list of all events.
- `GET /api/event/:id` - Get details of a specific event.
- `POST /api/events` - Create a new event (Admin only).
- `PATCH /api/event/:id` - Update an event (Admin only).
- `DELETE /api/event/:id` - Delete an event (Admin only).

### Bookings

- `GET /api/bookings` - Get list of all bookings.
- `POST /api/book` - Book tickets for an event (Authenticated user only).
- `GET /api/booking/:id` - Get details of a specific booking (Admin only).
- `PATCH /api/booking/:id` - Update a booking (Admin only).
- `DELETE /api/booking/:id` - Delete a booking (Admin only).

### Payments

- `GET /api/payments` - Get list of all payments (Admin only).
- `POST /api/payment` - Process a payment (Authenticated user only).
- `POST /api/payment/fake` - Process a fake payment (Authenticated user only).
- `GET /api/payment/:id` - Get details of a specific payment (Admin only).

## Simulated Payment System

The project includes a simulated (fake) payment system for testing purposes. This allows to test the payment flow without integrating a real payment gateway like Stripe.

## Setup and Installation

### Prerequisites

- Node.js
- MongoDB

### Clone the repository:

```bash
git clone https://github.com/readwanmd/Ticket-Booking-Dashboard-Backend.git
cd ticket-booking-dashboard-Backend
```

### Install server dependencies:

```bash
npm install
```

### Set up environment variables.

Create a .env file in the backend directory with the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Run server:

```bash
npm run dev
```

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you like to change.
