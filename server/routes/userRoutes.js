// routes/userRoutes.js
const multer = require('multer');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const friendRequestController = require('../controllers/friendRequestController');

//const auth  = require('../middleware/authMiddleware');
const createNewProject = require('../controllers/createNewProject')
// Route for user signup
router.post('/signup', userController.signup);

// Route for user login
router.post('/login', userController.login);

router.post('/send-otp', userController.sendOTP);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    }
});
const upload = multer({ storage: storage });

const updateProject = require('../controllers/updateProject')

router.post('/projects', auth.auth, upload.array('files'), createNewProject.createNewProject);
router.delete('/deleteProject/:projectId', auth.auth, updateProject.deleteProject)
router.delete('/deleteProjectFile/:projectId/:fileId', auth.auth, updateProject.deleteProjectFile);
// routes/projectRoutes.js;

// Route for downloading project files
router.get('/projects/:projectId/download', createNewProject.downloadAllProjectFiles);


// Send friend request
router.post('/send', auth.auth, friendRequestController.sendFriendRequest);

router.get('/getAllFreindRequest', auth.auth, friendRequestController.getAllFreindRequest);

// Accept friend request
router.put('/accept',auth.auth, friendRequestController.acceptFriendRequest);

// Reject friend request
router.put('/reject/:requestId', auth.auth, friendRequestController.rejectFriendRequest);

//Remove existing friend
router.put('/friend-requests/:requestId/remove', friendRequestController.removeFriend);
router.get('/user-projects', auth.auth, createNewProject.getAllProjects);
router.get('/getAllUsers', auth.auth, userController.getAllUsers);
router.post('/verify-otp',userController.verifyOtp);
router.put("/updateProfile", auth.auth, userController.updateProfile);
  
module.exports = router;
