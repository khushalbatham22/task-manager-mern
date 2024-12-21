import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logIn, register } from "../state/authSlice";

function useLoginRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnLoginSubmit = (data) => {
    const { email, password } = data;
    const callBack = () => {
      login();
      navigate("/");
    };
    dispatch(logIn({ email, password, callBack }));
  };

  const handleOnRegistrationSubmit = (data) => {
    const { email, password } = data;
    const callBack = () => {
      navigate("/login");
    };
    dispatch(register({ email, password, callBack }));
  };

  return {
    handleOnLoginSubmit,
    handleOnRegistrationSubmit,
  };
}

export default useLoginRegister;
