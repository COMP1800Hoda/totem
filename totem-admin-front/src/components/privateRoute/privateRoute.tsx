import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  // Check if the session cookie exists
  const authToken = Cookies.get('authToken');

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
