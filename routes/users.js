const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//GETTING ALL
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GETTING ONE

router.get("/:id", getUser, (req, res, next) => {
  res.send(res.user)
});

//CREATING ONE
router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      contact: req.body.contact,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
    // user.push(user)
    // res.status(201).send()
  } catch (err) {
    res.status(400).send({ message: err.message })
  };
})

// Login details is here
router.post("/login", async (req, res) => {
  // Authenticate user
  const user = users.find(user => user.name = req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.send({ accessToken: accessToken })
}) 

//UPDATING ONE
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.contact != null) {
    res.user.contact = req.body.contact;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//DELETING ONE

router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

async function getUser(req, res, next) {
  let user;

  try {
    user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ message: "Cannot find user that u looking for..." });
    }
   catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
