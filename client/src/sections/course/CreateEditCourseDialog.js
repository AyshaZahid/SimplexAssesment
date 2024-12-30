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
import { clearMessage, clearError } from '../../actions/course';
// ----------------------------------------------------------------------

function CreateEditCourseDialog({
  Course: { message, error },

  isEdit = false,
  currentCourse,
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

  const NewCourseSchema = Yup.object().shape({
    course_name: Yup.string().max(255).required('Course Name is required'),
    description: Yup.string().optional(),
    duration: Yup.number()
      .integer()
      .min(1, 'Duration must be at least 1 week')
      .required('Duration is required'),
    isActive: Yup.boolean().optional(),
  });

  const defaultValues = useMemo(
    () => ({
      course_name: currentCourse?.course_name || '',
      description: currentCourse?.description || '',
      duration: currentCourse?.duration || '',
      isActive: currentCourse?.isActive || true,
    }),
    [currentCourse]
  );

  const methods = useForm({
    resolver: yupResolver(NewCourseSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (isEdit && currentCourse) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCourse]);

  const onSubmit = async (data) => {
    try {
      const courseData = {
        course_name: data.course_name,
        description: data.description,
        duration: data.duration,
        isActive: data.isActive ?? true,
      };

      if (!isEdit) {
        handleSubmited(courseData); // Handle creation
      } else {
        handleSubmited({ courseData, id: currentCourse.id }); // Handle update
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
          Add Course
        </Button>
      )}
      <Dialog fullWidth open={open} onClose={handleClose}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Course</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item xs={12} sm={12}>
                  <RHFTextField name="course_name" label="Course Name *" />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <RHFTextField name="description" label="Description" multiline rows={4} />
                </Grid>
                <Grid item xs={12} sm={isEdit ? 6 : 12}>
                  <RHFTextField name="duration" label="Duration (weeks) *" type="number" />
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

CreateEditCourseDialog.propTypes = {
  Course: PropTypes.object.isRequired,

  isEdit: PropTypes.bool,
  currentCourse: PropTypes.object,
  handleSubmited: PropTypes.func,
  clrMessage: PropTypes.func,
  clrError: PropTypes.func,
};

const mapStateToProps = (state) => ({
  Course: state.Course,
});

export default connect(mapStateToProps, {
  clrMessage: clearMessage,
  clrError: clearError,
})(CreateEditCourseDialog);
