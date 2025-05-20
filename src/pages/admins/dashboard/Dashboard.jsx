import React from 'react';
// import Header from '../../../components/admins/Header';
// import SideBar from '../../../components/admins/SideBar';
import DashboardAdmin from '../../../components/admins/DashboardAdmin';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="admin-wrapper">
      <DashboardAdmin></DashboardAdmin>
    </div>
  );
};

export default Dashboard;