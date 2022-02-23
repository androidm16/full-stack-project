const express = require("express");
const router = express.Router();
const User = require("../models/user");

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

router.get("/:id", (req, res, next) => {
  res.send(req.params.id)
});

//CREATING ONE
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    contact: req.body.contact,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//UPDATING ONE
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.name != null) {
    res.user.subscribedToChannel = req.body.subscribedToChannel;
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
    user = await user.findById(req.params.id);
    if (user == null) {
      return res
        .status(400)
        .json({ message: "Cannot find user that u looking for..." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
