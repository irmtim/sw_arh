import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { APP_URL, RoleType, WithChildren, useAuth } from 'shared';

type Props = {
  role: RoleType
}

const PermissionOutlet: FC<Props & WithChildren> = ({children, role}) => {
  const {currentUser} = useAuth();

  function isInRole(role: RoleType) {
    return currentUser && currentUser.roles?.indexOf(role) !== -1
  }

  return (
    isInRole(role) 
      ? (
        <div>
          {children}
          <Outlet/>
        </div>
      )
      : <Navigate to={APP_URL.ERROR_403} replace />);
};

export {PermissionOutlet};