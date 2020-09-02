var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const { getToken, isAuth } = require("../util");
const User = require("../models/user");

/* GET register. */
// router.get('/register', function (req, res) {
//   res.render('register', {
//     layout: 'layout/outside_layout',
//     title: 'register'
//   })
// });

//Post register

router.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;

  var existUser = await User.findOne({ username: username });

  console.log(existUser);
  if (existUser) {
    res.send({ error: "Exist User!" });
  } else {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = new User({
      name: name,
      email: email,
      username: username,
      password: hashPassword,
      isAdmin: false,
    });

    try {
      const newUser = await user.save();
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } catch (err) {
      res.status(500).json({
        err,
      });
    }
  }
});
router.get("/createadmin", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash("sd", salt);
    const user = new User({
      name: "sd",
      email: "sd@gmail",
      username: "sd",
      password: hashPassword,
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (!user) {
    res.status(401).send({ err: "User Not Found!" });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) console.log(err);

    if (isMatch) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: getToken(user),
      });
    } else {
      res.status(401).send({ err: "Wrong Password!" });
    }
  });
});

router.get("/getUser/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id, { name: 1, email: 1 });
    if (user) res.send(user);
    else res.send({ error: "User not found" });
  } catch (error) {
    res.send({ error: "User not found" });
  }
});

// router.get('/logout', (req, res) => {
//   req.logout()
//   res.redirect('/user/login')
// })

module.exports = router;
