const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { tokenGenerate } = require("../helpers/jwt");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        message: "User email already exist",
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await tokenGenerate(user.id, user.name);

    res.status(201).json({
      ok: true,
      message: "User saved",
      uid: user.id,
      name: user.name,
      password: user.password,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error trying to save User",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "User does not exist",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: "Incorrect password",
      });
    }

    //todo: JWT
    const token = await tokenGenerate(user.id, user.name);

    res.status(200).json({
      ok: true,
      message: "User Logged",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error trying to login",
    });
  }
};

exports.renewTokenUser = async (req, res) => {
  const { uid, name } = req;

  const token = await tokenGenerate(uid, name);

  res.json({ ok: true, uid, name, token });
};
