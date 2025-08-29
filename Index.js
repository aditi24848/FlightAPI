const express = require('express');
const userRouter = require('./Router/UserRouter');
const flightRouter = require('./Router/FlightRouter'); 
const bookingRouter = require('./Router/BookingRouter');

const app = express();
app.use(express.json());
app.use('/user', userRouter);
app.use(flightRouter); 
app.use(bookingRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});