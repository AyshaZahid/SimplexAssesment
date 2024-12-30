import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { FormControl, InputLabel, MenuItem, Select, Button, FormHelperText } from '@mui/material';
// form
import FormProvider from '../../components/hook-form';

// ----------------------------------------------------------------------

function AssignCoursesForm({ students, courses, onSubmit }) {
  const AssignCoursesSchema = Yup.object().shape({
    studentId: Yup.string().required('Student is required'),
    courseId: Yup.string().required('Course is required'),
  });

  const defaultValues = useMemo(
    () => ({
      studentId: '',
      courseId: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(AssignCoursesSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset({
      studentId: '',
      courseId: '',
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <Controller
          name="studentId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.studentId}>
              <InputLabel id="student-label">Select Student</InputLabel>
              <Select {...field} labelId="student-label" label="Select Student">
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {`${student.first_name} ${student.last_name}`}
                  </MenuItem>
                ))}
              </Select>
              {errors.studentId && <FormHelperText>{errors.studentId.message}</FormHelperText>}
            </FormControl>
          )}
        />

        <Controller
          name="courseId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.courseId}>
              <InputLabel id="course-label">Select Course</InputLabel>
              <Select {...field} labelId="course-label" label="Select Course">
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {`${course.course_name}`}
                  </MenuItem>
                ))}
              </Select>
              {errors.courseId && <FormHelperText>{errors.courseId.message}</FormHelperText>}
            </FormControl>
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          Assign Course
        </Button>
      </div>
    </FormProvider>
  );
}

AssignCoursesForm.propTypes = {
  students: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AssignCoursesForm;
