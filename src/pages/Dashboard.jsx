import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

import { FaComments } from "react-icons/fa";
function Dashboard() {
    const [dashboardData, setDashboardData] = useState({});
    const [chartData, setChartData] = useState([]);

    const handleClick = () => {
        window.open('https://gsm-mart-chat-app-client.vercel.app/', '_blank');
      };

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/dashboard')
            .then(response => response.json())
            .then(data => setDashboardData(data));

            fetch('http://localhost:8080/api/v1/sales/chartData')
            .then(response => response.json())
            .then(data => setChartData(data));
    }, []);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>ITEMS</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{dashboardData.itemsCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CATEGORIES</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>{dashboardData.categoriesCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CUSTOMERS</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>{dashboardData.customersCount}</h1>
                </div>
               
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="givenPrice" fill="#8884d8" />
                        <Bar dataKey="profit" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="givenPrice" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            <div className="fixed bottom-4 right-4">
            <button
          className="p-3 bg-green-500 rounded-full text-white shadow-lg hover:bg-green-800 focus:outline-none"
          onClick={handleClick}
        >
          <FaComments size={40} />
           </button>
            </div>
        </main>
    );
}

export default Dashboard;
