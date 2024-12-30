// next
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
// @mui
import {
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
  Button,
  IconButton,
} from '@mui/material';
import {
  StudentTableRow,
  StudentTableToolbar,
  CreateEditStudentDialog,
} from '../../sections/student';
// components
import Scrollbar from '../../components/scrollbar';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../components/table';
// mock data or API actions
import { getStudentRequest, createStudentRequest, clearStudentList } from '../../actions/student';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components

// ----------------------------------------------------------------------

StudentListPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'index', label: 'No.', align: 'center' },
  { id: 'name', label: 'Name', align: 'center' },
  { id: 'email', label: 'Email', align: 'center' },
  { id: 'dateOfBirth', label: 'Date of Birth', align: 'center' },
  { id: 'enrollmentDate', label: 'Enrollment Date', align: 'center' },
  { id: 'isActive', label: 'Active Status', align: 'center' },
  { id: 'assignedCourses', label: 'Assigned Courses', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' },
];

function StudentListPage({
  Student: { studentList },
  Auth: { isAuthenticated },
  getStudent,
  clrStudentList,
  createStudent,
}) {
  const student = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    enrollmentDate: '2023-01-01',
    dateOfBirth: '2000-01-01',
    isActive: true,
    assignedCourses: ['Math 101', 'Science 202', 'History 303'],
  };

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(PATH_AUTH.login);
    }

    if (!studentList) {
      getStudent();
    } else {
      setTableData(studentList);
    }

    // eslint-disable-next-line
  }, [
    isAuthenticated,
    studentList,

    //  error
  ]);

  useEffect(
    () => () => clrStudentList(),
    // eslint-disable-next-line
    []
  );

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const router = useRouter();

  const [filterName, setFilterName] = useState('');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '';

  const isNotFound = !dataFiltered.length && !!filterName;

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  return (
    <>
      <Head>
        <title> Students: List</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'md'}>
        <CustomBreadcrumbs
          heading="Students List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Student' }]}
          action={<CreateEditStudentDialog handleSubmited={createStudent} />}
        />

        <Card>
          <StudentTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 300 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <StudentTableRow key={row.id} rowIndex={index + 1} row={row} />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPageOptions={[25, 50, 100]}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}

StudentListPage.propTypes = {
  Student: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  getStudent: PropTypes.func.isRequired,
  clrStudentList: PropTypes.func.isRequired,
  createStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Student: state.Student,
  Auth: state.Auth,
});
export default connect(mapStateToProps, {
  getStudent: getStudentRequest,
  clrStudentList: clearStudentList,
  createStudent: createStudentRequest,
})(StudentListPage);
// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => {
    const data = el[0];
    data.name = `${data.first_name} ${data.last_name}`;
    return data;
  });
  if (filterName) {
    inputData = inputData.filter(
      (data) => data.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
