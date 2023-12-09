const prisma = require("../config/prisma");
const imagekit = require("../config/imagekit");

exports.findAll = async (req, res) => {
    try {
        const hotels = await prisma.hotel.findMany({
            include: {
                images: true,
            }
        });
        res.status(200).json({ message: "Success", data: hotels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
}

exports.createHotel = async (req, res) => {
    try {
        const { name, description, location, city, price } = req.body;
        const uploadedImages = [];
      
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: 'No files uploaded.' });
        }
      
        // Upload gambar ke ImageKit dan simpan URL gambar
        for (const file of req.files) {
          if (!file.buffer) {
            return res.status(400).json({ error: 'Invalid file format.' });
          }
      
          const uploadResponse = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
          });
      
          uploadedImages.push(uploadResponse.url);
        }

        // Convert the price to a Float
        const parsedPrice = parseFloat(price);

        if (isNaN(parsedPrice)) {
          return res.status(400).json({ error: 'Invalid price format.' });
        }

        // Simpan data post ke database dengan URL gambar dan fasilitas
        const newHotel = await prisma.hotel.create({
          data: {
            name,
            description,
            location,
            city,
            price: parsedPrice,
            images: { create: uploadedImages.map(image => ({ url: image })) }
          },
        });
      
        res.status(201).json({ hotel: newHotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }      
}

exports.findOne = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
      const hotel = await prisma.hotel.findUnique({
          where: { id },
          include: {
              images: true,
          }
      });

    if (!hotel) {
      return res.status(404).send({
        message: `Hotel not found with id ${id}`,
      });
    }

    res.send(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error retrieving hotel with id=" + id,
    });
  }
};

exports.update = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: req.body,
      include: {
          images: true,
      }
    });

    if (!updatedHotel) {
      return res.status(404).send({
        message: `Cannot update hotel with id=${id}. Maybe hotel was not found!`,
      });
    }

    res.send({ message: "Hotel was updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error updating hotel with id=" + id,
    });
  }
};

exports.delete = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const deletedHotel = await prisma.hotel.delete({
      where: { id },
      include: {
          images: true,
      }
    });

    if (!deletedHotel) {
      return res.status(404).send({
        message: `Cannot delete hotel with id=${id}. Maybe hotel was not found!`,
      });
    }

    res.send({ message: "Hotel was deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Could not delete hotel with id=" + id,
    });
  }
};