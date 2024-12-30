// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  welcome: path(ROOTS_DASHBOARD, '/welcome'),
  students: path(ROOTS_DASHBOARD, '/students'),
  course: path(ROOTS_DASHBOARD, '/course'),
  assign: path(ROOTS_DASHBOARD, '/assign'),
};
