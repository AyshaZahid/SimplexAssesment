// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------

Welcome.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Welcome() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Welcome | Student and Course Management System</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Welcome to the Student and Course Management System
        </Typography>

        <Typography gutterBottom>
          This system allows you to efficiently manage students and courses. You can add, edit, and
          view student details, as well as assign and manage courses for them. Additionally, you can
          create and manage courses, and view the list of enrolled students.
        </Typography>
      </Container>
    </>
  );
}
