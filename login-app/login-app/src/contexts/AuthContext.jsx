// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { createContext, useContext, useReducer } from "react";

// const AuthContextApi = createContext();

// const token = localStorage.getItem("token");

// const init = {
//   isAuthenticated: token ? true : false,
//   user: null,
//   error: null,
// };

// const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
// const API_KEY = "AIzaSyD3yGuupb5HWPskBrFuuOPf5oTasMV3ZaY";

// function reducer(state, action) {
//   switch (action.type) {
//     case "signUp":
//       return { ...state, user: action.payloads, isAuthenticated: true };

//     case "signIn":
//       return { ...state, user: action.payloads, isAuthenticated: true };

//     case "error":
//       return {
//         ...state,
//         error: action.payloads,
//         isAuthenticated: false,
//         user: null,
//       };

//     case "setUser":
//       return { ...state, user: action.payloads, isAuthenticated: true };

//     default:
//       throw new Error("None's Matched");
//   }
// }

// function AuthProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, init);
//   const { isAuthenticated, user, error } = state;

//   function signUp(name, email, password) {
//     async function register() {
//       try {
//         const response = await axios.post(`${BASE_URL}signUp?key=${API_KEY}`, {
//           displayName: name,
//           email,
//           password,
//         });
//         console.log(response);

//         if (response.data && response.data.idToken) {
//           const idToken = response.data.idToken;
//           localStorage.setItem("token", idToken);
//           dispatch({ type: "signUp", payloads: response.data });
//         }
//       } catch (error) {
//         console.log(error.response.data.error.message);
//         dispatch({
//           type: "error",
//           payloads: error.response.data.error.message,
//         });
//       }
//     }
//     register();
//   }

//   function signIn(email, password) {
//     async function login() {
//       try {
//         const response = await axios.post(
//           `${BASE_URL}signInWithPassword?key=${API_KEY}`,
//           {
//             email,
//             password,
//           }
//         );

//         if (response.data && response.data.idToken) {
//           const idToken = response.data.idToken;
//           localStorage.setItem("token", idToken);
//           dispatch({ type: "signIn", payloads: response.data });
//         }
//       } catch (error) {
//         console.log(error.response.data.error.message);
//         dispatch({
//           type: "error",
//           payloads: error.response.data.error.message,
//         });
//       }
//     }

//     login();
//   }

//   function signInWithGoogle(credentialResponse) {
//     const { credential } = credentialResponse;

//     if (credential) {
//       localStorage.setItem("token", credential);
//       console.log("User credential:", credential);
//       try {
//         const userInfo = jwtDecode(credential);
//         userInfo && dispatch({ type: "signUp", payloads: credential });
//         console.log("userInfo", userInfo);
//       } catch (error) {
//         console.log(error);
//         dispatch({
//           type: "error",
//           payloads: error.response.data.error.message,
//         });
//       }
//     }
//   }

//   function forgotPassword(email) {
//     async function resetPassword() {
//       try {
//         await axios.post(`${BASE_URL}sendOobCode?key=${API_KEY}`, {
//           requestType: "PASSWORD_RESET",
//           email,
//         });
//         // Always show the same message to prevent revealing if the email exists
//         alert(
//           "If an account with this email exists, a password reset email has been sent."
//         );
//       } catch (error) {
//         // Handle network or other errors
//         alert("An error occurred. Please try again later.");
//         console.error(error.response ? error.response.data : error.message);
//       }
//     }

//     resetPassword();
//   }

//   return (
//     <AuthContextApi.Provider
//       value={{
//         signUp,
//         signIn,
//         isAuthenticated,
//         user,
//         error,
//         forgotPassword,
//         signInWithGoogle,
//       }}
//     >
//       {children}
//     </AuthContextApi.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContextApi);

//   if (context === undefined) {
//     throw new Error(
//       "Absolutely, you are calling useAuth outside of an AuthProvider."
//     );
//   }

//   return context;
// }

// export { AuthProvider, useAuth };
