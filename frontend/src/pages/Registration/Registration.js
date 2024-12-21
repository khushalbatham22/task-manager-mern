import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import useLoginRegister from "../../hooks/useLoginRegister";

function Registration() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const { handleOnRegistrationSubmit } = useLoginRegister();

  const password = watch("password");

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Registration
      </Typography>
      <form onSubmit={handleSubmit(handleOnRegistrationSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
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
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ background: "#282c34" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default Registration;
