const prisma = require("../config/prisma");

exports.createBooking = async (req, res) => {
    try {
        const {
            name,
            checkIn,
            checkOut,
            type,
            price,
            visitors,
            paymentMode,
            hotelId,
            totalRooms,
        } = req.body;
        
        const newBooking = await prisma.booking.create({
            data: {
                name,
                checkIn: new Date(checkIn).toISOString(),  // Ubah ke format ISO string,
                checkOut: new Date(checkOut).toISOString(),  // Ubah ke format ISO string,
                type,
                price,
                visitors,
                paymentMode,
                hotelId,
                totalRooms,
            },
        });

        res.status(201).json({
            message: 'Booking created successfully',
            data: newBooking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
