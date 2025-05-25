// AdminDashboard.jsx
import React, { useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import axios from 'axios';
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
          <h3 className="stat-value">{stats.total_teachers}</h3>
        </div>
        <div className="dashboard-card">
          <p className="stat-title">Students</p>
          <h3 className="stat-value">{stats.total_students}</h3>
        </div>
        <div className="dashboard-card">
          <p className="stat-title">Classes</p>
          <h3 className="stat-value">{stats.total_classes}</h3>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="chart-box full-width">
          <h4 className="chart-title">Active Accounts (Day / Week / Month)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { period: 'Daily', count: stats.active_accounts_daily },
                { period: 'Weekly', count: stats.active_accounts_weekly },
                { period: 'Monthly', count: stats.active_accounts_monthly },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="period" tick={{ fill: '#6c757d' }} />
              <YAxis allowDecimals={false} tick={{ fill: '#6c757d' }} />
              <Tooltip formatter={(value) => [value, 'Active Accounts']} />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} dot={{ r: 5, fill: '#6366f1' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box full-width">
          <h4 className="chart-title">Teacher Response Frequency (Daily)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart 
              data={stats.daily_teacher_replies}
              margin={{ top: 20, right: 30, left: 20, bottom: 44 }}
            >
              <XAxis
                dataKey="reply_date"
                label={{ value: 'Date', position: 'insideBottomRight', offset: -5, fill: '#6c757d' }}
                tick={{ fill: '#6c757d' }}
                angle={-45}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                label={{ value: 'Replies', angle: -90, position: 'insideLeft', fill: '#6c757d' }}
                allowDecimals={false}
                tick={{ fill: '#6c757d' }}
              />
              <Tooltip formatter={(value) => [value, 'Replies']} />
              <Line
                type="monotone"
                dataKey="reply_count"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, fill: '#3b82f6' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-charts">
          <div className="chart-box">
            <h4 className="chart-title">Students per Class</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.students_per_class}>
                <XAxis dataKey="class_name" tick={{ fill: '#6c757d' }} />
                <YAxis tick={{ fill: '#6c757d' }} />
                <Tooltip />
                <Bar dataKey="student_count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h4 className="chart-title">Subject Activity</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.active_subjects}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  label
                >
                  {stats.active_subjects.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: '14px', color: '#6c757d' }} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
  }

  export default DashboardAdmin;
