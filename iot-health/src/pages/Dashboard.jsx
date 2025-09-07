import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import Navbar from '../components/Navbar';
import ChartCard from '../components/ChartCard';
import AnimatedPageWrapper from '../components/AnimatedPageWrapper';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // ** CRITICAL DEBUGGING LINE **
    // This will show us the exact user object the frontend is using for the API call.
    console.log("DEBUG: Frontend is using this user object:", user);

    const fetchData = async () => {
      if (!user || !user.id || !token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/${user.id}/data`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once on mount

  const latestData = data.length > 0 ? data[0] : {};
  const chartData = data.slice().reverse();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl text-gray-500">Loading Dashboard...</p>
        </div>
      </>
    );
  }

  return (
    <AnimatedPageWrapper>
      <Navbar />
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        
        {data.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700">No Sensor Data Found</h2>
            <p className="text-gray-500 mt-2">Please ensure your IoT device is sending data or check that data has been manually added to the database for this user.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-600">Heart Rate</h3>
                <p className="text-4xl font-bold text-blue-600">{latestData.heartrate} <span className="text-xl font-medium">bpm</span></p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-600">Temperature</h3>
                <p className="text-4xl font-bold text-green-600">{latestData.temperature} <span className="text-xl font-medium">°C</span></p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-600">SpO2</h3>
                <p className="text-4xl font-bold text-red-600">{latestData.spo2} <span className="text-xl font-medium">%</span></p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Heart Rate Trend">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={time => new Date(time).toLocaleTimeString()} />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="heartrate" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Temperature History">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={time => new Date(time).toLocaleTimeString()} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="temperature" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </>
        )}
      </div>
    </AnimatedPageWrapper>
  );
};

export default Dashboard;
