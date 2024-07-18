const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// signup api :-
router.post("/signup", async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser || existingEmail) {
      return res.status(400).json({ message: "user already existed" });
    } else if (username.length <= 3) {
      return res
        .status(400)
        .json({ message: "username should have atleast 4 characters" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "signUp succesfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// to show all the data from  the database :-
router.get("/get", async (req, res) => {
  try {
    let response = await User.find({});
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// to delete a data from a database :-
router.delete("/delete", async (req, res) => {
  try {
    let { id } = req.body;
    const del = await User.findByIdAndDelete(id);
    if (!del) {
      return res.status(400).json({ message: "product not found" });
    }
    return res.status(200).json({ message: "product deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// login page :-
router.post("/login", async (req, res) => {
  let { username } = req.body;
  let { password } = req.body;
  let existinguser = await User.findOne({ username });
  if (!existinguser) {
    res.status(400).json({ message: "email or password is incorrect" });
  }
  bcrypt.compare(password, existinguser.password, (err, data) => {
    if (data) {
      const authClaims = [{ name: username }, { jti: jwt.sign({}, "tcmTM") }];
      const token = jwt.sign({ authClaims }, "tcmTM", { expiresIn: "2d" });
      res.status(200).json({ id: existinguser._id, token: token });
    } else {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
  });
});
module.exports = router;
