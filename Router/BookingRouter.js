const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');
const bookingService = require('../Services/BookingService');

router.post('/bookings/:id/cancel', authMiddleware, (req, res) => {
    const bookingId = parseInt(req.params.id);
    const result = bookingService.cancelBooking(bookingId);

    if (result.error) {
        return res.status(400).json(result);
    }

    res.json({ message: "Booking cancelled successfully", booking: result });
});

router.get('/bookings/:userId', authMiddleware, (req, res) => {
    const userId = parseInt(req.params.userId);
    const history = bookingService.getBookingHistory(userId);

    if (history.length === 0) {
        return res.status(404).json({ error: "No bookings found for this user" });
    }

    res.json({ bookings: history });
});

router.post('/bookings', authMiddleware, (req, res) => {
    const { userId, flightId } = req.body;
    if (!userId || !flightId) {
        return res.status(400).json({ error: 'userId and flightId are required' });
    }
    const result = bookingService.bookFlight(userId, flightId);
    if (result.error) {
        return res.status(400).json(result);
    }
    res.status(200).json(result);
});


module.exports = router;
