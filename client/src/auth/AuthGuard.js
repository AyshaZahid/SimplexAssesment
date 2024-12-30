import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/login';

import { getUserRequest } from '../actions/auth';

// ----------------------------------------------------------------------

function AuthGuard({ children, Auth: { isAuthenticated, isInitialized, token }, getUser }) {
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (token) {
      getUser(token);
    }
    // eslint-disable-next-line
  }, [pathname, token]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    push(requestedLocation);
  }

  return <> {children} </>;
}

AuthGuard.propTypes = {
  Auth: PropTypes.object.isRequired,
  children: PropTypes.node,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, { getUser: getUserRequest })(AuthGuard);
