import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Iconify from '../../components/iconify'; // assuming you are using Iconify for icons
import { deleteAssignedStudentRequest } from '../../actions/course'; // replace with your actual delete action

function AssignedStudentsModal({
  Course: { assignedStudents },
  open,
  onClose,
  deleteAssignedStudent,
}) {
  const handleDelete = (assignedStudentId) => {
    // Dispatch the action to delete the assigned course by its ID
    deleteAssignedStudent(assignedStudentId);
    onClose();
  };

  // assignedStudent.id
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Assigned Students</DialogTitle>
      <DialogContent>
        {assignedStudents && assignedStudents.students && assignedStudents.students.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Date of Birth</TableCell>
                <TableCell align="center">Enrollment Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignedStudents &&
                assignedStudents.students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{`${student.first_name} ${student.last_name}`}</TableCell>
                    <TableCell align="center">{student.email}</TableCell>
                    <TableCell align="center">
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">{student.isActive ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        sx={{ color: 'error.main' }}
                        onClick={() => handleDelete(student.assignedId)} // Assume student.id is the unique identifier
                      >
                        <Iconify icon="majesticons:delete-bin-line" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <p>No students assigned.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AssignedStudentsModal.propTypes = {
  Course: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteAssignedStudent: PropTypes.func.isRequired, // Add delete function prop
};

const mapStateToProps = (state) => ({
  Course: state.Course,
});

export default connect(mapStateToProps, { deleteAssignedStudent: deleteAssignedStudentRequest })(
  AssignedStudentsModal
);
