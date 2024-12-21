import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
} from "@mui/material";

import useLoginRegister from "../../hooks/useLoginRegister";

function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { handleOnLoginSubmit } = useLoginRegister();

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleOnLoginSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                  variant="outlined"
                  size="small"
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                  variant="outlined"
                  size="small"
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ background: "#282c34" }}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
