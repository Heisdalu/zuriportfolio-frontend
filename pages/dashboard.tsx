import React from 'react';
import withAuth from '../helpers/withAuth';
import NavDashBoard from '../modules/dashboard/component/Navbar';

function dashboard() {
  return (
    <div className=''>
      <NavDashBoard active="dashboard" />
    </div>
  );
}
export default withAuth(dashboard);
