const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Lean Costruction Backend rodando!" });
});

module.exports = router;