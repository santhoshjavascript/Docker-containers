import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Axios config
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = false; // Disable credentials for stateless API

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  error: null,
  isAuthenticated: !!token,
  loading: false,
  authSource: null,
};

const FIREBASE_BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const API_KEY = "AIzaSyD3yGuupb5HWPskBrFuuOPf5oTasMV3ZaY";

const credentialSlice = createSlice({
  name: "credential",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.authSource = action.payload.authSource;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
      state.authSource = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setLoading, setUser, setError, logout } =
  credentialSlice.actions;

// Helper function for API requests
const makeApiRequest = async (dispatch, requestFn) => {
  dispatch(setLoading(true));
  try {
    return await requestFn();
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      "An error occurred";
    dispatch(setError(errorMessage));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Sign Up
export const signUp = (name, email, password) => async (dispatch) => {
  return makeApiRequest(dispatch, async () => {
    const res = await axios.post("/api/register", { name, email, password });
    const token = res.data?.data?.token;
    if (!token) throw new Error("Invalid response format");

    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    dispatch(
      setUser({
        user: {
          id: decoded.sub || res.data.data.user?.id,
          name: res.data.data.user?.name || name,
          email: res.data.data.user?.email || email,
          created_at:
            res.data.data.user?.created_at || new Date().toISOString(),
          bio: res.data.data.user?.bio || "",
        },
        authSource: "custom",
      })
    );
    return res.data;
  });
};

// Sign In
export const signIn = (email, password) => async (dispatch) => {
  return makeApiRequest(dispatch, async () => {
    const res = await axios.post("/api/login", { email, password });
    const token = res.data?.data?.token;
    if (!token) throw new Error("Invalid response format");

    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    dispatch(
      setUser({
        user: {
          id: decoded.sub || res.data.data.user?.id,
          name: res.data.data.user?.name || "",
          email: res.data.data.user?.email || email,
          created_at:
            res.data.data.user?.created_at || new Date().toISOString(),
          bio: res.data.data.user?.bio || "",
        },
        authSource: "custom",
      })
    );
    return res.data;
  });
};

// Sign Out
export const signOut = () => async (dispatch) => {
  return makeApiRequest(dispatch, async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    await axios.post("/api/logout", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(logout());
  });
};

// Update Profile
export const updateProfile = (name, bio) => async (dispatch, getState) => {
  return makeApiRequest(dispatch, async () => {
    const { authSource } = getState().credential;
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    if (authSource === "firebase") {
      const res = await axios.post(
        `${FIREBASE_BASE_URL}update?key=${API_KEY}`,
        { idToken: token, displayName: name, returnSecureToken: true }
      );
      dispatch(
        setUser({
          user: {
            name: res.data.displayName || name,
            email: res.data.email,
            id: res.data.localId,
            bio: bio || "",
            created_at: new Date().toISOString(),
          },
          authSource: "firebase",
        })
      );
    } else {
      const res = await axios.put(
        "/api/profile",
        { name, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const current = getState().credential.user;
      dispatch(
        setUser({
          user: {
            name: res.data.data?.user?.name || name,
            email: res.data.data?.user?.email || current.email,
            id: res.data.data?.user?.id || current.id,
            bio: res.data.data?.user?.bio || bio,
            created_at: res.data.data?.user?.created_at || current.created_at,
          },
          authSource: "custom",
        })
      );
      return res.data;
    }
  });
};

// Delete Account
export const deleteAccount = () => async (dispatch, getState) => {
  return makeApiRequest(dispatch, async () => {
    const { authSource } = getState().credential;
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    if (authSource === "firebase") {
      await axios.post(`${FIREBASE_BASE_URL}delete?key=${API_KEY}`, {
        idToken: token,
      });
    } else {
      await axios.delete("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    dispatch(logout());
  });
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    if (!email) throw new Error("Email is required");
    await axios.post(`${FIREBASE_BASE_URL}sendOobCode?key=${API_KEY}`, {
      requestType: "PASSWORD_RESET",
      email,
    });
    return { success: true, message: "Password reset sent" };
  } catch (error) {
    const msg = error.response?.data?.error?.message || error.message;
    dispatch(setError(msg));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Sign In with Google
export const signInWithGoogle = (credentialResponse) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { credential } = credentialResponse;
    if (!credential) throw new Error("No Google credential");

    localStorage.setItem("token", credential);
    const userInfo = jwtDecode(credential);

    dispatch(
      setUser({
        user: {
          id: userInfo.sub,
          name: userInfo.name || "",
          email: userInfo.email,
          created_at: new Date().toISOString(),
          bio: "",
        },
        authSource: "firebase",
      })
    );
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Validate Token
export const validateToken = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
      return;
    }

    const { authSource } = getState().credential;

    if (authSource === "firebase" || !authSource) {
      const res = await axios.post(
        `${FIREBASE_BASE_URL}lookup?key=${API_KEY}`,
        { idToken: token }
      );
      if (!res.data?.users?.length) throw new Error("Invalid Firebase token");

      const user = res.data.users[0];
      dispatch(
        setUser({
          user: {
            id: user.localId,
            name: user.displayName || "",
            email: user.email,
            created_at: user.created_at || new Date().toISOString(),
            bio: "",
          },
          authSource: "firebase",
        })
      );
    } else {
      const res = await axios.get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.data?.success) throw new Error("Invalid backend token");

      const decoded = jwtDecode(token);
      dispatch(
        setUser({
          user: {
            id: res.data.data?.user?.id || decoded.sub,
            name: res.data.data?.user?.name || "",
            email: res.data.data?.user?.email || "",
            created_at:
              res.data.data?.user?.created_at || new Date().toISOString(),
            bio: res.data.data?.user?.bio || "",
          },
          authSource: "custom",
        })
      );
    }
  } catch (error) {
    dispatch(logout());
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Get CRUD Logs
export const getCrudLogs = () => async (dispatch) => {
  return makeApiRequest(dispatch, async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    const res = await axios.get("/api/crud-logs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.data?.success) throw new Error("Failed to retrieve CRUD logs");

    return res.data.data.logs;
  });
};

export default credentialSlice.reducer;
