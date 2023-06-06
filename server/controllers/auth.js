const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { email } = req.body;
  try {
    let userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({
        ok: false,
        message: "Email already exist",
      });
    }

    const user = new User(req.body);
    const userSaved = await user.save();

    res.status(201).json({
      ok: true,
      message: "User saved",
      uid: userSaved.id,
      name: userSaved.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error trying to save User",
    });
  }
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  res.status(200).json({
    // ok: true,
    // message: "User saved",
    // uid: userSaved.id,
    // name: userSaved.name,
  });
};

exports.renewTokenUser = (req, res) => {
  res.json({ ok: "ok", message: "renewNewToken" });
};
