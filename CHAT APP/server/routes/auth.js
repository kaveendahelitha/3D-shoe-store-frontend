const express = require('express');

const { signup, login } = require('../controllers/auth.js');

const router = express.Router();

router.post("/login", async (req, res) => {
    return await login(req, res);
  });
  
  router.post("/signup", async (req, res) => {
    return await signup(req, res);
  });

module.exports = router;