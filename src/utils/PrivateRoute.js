import { Outlet, Navigate } from 'react-router-dom';
// eslint-disable-next-line
import { PropTypes } from 'prop-types';

const PrivateRoute = ({ userAllowed, redirectTo }) => {
  return userAllowed ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

PrivateRoute.propTypes = {
  userAllowed: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
};

PrivateRoute.defaultProps = {
  redirectTo: '/login',
};

export default PrivateRoute;
