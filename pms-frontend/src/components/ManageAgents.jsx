import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAgents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:3000/agents');
      setAgents(res.data);
    })();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      {agents.length === 0 && <div className="text-zinc-500">No agents available</div>}
      {agents.length > 0 && (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-zinc-900 border border-zinc-800 shadow-lg rounded-lg">
                <thead>
                <tr className="bg-zinc-800 text-white">
                    <th className="py-3 px-6 text-left border-b border-zinc-700">Personal Name</th>
                    <th className="py-3 px-6 text-left border-b border-zinc-700">Agency Name</th>
                    <th className="py-3 px-6 text-left border-b border-zinc-700">Phone Number</th>
                    <th className="py-3 px-6 text-left border-b border-zinc-700">Email Address</th>
                    <th className="py-3 px-6 text-left border-b border-zinc-700">Physical Address</th>
                </tr>
                </thead>
                <tbody>
                {agents.map((agent, index) => (
                    <tr
                    key={index}
                    className="hover:bg-zinc-800 transition-colors duration-200 text-gray-300"
                    >
                    <td className="py-3 px-6 border-b border-zinc-800">{agent.personalName}</td>
                    <td className="py-3 px-6 border-b border-zinc-800">{agent.agencyName}</td>
                    <td className="py-3 px-6 border-b border-zinc-800">{agent.phoneNumber}</td>
                    <td className="py-3 px-6 border-b border-zinc-800">{agent.emailAddress}</td>
                    <td className="py-3 px-6 border-b border-zinc-800">{agent.physicalAddress}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default ManageAgents;