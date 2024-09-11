const express = require('express');
const { register, login, getAllentrepreneurs, getAllInvestors, getAppointments, deleteAppointmentById, createUser, deleteEIById, getWebinarBooking, deleteWebinarBookingById, createFAQs, getFAQs } = require('../adminControllers/userController');
const jwtTokenMiddleware = require('../adminMiddleware/jwtTokenMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login); ``
router.post('/eiuser', jwtTokenMiddleware, createUser);
router.post('/faqs', jwtTokenMiddleware, createFAQs);

router.get('/getentrepreneurs', jwtTokenMiddleware, getAllentrepreneurs);
router.get('/getInvestors', jwtTokenMiddleware, getAllInvestors);
router.get('/getAppointments', jwtTokenMiddleware, getAppointments);
router.get('/getWebinarBooking', jwtTokenMiddleware, getWebinarBooking);
router.get('/faqs', jwtTokenMiddleware, getFAQs);

router.delete('/deleteEI/:id', jwtTokenMiddleware, deleteEIById);
router.delete('/deleteAppointment/:id', jwtTokenMiddleware, deleteAppointmentById);
router.delete('/deleteWebinarBooking/:id', jwtTokenMiddleware, deleteWebinarBookingById);

module.exports = router;
