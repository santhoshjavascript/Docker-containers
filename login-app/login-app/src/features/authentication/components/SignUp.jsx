import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import Icons from "./Icons";
import { Navigate } from "react-router-dom";
import { signUp, setError } from "../redux/user.Slice";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.credential
  );

  useEffect(() => {
    if (error) {
      console.error("Signup Error:", error);
    }
  }, [error]);

  const onSignUp = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      dispatch(setError("All fields are required."));
      return;
    }

    try {
      await dispatch(signUp(name, email, password)).unwrap();
    } catch (err) {
      console.error("SignUp error:", err);
    }
  };

  if (isAuthenticated) return <Navigate to="/home" />;

  return (
    <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
      <form onSubmit={onSignUp}>
        <h1>Create Account</h1>
        <Icons />
        <span>or use your email for registration</span>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          required
        />
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
          type="submit"
          disabled={!name || !email || !password || loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
