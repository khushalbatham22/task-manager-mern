import React, { useEffect, useState } from "react";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@mui/material";
import { setMessage } from "../../state/authSlice";

function CustomSnackbar() {
  const { message } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
    message: "",
  });

  const handleOpen = ({ message }) => {
    if (message)
      setState({
        open: true,
        message,
      });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
      message: "",
    });
    dispatch(setMessage(""));
  };

  useEffect(() => {
    if (message) handleOpen({ message });
  }, [message]);
  
  return (
    <Snackbar
      open={state.open}
      onClose={handleClose}
      TransitionComponent={state.Transition}
      message={state.message}
      autoHideDuration={1200}
    />
  );
}

export default CustomSnackbar;
