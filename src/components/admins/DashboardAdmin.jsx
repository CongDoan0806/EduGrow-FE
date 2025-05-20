// AdminDashboard.jsx
import React, { useEffect, useState} from 'react';
import './DashboardAdmin.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const DashboardAdmin = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    fetchDataDashboard();
}, []);

const fetchDataDashboard = async () => {
    try {
        setLoading(true);
        const response = await axios.get(`/api/admin/dashboard`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStats(response.data.data || null);
        setError(null);
    } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Could not fetch dashboard data');
        setError(error);
    } finally {
        setLoading(false); 
    }
};

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

  const COLORS = ['#8884d8', '#8dd1e1', '#a4de6c', '#ffc658', '#ff8042'];

  return (
    <div className="dashboard-container">
        <ToastContainer />
        <h2 className="dashboard-title">Dashboard</h2>

        <div className="dashboard-stats">
            <div className="dashboard-card">
            <p className="stat-title">Teachers</p>
            <h3>{stats.total_teachers}</h3>
        </div>
        <div className="dashboard-card">
          <p className="stat-title">Students</p>
          <h3>{stats.total_students}</h3>
        </div>
        <div className="dashboard-card">
          <p className="stat-title">Class Groups</p>
          <h3>{stats.total_classes}</h3>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-box">
          <h4 className="chart-title">Students per Class</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.students_per_class}>
              <XAxis dataKey="class_name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="student_count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4 className="chart-title">Top Tagged Teachers</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.top_tagged_teachers}
                dataKey="total_tags"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {stats.top_tagged_teachers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
