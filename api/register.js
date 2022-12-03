const express = require("express");
const User = require('../models/user');
const multer = require("multer");
const path = require("path");



const router = express.Router();

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
    // limits: {
    //     fileSize: 10
    // }
    
})

router.post('/register', upload.single('image'), async (req, res) => {
    let image = req.file.path
    const { fullName, email, password } = req.body;
   
    const alreadyExistsUser = await User.findOne({ where: { email } })
    .catch((err) => {
        console.log('Error: ', err)
    });

    if (alreadyExistsUser) {
        return res.status(409).json({message: "User with email already exists!" });
    }
    

    const newUser = new User({ fullName, email, password, image });
    const savedUser = await newUser.save()
    .catch((err) => {console.log('Error: ', err);
    res.status(500).json({ error: "Cannot register user at the moment" });
    });

    if (savedUser) res.json({ 
        message: 'Thanks for registering', 
        // success: 1,
        // profile_url: `http://localhost:3000/upload/images/${req.file.filename}`
    });
    
});

module.exports = router;