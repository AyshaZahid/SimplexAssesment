// next
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';

import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths';
// layouts
import DashboardLayout from '../../layouts/dashboard';

import AssignCoursesForm from '../../sections/student/AssignCoursesForm';
import {
  getStudentRequest,
  clearStudentList,
  assignCourseStudentRequest,
  clearMessage,
  clearError,
} from '../../actions/student';
import { getCourseRequest, clearCourseList } from '../../actions/course';
import { useSnackbar } from '../../components/snackbar';
// ----------------------------------------------------------------------

AssignPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

function AssignPage({
  Student: { studentList, message, error },
  Course: { courseList },
  Auth: { isAuthenticated },
  getStudent,
  clrStudentList,
  getCourse,
  clrCourseList,
  assignCourse,
  clrMessage,
  clrError,
}) {
  const [studentData, setStudentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(PATH_AUTH.login);
    }

    if (!studentList) {
      getStudent();
    } else {
      setStudentData(studentList);
    }
    if (!courseList) {
      getCourse();
    } else {
      setCourseData(courseList);
    }

    // eslint-disable-next-line
  }, [isAuthenticated, studentList, courseList]);

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant: 'success' });

      clrMessage();
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });

      clrError();
    }
    // eslint-disable-next-line
  }, [message, error]);

  useEffect(
    () => () => {
      clrStudentList();
      clrCourseList();
      // eslint-disable-next-line
    },
    []
  );

  const { themeStretch } = useSettingsContext();

  const router = useRouter();

  const handleCourseAssignment = (data) => {
    try {
      const assign = {
        student_id: data.studentId,
        course_id: data.courseId,
      };
      assignCourse(assign);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Head>
        <title> Courses: List</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'md'}>
        <CustomBreadcrumbs
          heading="Assign Course"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Assign Course' }]}
        />

        <AssignCoursesForm
          students={studentData}
          courses={courseData}
          onSubmit={handleCourseAssignment}
        />
      </Container>
    </>
  );
}

AssignPage.propTypes = {
  Student: PropTypes.object.isRequired,
  Course: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  getStudent: PropTypes.func.isRequired,
  clrStudentList: PropTypes.func.isRequired,
  getCourse: PropTypes.func.isRequired,
  clrCourseList: PropTypes.func.isRequired,
  assignCourse: PropTypes.func.isRequired,
  clrMessage: PropTypes.func,
  clrError: PropTypes.func,
};

const mapStateToProps = (state) => ({
  Student: state.Student,
  Course: state.Course,
  Auth: state.Auth,
});
export default connect(mapStateToProps, {
  getStudent: getStudentRequest,
  clrStudentList: clearStudentList,
  getCourse: getCourseRequest,
  clrCourseList: clearCourseList,
  assignCourse: assignCourseStudentRequest,
  clrMessage: clearMessage,
  clrError: clearError,
})(AssignPage);
