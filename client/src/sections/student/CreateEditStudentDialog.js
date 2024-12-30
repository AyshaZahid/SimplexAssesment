import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/iconify';
import { clearMessage, clearError } from '../../actions/student';
// ----------------------------------------------------------------------

function CreateEditStudentDialog({
  Student: { message, error },

  isEdit = false,
  currentStudent,
  handleSubmited,
  clrMessage,
  clrError,
}) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant: 'success' });
      handleClose();
      clrMessage();
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      handleClose();
      clrError();
    }
    // eslint-disable-next-line
  }, [message, error]);

  const NewStudentSchema = Yup.object().shape({
    first_name: Yup.string().min(3).max(255).required('First Name is required'),
    last_name: Yup.string().min(3).max(255).required('Last Name is required'),
    email: Yup.string().email().min(5).max(255).required('Email is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    enrollmentDate: Yup.date().nullable(),
    isActive: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentStudent?.first_name || '',
      last_name: currentStudent?.last_name || '',
      email: currentStudent?.email || '',
      dateOfBirth: currentStudent?.dateOfBirth || null,
      enrollmentDate: currentStudent?.enrollmentDate || new Date().toISOString().split('T')[0],
      isActive: currentStudent?.isActive || true,
    }),
    [currentStudent]
  );

  const methods = useForm({
    resolver: yupResolver(NewStudentSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (isEdit && currentStudent) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentStudent]);

  const onSubmit = async (data) => {
    try {
      const studentData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        enrollmentDate: data.enrollmentDate,
        isActive: data.isActive ?? true,
      };

      if (!isEdit) {
        handleSubmited(studentData); // Handle creation
      } else {
        handleSubmited({ studentData, id: currentStudent.id }); // Handle update
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {(isEdit && (
        <IconButton sx={{ color: 'primary.main' }} onClick={handleClickOpen}>
          <Iconify icon="material-symbols:edit-square-outline" />
        </IconButton>
      )) || (
        <Button variant="soft" onClick={handleClickOpen}>
          Add Student
        </Button>
      )}
      <Dialog fullWidth open={open} onClose={handleClose}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="first_name" label="First Name *" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="last_name" label="Last Name *" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="email" label="Email *" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    name="dateOfBirth"
                    label="Date of Birth *"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={isEdit ? 6 : 12}>
                  <RHFTextField
                    name="enrollmentDate"
                    label="Enrollment Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {isEdit && (
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="isActive"
                      control={methods.control} // Control from react-hook-form
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value} />}
                          label="Active"
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              {!isEdit ? 'Submit' : 'Update'}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

CreateEditStudentDialog.propTypes = {
  Student: PropTypes.object.isRequired,

  isEdit: PropTypes.bool,
  currentStudent: PropTypes.object,
  handleSubmited: PropTypes.func,
  clrMessage: PropTypes.func,
  clrError: PropTypes.func,
};

const mapStateToProps = (state) => ({
  Student: state.Student,
});

export default connect(mapStateToProps, {
  clrMessage: clearMessage,
  clrError: clearError,
})(CreateEditStudentDialog);
