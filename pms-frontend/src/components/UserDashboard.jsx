import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import RedBtn from './RedBtn';
import BookRoom from './BookRoom';
import BookedRooms from './BookedRooms';

const UserDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-zinc-800 overflow-y-scroll">
        <div className="p-6 text-2xl font-semibold text-center">
          User Dashboard
        </div>
        <nav className="mt-10">
          <ul>
            <li
              className={`p-4 cursor-pointer ${activeMenu === 'Book a Room' ? 'bg-zinc-900' : ''}`}
              onClick={() => setActiveMenu('Book a Room')}
            >
              Book a Room
            </li>
            <li
              className={`p-4 cursor-pointer ${activeMenu === 'Booked Rooms' ? 'bg-zinc-900' : ''}`}
              onClick={() => setActiveMenu('Booked Rooms')}
            >
              Booked Rooms
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-scroll">
        <div className='flex justify-between'>
            <h1 className="text-4xl font-semibold mb-8">{activeMenu}</h1>
            <RedBtn btnText={"Logout"} onClick={handleLogout} />
        </div>

        {/* Conditional Content Based on Active Menu */}
        {activeMenu === 'Book a Room' && (
          <div>
            <BookRoom />
          </div>
        )}
        {activeMenu === 'Booked Rooms' && (
          <div>
            <BookedRooms />
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
