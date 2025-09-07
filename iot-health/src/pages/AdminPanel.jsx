import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AnimatedPageWrapper from '../components/AnimatedPageWrapper';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const [allData, setAllData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/data`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllData(data);
      } catch (error) {
        console.error('Error fetching all data', error);
      }
    };
    fetchAllData();
  }, [token]);

  return (
    <AnimatedPageWrapper>
      <Navbar />
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th>User</th>
                <th>Heart Rate</th>
                <th>Temperature</th>
                <th>SpO2</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((d, index) => (
                <motion.tr
                  key={d._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td>{d.userId?.name || 'N/A'}</td>
                  <td>{d.heartrate}</td>
                  <td>{d.temperature}</td>
                  <td>{d.spo2}</td>
                  <td>{new Date(d.timestamp).toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AnimatedPageWrapper>
  );
};

export default AdminPanel;
