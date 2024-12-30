import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// @mui
import { Button, TableRow, TableCell, IconButton, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
import CreateEditStudentDialog from './CreateEditStudentDialog';
import AssignedCoursesModal from './AssignedCoursesModal';
import {
  updateStudentRequest,
  deleteStudentRequest,
  getAssignedCoursesRequest,
} from '../../actions/student';

// ----------------------------------------------------------------------

function StudentTableRow({
  Student: { message },
  rowIndex,
  row,
  updateStudent,
  deleteStudent,
  getAssignedCourses,
}) {
  useEffect(() => {
    if (message) {
      handleCloseConfirm();
    }
    // eslint-disable-next-line
  }, [message]);

  const { id, first_name, last_name, email, enrollmentDate, dateOfBirth, isActive } = row || {};

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCoursesModal, setOpenCoursesModal] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOpenCoursesModal = async () => {
    setOpenCoursesModal(true);
    getAssignedCourses(id);
  };
  const handleCloseCoursesModal = () => setOpenCoursesModal(false);

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{rowIndex}</TableCell>

        <TableCell align="center">
          <Typography variant="subtitle2" noWrap>
            {first_name} {last_name}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="subtitle2" noWrap>
            {email}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="subtitle2" noWrap>
            {new Date(dateOfBirth).toLocaleDateString()}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="subtitle2" noWrap>
            {new Date(enrollmentDate).toLocaleDateString()}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="subtitle2" noWrap>
            {isActive ? 'Active' : 'Inactive'}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Button onClick={handleOpenCoursesModal} color="primary">
            View Courses
          </Button>
        </TableCell>

        <TableCell align="center">
          <CreateEditStudentDialog isEdit currentStudent={row} handleSubmited={updateStudent} />
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
        content="Are you sure want to delete this student?"
        action={
          <Button variant="contained" color="error" onClick={() => deleteStudent(id)}>
            Delete
          </Button>
        }
      />

      <AssignedCoursesModal open={openCoursesModal} onClose={handleCloseCoursesModal} />
    </>
  );
}

StudentTableRow.propTypes = {
  Student: PropTypes.object.isRequired,
  rowIndex: PropTypes.number,
  row: PropTypes.object,
  updateStudent: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  getAssignedCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Student: state.Student,
});

export default connect(mapStateToProps, {
  updateStudent: updateStudentRequest,
  deleteStudent: deleteStudentRequest,
  getAssignedCourses: getAssignedCoursesRequest,
})(StudentTableRow);
