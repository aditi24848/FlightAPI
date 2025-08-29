const express = require('express');
const { getAllFlights } = require('../Services/FlightService');

const router = express.Router();


router.get('/flights', (req, res) => {
    const flights = getAllFlights(req.query);
    res.status(200).json({ flights });
});

module.exports = router;
