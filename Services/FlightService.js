const flights = require('../Model/Flight');

const getAllFlights = (query) => {
    let result = flights;

    
    if (query.origin && query.destination) {
        result = result.filter(f => f.origin === query.origin && f.destination === query.destination);
    }

  
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || result.length;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedFlights = result.slice(start, end);

    return {
        total: result.length,
        page,
        limit,
        flights: paginatedFlights
    };
};

module.exports = { getAllFlights };
