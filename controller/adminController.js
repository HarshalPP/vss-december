// const Adminlogin = require("../models/admin");
// const session = require('express-session')
// const jwt = require('jsonwebtoken');
// var md5 = require('md5');
// const { count } = require("../models/admin");
// const secretkey = process.env.SECRETKEY;
// exports.auth = async (req, res) => {
//     try {
//         const newUser = await Adminlogin.findOne({ username: req.body.username, password:md5(req.body.password) });
//         //  res.status(200).json(newUser);
//         if (newUser != '' && newUser != null) {
//             const updatedUser = await Adminlogin.findById(newUser['_id']).exec();
//             updatedUser.set({"status":true});
//             const updateSalesorder = await updatedUser.save();
//             // res.status(200).json({ "message": "sucess" });
//             jwt.sign({ newUser },secretkey, { expiresIn: '24h' }, (err, token) => {

//                 res.status(200).json({ "status": /*"1"*/"true", "data": { "_id": newUser['_id'], "username": newUser['username'], token } , updateSalesorder});
//             });
//         }
//         else {
//             res.status(200).json({ "message": "no record found" });

//         }
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// }
// exports.changeStatus = async (req, res) => {
//     try {
//       const updatedUser = await Adminlogin.findOne();
//       updatedUser.status = false; // Change the status value directly
//       const updatedSalesOrder = await updatedUser.save();
//       res.status(200).json({ msg: "Status changed" , updatedSalesOrder});
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   };

// exports.checkStatus = async(req,res)=>{
//     const adminStatus =await Adminlogin.findOne();
//     res.status(200).json({"message":"admin status","loginStatus":adminStatus['status']});
// }

// exports.manualchanges = async(req,res)=>{
//     const updatedUser = await Adminlogin.findOne().exec();
//     updatedUser.set(req.body);
//     const updateSalesorder = await updatedUser.save();

//     setInterval(()=>{


//             updatedUser.set({"status":"false"}); //"0"
//             updatedUser.save();

//     },43200000);


//     res.status(200).json({"msg":"status change"});

// }

const Adminlogin = require("../models/admin");
const session = require('express-session')
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const secretkey = process.env.SECRETKEY;

exports.auth = async (req, res) => {
  try {
    const newUser = await Adminlogin.findOne({ username: req.body.username, password: md5(req.body.password) });

    if (newUser) {
      newUser.status = true; // Update the status value directly
      const updatedUser = await newUser.save();

      jwt.sign({ newUser }, secretkey, { expiresIn: '24h' }, (err, token) => {
        res.status(200).json({
          status: true,
          data: { _id: newUser._id, username: newUser.username, token },
          updatedSalesOrder: updatedUser
        });
      });
    } else {
      res.status(200).json({ message: "No record found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, status } = req.body;
    
    // Create a new user
    const newUser = new Adminlogin({
      username: username,
      password: md5(password), // Hash the password
      status: status
    });
    
    // Save the new user to the database
    const savedUser = await newUser.save();
    
    res.status(200).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const updatedUser = await Adminlogin.findOne();
    if (updatedUser) {
      updatedUser.status = false; // Change the status value directly
      const updatedSalesOrder = await updatedUser.save();
      res.status(200).json({ msg: "Status changed", updatedSalesOrder });
    } else {
      res.status(200).json({ message: "No user found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// exports.checkStatus = async (req, res) => {
//   try {
//     const adminStatus = await Adminlogin.findOne();
//     res.status(200).json({ message: "Admin status", loginStatus: adminStatus.status });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.checkStatus = async (req, res) => {
  try {
    const adminStatus = await Adminlogin.findOne();
    if (adminStatus) {
      res.status(200).json({ message: "Admin status", loginStatus: adminStatus.status });
    } else {
      res.status(200).json({ message: "No user found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// exports.manualchanges = async (req, res) => {
//   try {
//     const updatedUser = await Adminlogin.findOne();
//     updatedUser.set(req.body);
//     const updateSalesOrder = await updatedUser.save();

//     setInterval(() => {
//       updatedUser.status = false; // Change the status value directly
//       updatedUser.save();
//     }, 43200000);

//     res.status(200).json({ msg: "Status change" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.manualchanges = async (req, res) => {
  try {
    const updatedUser = await Adminlogin.findOne();
    if (updatedUser) {
      updatedUser.set(req.body); // Update the document with the request body data
      const updateSalesOrder = await updatedUser.save(); // Save the updated document

      setInterval(() => {
        updatedUser.status = false; // Change the status value directly on the updatedUser object
        updatedUser.save(); // Save the updated document
      }, 43200000); // The interval is set to 12 hours (43200000 milliseconds)

      res.status(200).json({ msg: "Status change", updateSalesOrder });
    } else {
      res.status(200).json({ message: "No user found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


