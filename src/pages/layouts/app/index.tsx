import { Outlet } from 'react-router';

import ResponsiveAppBar from 'widgets/app-bar/app-bar';

const AppLayout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
};

export default AppLayout;

