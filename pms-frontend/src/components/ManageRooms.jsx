import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ManageRooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      (async () => {
        const res = await axios.get('http://localhost:3000/rooms');
        setRooms(res.data);
      }) ();
    }, [])
    

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.length === 0 && <div className='text-zinc-500'>No rooms availabe</div>}
        {rooms.map((room, index) => (
          <div key={index} className="bg-zinc-950 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{room.roomName}</h3>
              <p className="text-gray-500">Rate: ₹{room.roomRate}</p>
              <p className="text-gray-500">Category: {room.roomCategory}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageRooms
