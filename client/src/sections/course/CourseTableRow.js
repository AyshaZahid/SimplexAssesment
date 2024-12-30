import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// @mui
import { Button, Checkbox, TableRow, TableCell, IconButton, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
import CreateEditCourseDialog from './CreateEditCourseDialog';
import {
  updateCourseRequest,
  deleteCourseRequest,
  getAssignedStudentsRequest,
} from '../../actions/course';
import AssignedStudentsModal from './AssignedStudentsModal';
// ----------------------------------------------------------------------

function CourseTableRow({
  Course: { message },
  rowIndex,
  row,
  updateCourse,
  deleteCourse,
  getAssignedStudents,
}) {
  useEffect(() => {
    if (message) {
      handleCloseConfirm();
    }
    // eslint-disable-next-line
  }, [message]);

  const { id, course_name, description, duration, isActive } = row || {};

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openStudentsModal, setOpenStudentsModal] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenStudentsModal = async () => {
    setOpenStudentsModal(true);
    getAssignedStudents(id);
  };
  const handleCloseStudentsModal = () => setOpenStudentsModal(false);

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{rowIndex}</TableCell>

        <TableCell align="center">{course_name}</TableCell>
        <TableCell align="center">{description}</TableCell>
        <TableCell align="center">
          <Typography variant="subtitle2" noWrap>
            {`${duration} week${duration > 1 ? 's' : ''}`}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="subtitle2" noWrap>
            {isActive ? 'Active' : 'Inactive'}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Button onClick={handleOpenStudentsModal} color="primary">
            View Students
          </Button>
        </TableCell>

        <TableCell align="center">
          <CreateEditCourseDialog isEdit currentCourse={row} handleSubmited={updateCourse} />
          <IconButton
            sx={{ ml: 1, color: 'error.main' }}
            onClick={() => {
              handleOpenConfirm();
            }}
          >
            <Iconify color="error" icon="majesticons:delete-bin-line" />
          </IconButton>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete this course?"
        action={
          <Button variant="contained" color="error" onClick={() => deleteCourse(id)}>
            Delete
          </Button>
        }
      />

      <AssignedStudentsModal open={openStudentsModal} onClose={handleCloseStudentsModal} />
    </>
  );
}

CourseTableRow.propTypes = {
  Course: PropTypes.object.isRequired,
  rowIndex: PropTypes.number,
  row: PropTypes.object,
  updateCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  getAssignedStudents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Course: state.Course,
});

export default connect(mapStateToProps, {
  updateCourse: updateCourseRequest,
  deleteCourse: deleteCourseRequest,
  getAssignedStudents: getAssignedStudentsRequest,
})(CourseTableRow);
