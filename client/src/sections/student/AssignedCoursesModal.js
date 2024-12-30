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
import { deleteAssignedCourseRequest } from '../../actions/student'; // replace with your actual delete action

function AssignedCoursesModal({
  Student: { assignedCourses },
  open,
  onClose,
  deleteAssignedCourse,
}) {
  const handleDelete = (assignedCourseId) => {
    // Dispatch the action to delete the assigned course by its ID
    deleteAssignedCourse(assignedCourseId);
    onClose();
  };
  // assignedCourses.id
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Assigned Courses</DialogTitle>
      <DialogContent>
        {assignedCourses &&
        assignedCourses.enrolledCourses &&
        assignedCourses.enrolledCourses.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Course Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignedCourses &&
                assignedCourses.enrolledCourses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{course.course_name}</TableCell>
                    <TableCell align="center">{course.description}</TableCell>
                    <TableCell align="center">{`${course.duration} weeks`}</TableCell>
                    <TableCell align="center">{course.isActive ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        sx={{ color: 'error.main' }}
                        onClick={() => handleDelete(course.assignedId)} // Assume course.id is the unique identifier
                      >
                        <Iconify icon="majesticons:delete-bin-line" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <p>No courses assigned.</p>
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

AssignedCoursesModal.propTypes = {
  Student: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteAssignedCourse: PropTypes.func.isRequired, // Add delete function prop
};

const mapStateToProps = (state) => ({
  Student: state.Student,
});

export default connect(mapStateToProps, { deleteAssignedCourse: deleteAssignedCourseRequest })(
  AssignedCoursesModal
);
