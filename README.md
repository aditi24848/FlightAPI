# FlightAPI

A simple Node.js REST API for flight booking, user authentication, and flight management.

## Features

- User signup and login with JWT authentication
- Flight search with pagination and filtering
- Book flights, cancel bookings, and view booking history

## Project Structure

```
FlightAPI/
├── Index.js
├── package.json
├── .gitignore
├── Middleware/
│   └── AuthMiddleware.js
├── Model/
│   ├── Booking.js
│   ├── Flight.js
│   └── User.js
├── Router/
│   ├── BookingRouter.js
│   ├── FlightRouter.js
│   └── UserRouter.js
├── Services/
│   ├── BookingService.js
│   ├── FlightService.js
│   └── UserService.js
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the server:**
   ```sh
   node Index.js
   ```

3. **API Endpoints:**
   - `POST /user/signup` - Register a new user
   - `POST /user/login` - Login and get JWT token
   - `GET /flights` - List flights (supports query params: origin, destination, page, limit)
   - `POST /bookings` - Book a flight (requires JWT)
   - `POST /bookings/:id/cancel` - Cancel a booking (requires JWT)
   - `GET /bookings/:userId` - Get booking history (requires JWT)

## Dependencies

- express
- bcryptjs
- jsonwebtoken

## Notes

- Data is stored in-memory (no database).
- JWT secret is hardcoded for demonstration.

---

Feel free to modify and extend as needed!