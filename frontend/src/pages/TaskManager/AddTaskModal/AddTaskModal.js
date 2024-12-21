import {
  Backdrop,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ModalDialog from "@mui/joy/ModalDialog";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useForm } from "react-hook-form";

import React from "react";
import { convertToLocalizedDate } from "../../../utils/dateTimeFormater";
import dayjs from "dayjs";

function AddTaskModal({ open, onClose, handleOnSubmit, selectedTask, type }) {
  const { control, handleSubmit, setError, clearErrors } = useForm({
    defaultValues: {
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      dueDate: selectedTask?.dueDate
        ? dayjs(convertToLocalizedDate(selectedTask?.dueDate))
        : null,
    },
  });

  const modalTitle = !selectedTask ? "Create new task" : "Edit task";

  const onSubmit = (task) => {
    handleOnSubmit({ task, type });
    onClose();
  };

  const handleValidation = (fieldName, value) => {
    if (!value) {
      setError(fieldName, {
        type: "required",
        message: `${fieldName} is required`,
      });
    } else {
      clearErrors(fieldName);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <ModalDialog>
        <Typography variant="h6" sx={{ my: 0 }}>
          {modalTitle}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: `Title is required`,
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  helperText={error ? error.message : null}
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  label="Title"
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: `Description is required`,
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  helperText={error ? error.message : null}
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  label="Description"
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="dueDate"
              control={control}
              rules={{
                validate: (value) => value || "Schedule Date is required",
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Schedule Date"
                    value={value}
                    disablePast
                    onChange={(newValue) => {
                      onChange(newValue);
                      handleValidation("dueDate", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ background: "#282c34" }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default AddTaskModal;
