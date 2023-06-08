const userModel = require('../model/userModel');

//get all user from database
const user_all = async (req, res) => {

    try {
        const showAll_user = await userModel.find();
        res.render("index", { title: "home page", users: showAll_user });
    } catch (error) {
        console.error(error);
    }
}

// Insert user data into database
const insert_user = async (req, res) => {
    try {
        const { username, email, address } = req.body;
        const user = new userModel({
            username: username,
            email: email,
            address: address
        });
        await user.save();
        res.redirect("/");
    } catch (error) {
        console.error(error);
    }
}

//Editing user
const edit_user = async (req, res) => {
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
}

//update user
const update_user = async (req, res) => {
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
}

//Deleting users
const delete_user = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndRemove(id);
        if (user) {
            res.redirect('/')
        }
    } catch (error) {
        console.error(error);
    }
}



module.exports = { user_all, insert_user, edit_user, update_user, delete_user };