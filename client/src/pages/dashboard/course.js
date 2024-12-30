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
import { CourseTableRow, CourseTableToolbar, CreateEditCourseDialog } from '../../sections/course';
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
import { getCourseRequest, createCourseRequest, clearCourseList } from '../../actions/course';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components

// ----------------------------------------------------------------------

CourseListPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'index', label: 'No.', align: 'center' },
  { id: 'course_name', label: 'Course Name', align: 'center' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'duration', label: 'Duration', align: 'center' },
  { id: 'is_active', label: 'Active Status', align: 'center' },
  { id: 'assignedStudent', label: 'Assigned Student', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' },
];

function CourseListPage({
  Course: { courseList },
  Auth: { isAuthenticated },
  getCourse,
  clrCourseList,
  createCourse,
}) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(PATH_AUTH.login);
    }

    if (!courseList) {
      getCourse();
    } else {
      setTableData(courseList);
    }

    // eslint-disable-next-line
  }, [
    isAuthenticated,
    courseList,

    //  error
  ]);

  useEffect(
    () => () => clrCourseList(),
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
        <title> Courses: List</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'md'}>
        <CustomBreadcrumbs
          heading="Courses List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Course' }]}
          action={<CreateEditCourseDialog handleSubmited={createCourse} />}
        />

        <Card>
          <CourseTableToolbar
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
                      <CourseTableRow key={row.id} rowIndex={index + 1} row={row} />
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

CourseListPage.propTypes = {
  Course: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  getCourse: PropTypes.func.isRequired,
  clrCourseList: PropTypes.func.isRequired,
  createCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Course: state.Course,
  Auth: state.Auth,
});
export default connect(mapStateToProps, {
  getCourse: getCourseRequest,
  clrCourseList: clearCourseList,
  createCourse: createCourseRequest,
})(CourseListPage);
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

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (data) => data.course_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
