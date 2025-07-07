import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle } from "../redux/user.Slice";
import { GoogleLogin } from "@react-oauth/google";

function Icons() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.credential);

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google credential received:", credentialResponse);
    dispatch(signInWithGoogle(credentialResponse));
  };

  const handleGoogleError = () => {
    console.log("Google sign-in failed");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        disabled={loading}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Icons;
