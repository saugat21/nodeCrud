const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");


//Insert userdata into database
router.post("/add", userController.insert_user);

//get all users from database
router.get("/", userController.user_all);

//Edit user
router.get("/edit/:id", userController.edit_user);

//Update user post
router.post("/update/:id", userController.update_user);

//Deleting user
router.get("/delete/:id", userController.delete_user);

//showing add user page 
router.get("/add", (req, res) => {
    res.render("add_user", { title: "add user" });
});



module.exports = router;