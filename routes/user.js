const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');


//Insert userdata into database
router.post("/add", (req, res) => {
    const { username, email, address } = req.body;
    const user = new userModel({
        username: username,
        email: email,
        address: address
    });
    user.save()
        .then(() => {

            res.redirect('/');
        })
        .catch((err) => {
            res.json({ message: err.message });
            console.log("error occur");
        });
});

//get all users from database
router.get("/", (req, res) => {
    userModel.find()
        .then((users) => {
            res.render("index", { title: "home page", users: users });
        })
        .catch((err) => {
            res.json({ message: err.message });
        })

});

//Edit user
router.get("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.render("edit_user", { title: "Edit Page", user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//Update user post
router.post("/update/:id", async (req, res) => {
    try {

        const id = req.params.id;
        const user = await userModel.findByIdAndUpdate(id);
        const { username, email, address } = req.body;
        user.username = username;
        user.email = email;
        user.address = address;
        await user.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

//Deleting user
router.get("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndRemove(id);
        if (user) {
            res.redirect('/')
        }


    } catch (error) {
        console.error(error);
    }

});


router.get("/add", (req, res) => {
    res.render("add_user", { title: "add user" });
});



module.exports = router;