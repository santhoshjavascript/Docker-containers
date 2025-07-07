import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  updateProfile,
  deleteAccount,
  logout,
} from "../features/authentication/redux/user.Slice";
import styles from "./Form.module.css";

function Home() {
  const { user, isAuthenticated, error, loading } = useSelector(
    (state) => state.credential
  );
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [isEditing, setIsEditing] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
    }
    // Reset success message when entering edit mode
    if (isEditing) {
      setSuccessMessage("");
    }
  }, [user, isEditing]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log("Attempting update with name:", name, "bio:", bio);
    try {
      await dispatch(updateProfile(name, bio)).unwrap();
      console.log("Update successful, setting isEditing to false");
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await dispatch(deleteAccount());
      setShouldRedirect(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setShouldRedirect(true);
  };

  if (!isAuthenticated || shouldRedirect) return <Navigate to="/" />;

  return (
    <div className={`${styles.formContainer} ${styles.profileContainer}`}>
      <h1>Profile</h1>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.profileCard}>
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
            />
            <button type="submit" disabled={loading || !name}>
              Save Changes
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {user?.name || "No name provided"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "No email provided"}
            </p>
            <p>
              <strong>Bio:</strong> {user?.bio || "No bio provided"}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {user?.created_at
                ? new Date(user.created_at).toLocaleString()
                : "Unknown"}
            </p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
