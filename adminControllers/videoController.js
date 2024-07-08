// const multer = require('multer');
// import Video from './../adminModels/Video';
// const path = require('path');
// const fs = require('fs');

// // Set up storage engine
// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// // Initialize upload variable with Multer settings
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 100000000 }, // 100MB limit
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   }
// }).single('video');

// // Check file type
// function checkFileType(file, cb) {
//   const filetypes = /mp4|mov|avi|mkv/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Videos Only!');
//   }
// }

// // Handle video upload
// exports.uploadVideo = (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.status(400).json({ msg: err });
//     } else {
//       if (req.file == undefined) {
//         res.status(400).json({ msg: 'No file selected' });
//       } else {
//         res.json({ fileName: req.file.filename });
//       }
//     }
//   });
// };


// // Get list of videos
// exports.getVideos = (req, res) => {
//   fs.readdir('./uploads/', (err, files) => {
//     if (err) {
//       return res.status(500).json({ msg: 'Unable to scan directory' });
//     }
//     const videoUrls = files.map(file => `http://localhost:4000/uploads/${file}`);
//     res.json(videoUrls);
//   });
// };


const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Video = require('../adminModels/Video')
// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable with Multer settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 100MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('video');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /mp4|mov|avi|mkv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Videos Only!');
  }
}

// Handle video upload
exports.uploadVideo = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ msg: 'No file selected' });
      } else {
        const url = `http://103.189.172.172:4000/uploads/${req.file.filename}`;
        // console.log(videoUrl);
        const newVideo = new Video({ url });
        // console.log(newVideo);

        newVideo.save()
          .then(video => res.json({ fileName: req.file.filename, url: video.url }))
          .catch(err => res.status(500).json({ msg: 'Failed to save video URL in database' }));
      }
    }
  });
};

// Get list of videos
exports.getVideos = (req, res) => {
  fs.readdir('./uploads/', (err, files) => {
    if (err) {
      return res.status(500).json({ msg: 'Unable to scan directory' });
    }
    const videoUrls = files.map(file => `http://103.189.172.172:4000/uploads/${file}`);
    res.json(videoUrls);
  });
};