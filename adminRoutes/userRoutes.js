const express = require('express');
const { register, login, getAllEnterprenuers, getAllInvestors, getAppointments, deleteAppointmentById, createUser, deleteEIById} = require('../adminControllers/userController');
const jwtTokenMiddleware = require('../adminMiddleware/jwtTokenMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/eiuser',jwtTokenMiddleware, createUser);

router.get('/getenterprenuers',jwtTokenMiddleware, getAllEnterprenuers);
router.get('/getInvestors',jwtTokenMiddleware, getAllInvestors);
router.get('/getAppointments',jwtTokenMiddleware, getAppointments);

router.delete('/deleteEI/:id',jwtTokenMiddleware, deleteEIById);
router.delete('/deleteAppointment/:id',jwtTokenMiddleware, deleteAppointmentById);

module.exports = router;
