

const express = require('express');
const router = express.Router();
const tokenVerify = require('../controllers/tokenVerifyController');
const auth = require("../middlewares/authMiddleware");
// router.get('/adminTokenVerify',  tokenVerify.verifyAdmin);
router.get('/userTokenVerify', auth.authMiddleware,  tokenVerify.verifyUser, (req, res) => {
    res.json({message: 'Token valid', user : req.user})
});

router.get("/adminTokenVerify",auth.adminAuthMiddleware, tokenVerify.verifyAdmin, (req, res) => {
  res.json({ message: "Token valid", admin: req.admin });
});

module.exports = router;



