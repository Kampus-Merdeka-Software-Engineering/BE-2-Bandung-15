const prisma = require("../config/prisma");


   

exports.createBooking = async (req, res) => {
    const { name,
        checkIn,
        checkOut,
        type,
        price,
        visitors,
        paymentMode,
        hotelId,
        totalRooms,} = req.body;
    const id = parseInt(hotelId);
    try {
      // Cek ketersediaan post berdasarkan hotelId
      const post = await prisma.hotel.findUnique({
        where: { id: id },
      });
  
      if (!post) {
        return res.status(404).send({
          message: `Post not found with id ${hotelId}`,
        });
      }
  
      // Buat booking baru
      const newBooking = await prisma.booking.create({
        data: {
            name,
            checkIn,
            checkOut,
            type,
            price: parseInt(price),
            visitors: parseInt(visitors),
            paymentMode,
            hotelId: parseInt(hotelId),
            totalRooms: parseInt(totalRooms),
        },
      });
      
      res.status(201).send(newBooking);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error creating booking",
      });
    }
};