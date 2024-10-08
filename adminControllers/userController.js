const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../adminModels/Adminuser');
const dotenv = require('dotenv');
const User = require('../adminModels/user')
const Appointments = require('../adminModels/appointment')
const WebinarBooking = require('../adminModels/webinar')
const FAQs = require('../adminModels/faqs')
// const Appointments = require('../../backend/model/appointment')


dotenv.config();

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new AdminUser({
            username,
            password: hashedPassword,
            role: req.body.role || 'admin'
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await AdminUser.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            "qwerty5678",
            { expiresIn: '100d' }
        );

        return res.status(200).json({ user, token, status: 200 });

    } catch (error) {
        console.log(error, "error");
        res.status(500).json({ error: 'Server error' });

    }
};


//Create entrepreneur & Investor
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const eiUser = new User({
            name, email, password: hashedPassword, role
        });
        await eiUser.save();
        res.status(201).json({ eiUser, message: 'entrepreneur registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};


//Get All entrepreneur
const getAllentrepreneurs = async (req, res) => {
    try {
        const users = await User.find({ role: 'entrepreneur' });
        // console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
//Get All Investor
const getAllInvestors = async (req, res) => {
    try {
        const users = await User.find({ role: 'investor' });
        // console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// Delete Entrepreneur or Investor By Id
const deleteEIById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", status: 200 });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};



// Get all appointments
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointments.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete appointment by ID
const deleteAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAppointment = await Appointments.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully', status: 200 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Get all Webinar Booking
const getWebinarBooking = async (req, res) => {
    try {
        const webinarBooking = await WebinarBooking.find();
        res.status(200).json(webinarBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Webinar Booking by ID
const deleteWebinarBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedWebinarBooking = await WebinarBooking.findByIdAndDelete(id);
        if (!deletedWebinarBooking) {
            return res.status(404).json({ error: 'Webinar Booking not found' });
        }
        res.status(200).json({
            message: 'Webinar Booking deleted successfully', status:
                200
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Create FAQs
const createFAQs = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newFAQs = new FAQs({ question, answer });
        await newFAQs.save();
        res.status(201).json({ newFAQs, message: 'FAQs created successfully', status: 201 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Get FAQs
const getFAQs = async (req, res) => {
    try {
        const faqs = await FAQs.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




module.exports = { register, login, createUser, getAllentrepreneurs, deleteEIById, getAllInvestors, getAppointments, deleteAppointmentById, getWebinarBooking, deleteWebinarBookingById, createFAQs, getFAQs };
