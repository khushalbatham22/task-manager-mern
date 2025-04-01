import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logIn, register } from "../state/authSlice";
import { useState } from "react";

function useLoginRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleOnLoginSubmit = (data) => {
    const { email, password } = data;
    const callBack = () => {
      login();
      navigate("/");
    };
    if (!captchaValue) {
      alert("Please complete the reCAPTCHA!");
      return;
    }
    dispatch(logIn({ email, password, callBack }));
  };

  const handleOnRegistrationSubmit = (data) => {
    const { email, password } = data;
    const callBack = () => {
      navigate("/login");
    };
    if (!captchaValue) {
      alert("Please complete the reCAPTCHA!");
      return;
    }
    dispatch(register({ email, password, callBack }));
  };

  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return {
    handleOnLoginSubmit,
    handleOnRegistrationSubmit,
    handleRecaptchaChange,
  };
}

export default useLoginRegister;
