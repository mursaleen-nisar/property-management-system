import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddRoom from './AddRoom';
import ManageRooms from './ManageRooms';
import AddAgent from './AddAgent';
import ManageAgents from './ManageAgents';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  

    // Redirect to login page if the user is not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/');
        }
    }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-zinc-800 overflow-y-scroll">
        <div className="p-6 text-2xl font-semibold text-center">
          Admin Dashboard
        </div>
        <nav className="mt-10">
          <ul>
            <li
              className={`p-4 cursor-pointer ${activeMenu === 'Add Room' ? 'bg-zinc-900' : ''}`}
              onClick={() => setActiveMenu('Add Room')}
            >
              Add Room
            </li>
            <li
              className={`p-4 cursor-pointer ${activeMenu === 'Manage Rooms' ? 'bg-zinc-900' : ''}`}
              onClick={() => setActiveMenu('Manage Rooms')}
            >
              Manage Rooms
            </li>
            <li
              className={`p-4 cursor-pointer ${activeMenu === 'Add Travel Agent' ? 'bg-zinc-900' : ''}`}
              onClick={() => setActiveMenu('Add Travel Agent')}
            >
              Add Travel Agent
            </li>
            <li
              className={`p-4 cursor-pointer ${activeMenu === 'Manage Travel Agents' ? 'bg-zinc-900' : ''}`}
              onClick={() => setActiveMenu('Manage Travel Agents')}
            >
              Manage Travel Agents
            </li>
            <li
              className={`p-4 cursor-pointer ${activeMenu === 'Booked Rooms' ? 'bg-zinc-900' : ''}`}
              onClick={() => setActiveMenu('Booked Rooms')}
            >
              Booked Rooms
            </li>
            <li
              className={`p-4 cursor-pointer ${activeMenu === 'Reports' ? 'bg-zinc-900' : ''}`}
              onClick={() => setActiveMenu('Reports')}
            >
              Reports
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-scroll">
        <h1 className="text-4xl font-semibold mb-8">{activeMenu}</h1>

        {/* Conditional Content Based on Active Menu */}
        {activeMenu === 'Add Room' && (
          <div>
            <AddRoom />
          </div>
        )}
        {activeMenu === 'Manage Rooms' && (
          <div>
            <ManageRooms />
          </div>
        )}
        {activeMenu === 'Add Travel Agent' && (
          <div>
            <AddAgent />
          </div>
        )}
        {activeMenu === 'Manage Travel Agents' && (
          <div>
            <ManageAgents />
          </div>
        )}
        {activeMenu === 'Booked Rooms' && (
          <div>
            <p className="text-lg">This is the Booked Rooms page.</p>
            {/* Booked rooms management content goes here */}
          </div>
        )}
        {activeMenu === 'Reports' && (
          <div>
            <p className="text-lg">This is the Reports page.</p>
            {/* Reports and stats go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;