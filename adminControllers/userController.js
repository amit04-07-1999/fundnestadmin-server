const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../adminModels/Adminuser');
const dotenv = require('dotenv');
const User = require('../adminModels/user')
const Appointments = require('../adminModels/appointment')
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
            process.env.JWT_SECRET,
            { expiresIn: '100d' }
        );

        return res.status(200).json({ user, token, status: 200 });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


//Create Enterprenuer & Investor
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const eiUser = new User({
            name, email, password: hashedPassword, role
        });
        await eiUser.save();
        res.status(201).json({ eiUser, message: 'Enterprenuer registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};


//Get All Enterprenuer
const getAllEnterprenuers = async (req, res) => {
    try {
        const users = await User.find({ role: 'enterprenuer' });
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


module.exports = { register, login, createUser, getAllEnterprenuers, deleteEIById, getAllInvestors, getAppointments, deleteAppointmentById };
