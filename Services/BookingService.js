const flights = require('../Model/Flight');
const bookings = require('../Model/Booking');

const bookFlight = (userId, flightId) => {
    const flight = flights.find(f => f.id === flightId);
    if (!flight) {
        return { error: 'Flight not found' , status: 404 };
    }
    if (flight.availableSeats <= 0) {
        return { error: 'no seats available', status: 400};
    }


    flight.availableSeats -= 1;
 
    const bookingId = bookings.length + 1;
    const booking = { bookingId, userId, flightId };
    bookings.push(booking);
    return { message: 'Booking confirmed', booking };
};

const cancelBooking = (bookingId) => {
    const booking = bookings.find(b => b.bookingId === bookingId);
    if (!booking) {
        return { error: 'Booking not found' };
    }
    if (booking.status === 'cancelled') {
        return { error: 'Booking already cancelled' };
    }

    booking.status = 'cancelled';

    const flight = flights.find(f => f.id === booking.flightId);
    if (flight) {
        flight.availableSeats += 1;
    }

    return { message: 'Booking cancelled successfully', booking };
};


const getBookingHistory = (userId) => {
    const userBookings = bookings.filter(b => b.userId === userId);
    if (userBookings.length === 0) {
        return { error: 'No bookings found for this user', status: 404  };
    }
    return { bookings: userBookings };
};

module.exports = { bookFlight, cancelBooking, getBookingHistory };

