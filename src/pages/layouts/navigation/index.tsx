import { Outlet } from 'react-router';

import ResponsiveAppBar from 'widgets/app-bar/app-bar';

import styles from './styles.module.css';

const NavigationLayout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
};

export default NavigationLayout;

