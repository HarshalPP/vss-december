const express = require("express");
const router = express.Router();
const token = require("../middleware/token");
const usermanagementController = require("../controller/usermanagementController");

// Get All Route
router.get("/",token, usermanagementController.allRecords);
// Get One Route
router.get("/:id", token, usermanagementController.get);
//find by role
router.get("/role/:role", token, usermanagementController.role);
// Create One Route
router.post("/create", token, usermanagementController.create);
//Put One 
router.put("/edit/:id", token, usermanagementController.edit);

//image open in browser
router.use('/profilePicture', express.static('User_Profile_Images'));

//Delete One
router.delete("/delete/:id", token, usermanagementController.delete);

// token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

module.exports = router;