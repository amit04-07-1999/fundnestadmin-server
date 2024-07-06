const express = require('express');
const router = express.Router();
const videoController = require('../adminControllers/videoController');
const jwtTokenMiddleware = require('../adminMiddleware/jwtTokenMiddleware');


// Route to handle video upload
router.post('/upload', jwtTokenMiddleware, videoController.uploadVideo);

router.get('/upload', jwtTokenMiddleware, videoController.getVideos);



module.exports = router;
