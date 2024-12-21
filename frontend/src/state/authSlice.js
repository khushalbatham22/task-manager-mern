import { createSlice } from "@reduxjs/toolkit";
import { accessToken, userDetails } from "../utils/localStorage";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { loginSuccess, setMessage } = authSlice.actions;

const API_URL = process.env.API_URL || "http://localhost:5000/api";

export function logIn({ email, password, callBack }) {
  return (dispatch) => {
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch(loginSuccess(data.user));
            accessToken.setAccessToken(data.token);
            userDetails.setUserDetails(data.user);
            callBack();
          });
        } else {
          response.json().then((data) => {
            dispatch(setMessage(data.message));
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks", error);
      });
  };
}

export function register({ email, password, callBack }) {
  return (dispatch) => {
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch(setMessage(data.message));
            callBack();
          });
        } else {
          response.json().then((data) => {
            dispatch(setMessage(data.message));
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks", error);
      });
  };
}
