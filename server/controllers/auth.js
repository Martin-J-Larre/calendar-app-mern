exports.createUser = (req, res) => {
  console.log(req);
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: "ok",
    message: "createUser",
    name,
    email,
    password,
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  res.status(200).json({
    ok: "ok",
    message: "loginUser",
    email,
    password,
  });
};

exports.renewTokenUser = (req, res) => {
  res.json({ ok: "ok", message: "renewNewToken" });
};
