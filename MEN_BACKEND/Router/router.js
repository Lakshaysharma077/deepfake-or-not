const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const bcrypt = require("bcrypt");

router.post('/user', async (req, res) => {
    const { Name, email, phoneNumber, password } = req.body;
    try {
        if (!Name || !phoneNumber || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const create = await User.create({ Name, phoneNumber, email, password: hash });
        res.json(create);
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        res.json({ message: "Login successful" });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

router.get('/user/get', async (req, res) => {
    try {
        const userId = req.query.userId;  // Get userId from query parameters (no JWT)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

module.exports = router;
