import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReportsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [agents, setAgents] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [roomCategory, setRoomCategory] = useState('');

  // Fetch bookings and travel agents
  useEffect(() => {
    (async () => {
      try {
        const bookingsRes = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/rooms/all-booked-rooms`);
        const agentsRes = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/agents`);
        setBookings(bookingsRes.data);
        setAgents(agentsRes.data);
        setFilteredBookings(bookingsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }) ();
  }, []);

  // Handle filter change
  const handleFilterChange = () => {
    let filtered = bookings;

    if (fromDate) {
      filtered = filtered.filter(booking => new Date(booking.checkinDate) >= fromDate);
    }

    if (toDate) {
      filtered = filtered.filter(booking => new Date(booking.checkoutDate) <= toDate);
    }
    if (selectedAgent) {
      filtered = filtered.filter(booking => booking.travelAgent._id === selectedAgent);
    }

    if (roomCategory) {
      filtered = filtered.filter(booking => booking.roomCategory === roomCategory);
    }

    setFilteredBookings(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [fromDate, toDate, selectedAgent, roomCategory]);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-6">Filter</h2>

      {/* Filters */}
      <div className="mb-8 p-4 bg-zinc-900 text-white rounded-lg flex flex-wrap gap-4">
        {/* From Date */}
        <div>
          <label className="block mb-2">From Date</label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            className="p-2 border rounded bg-gray-100 text-black"
            dateFormat="dd-MM-yyyy"
            placeholderText="From Date"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block mb-2">To Date</label>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            className="p-2 border rounded bg-gray-100 text-black"
            dateFormat="dd-MM-yyyy"
            placeholderText="To Date"
          />
        </div>

        {/* Agent Filter */}
        <div>
          <label className="block mb-2">Travel Agent</label>
          <select
            className="p-2 border rounded bg-gray-100 text-black"
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
          >
            <option value="">All Agents</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>{agent.personalName}</option>
            ))}
          </select>
        </div>

        {/* Room Category Filter */}
        <div>
          <label className="block mb-2">Room Category</label>
          <select
            className="p-2 border rounded bg-gray-100 text-black"
            value={roomCategory}
            onChange={(e) => setRoomCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Luxury">Luxury</option>
            <option value="Standard">Standard</option>
            <option value="Economy">Economy</option>
          </select>
        </div>
      </div>

      {/* Filtered Bookings (Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredBookings.length === 0 ? (
          <p className="text-gray-400">No bookings found for the selected filters.</p>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-zinc-800 text-white p-4 rounded-lg shadow-lg border border-zinc-700">
              <h3 className="text-xl font-semibold mb-2">{booking.roomName.roomName}</h3>
              <p><strong>Room Category:</strong> {booking.roomCategory}</p>
              <p><strong>Guest Name:</strong> {booking.guestName}</p>
              <p><strong>Check-in Date:</strong> {new Date(booking.checkinDate).toLocaleDateString()}</p>
              <p><strong>Check-out Date:</strong> {new Date(booking.checkoutDate).toLocaleDateString()}</p>
              <p><strong>Travel Agent:</strong> {booking.travelAgent.personalName}</p>
              {/* <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p> */}
            </div>
          ))
        )}
      </div>

        {/* Business Generated by Agents Heading */}
        <h2 className="text-2xl font-semibold mb-6 text-white">Business Generated by Agents</h2>

        {/* Travel Agents Summary Table */}
        <div className="overflow-x-auto">
        <table className="min-w-full bg-zinc-900 border border-zinc-700 shadow-lg rounded-lg">
            <thead>
            <tr className="bg-zinc-800 text-white">
                <th className="py-3 px-6 text-left">Travel Agent</th>
                <th className="py-3 px-6 text-left">Total Bookings</th>
                <th className="py-3 px-6 text-left">Total Business (₹)</th>
            </tr>
            </thead>
            <tbody>
            {agents.map((agent) => {
                const agentBookings = bookings.filter(
                (booking) => booking.travelAgent.personalName === agent.personalName
                );
                
                const totalBusiness = agentBookings.reduce(
                (sum, booking) => sum + booking.roomName.roomRate, 0
                );
                return (
                <tr key={agent._id} className="hover:bg-zinc-700 transition-colors">
                    <td className="py-3 px-6 border-b border-zinc-700 text-white">{agent.personalName}</td>
                    <td className="py-3 px-6 border-b border-zinc-700 text-white">{agentBookings.length}</td>
                    <td className="py-3 px-6 border-b border-zinc-700 text-white">₹{totalBusiness}</td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default ReportsPage;