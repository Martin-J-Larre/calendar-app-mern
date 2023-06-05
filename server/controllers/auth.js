exports.createUser = (req, res) => {
  const data = req.body;
  res.json({ ok: "ok", message: "createUser", data });
};
exports.loginUser = (req, res) => {
  res.json({ ok: "ok", message: "loginUser" });
};
exports.renewTokenUser = (req, res) => {
  res.json({ ok: "ok", message: "renewNewToken" });
};
