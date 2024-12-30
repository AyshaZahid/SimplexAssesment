// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  assign: icon('ic_file'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Welcome', path: PATH_DASHBOARD.welcome, icon: ICONS.dashboard },
      { title: 'Students', path: PATH_DASHBOARD.students, icon: ICONS.user },
      { title: 'Course', path: PATH_DASHBOARD.course, icon: ICONS.ecommerce },
      { title: 'AssignCourses', path: PATH_DASHBOARD.assign, icon: ICONS.assign },
    ],
  },
];

export default navConfig;
