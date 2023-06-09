import "./loginPage.css";
import { useForm } from "../../hooks/";

const loginForm = {
  loginEmail: "",
  loginPassword: "",
};

const registerForm = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerConfirmPassword: "",
};

export const LoginPage = () => {
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginForm);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
    onInputChange: onRegisterInputChange,
  } = useForm(registerForm);

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log({ loginEmail, loginPassword });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    console.log({
      registerName,
      registerEmail,
      registerPassword,
      registerConfirmPassword,
    });
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Sign up</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="registerConfirmPassword"
                value={registerConfirmPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Create account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
