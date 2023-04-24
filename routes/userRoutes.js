const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get(
    "/users",
    // authenticate
    userController.getUsers
);

router.post(
    "/users/new",
    userController.createUser
);

router.get(
    "/users/:id",
    userController.getUserById
);

router.delete(
    "/users/delete/:id", 
    userController.deleteUser
);

module.exports = router;