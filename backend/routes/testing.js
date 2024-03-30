const express = require("express");
const router = express.Router();

router.get("/ping", async (req, res) => {
    try {
        res.status(200).send("pong")
    }
    catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
})

module.exports = router;