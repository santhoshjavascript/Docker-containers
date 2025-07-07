import { useState } from "react";
import styles from "./Form.module.css";
import Icons from "./Icons";
import { Navigate } from "react-router-dom";
import { signIn, forgotPassword, setError } from "../redux/user.Slice";
import { useDispatch, useSelector } from "react-redux";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.credential
  );

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      dispatch(setError("Email and password are required."));
      return;
    }

    try {
      await dispatch(signIn(email, password)).unwrap();
    } catch (err) {
      console.error("SignIn error:", err);
    }
  };

  const onResetPassword = () => {
    if (!email) {
      dispatch(setError("Please enter your email to reset password."));
      return;
    }

    dispatch(forgotPassword(email));
  };

  if (isAuthenticated) return <Navigate to="/home" />;

  return (
    <div className={`${styles.formContainer} ${styles.signInContainer}`}>
      <form onSubmit={onSubmit}>
        <h1>Sign in</h1>
        <Icons />
        <span>or use your account</span>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.changed}
          type="button"
          onClick={onResetPassword}
        >
          Forgot your password?
        </button>

        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
