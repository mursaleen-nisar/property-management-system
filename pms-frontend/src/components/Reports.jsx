import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
//   const [reports, setReports] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch reports from the server
//   const fetchReports = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:3000/api/reports', {
//         params: {
//           startDate: startDate ? startDate.toISOString() : undefined,
//           endDate: endDate ? endDate.toISOString() : undefined,
//         }
//       });
//       setReports(res.data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, [startDate, endDate]);

  return (
    <div>reports page</div>
    // <div className="max-w-7xl mx-auto mt-10 p-4">

    //   {/* Date Filters */}
    //   <div className="flex gap-4 mb-6">
    //     <div>
    //       <label className="block mb-2">Start Date</label>
    //       <DatePicker
    //         selected={startDate}
    //         onChange={(date) => setStartDate(date)}
    //         className="p-2 border rounded"
    //         dateFormat="yyyy-MM-dd"
    //       />
    //     </div>
    //     <div>
    //       <label className="block mb-2">End Date</label>
    //       <DatePicker
    //         selected={endDate}
    //         onChange={(date) => setEndDate(date)}
    //         className="p-2 border rounded"
    //         dateFormat="yyyy-MM-dd"
    //       />
    //     </div>
    //   </div>

    //   {/* Loading Spinner */}
    //   {loading && <p>Loading reports...</p>}

    //   {/* Reports Table */}
    //   {!loading && reports.length === 0 && <p>No reports available.</p>}
    //   {!loading && reports.length > 0 && (
    //     <div className="overflow-x-auto">
    //       <table className="min-w-full bg-white border border-zinc-200 shadow-lg rounded-lg">
    //         <thead>
    //           <tr className="bg-zinc-950 text-white">
    //             <th className="py-3 px-6 text-left">Travel Agent</th>
    //             <th className="py-3 px-6 text-left">Total Bookings</th>
    //             <th className="py-3 px-6 text-left">Total Business (₹)</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {reports.map((report) => (
    //             <tr key={report.travelAgentId} className="hover:bg-zinc-100 transition-colors">
    //               <td className="py-3 px-6 border-b border-zinc-200">{report.agentName}</td>
    //               <td className="py-3 px-6 border-b border-zinc-200">{report.totalBookings}</td>
    //               <td className="py-3 px-6 border-b border-zinc-200">{report.totalBusiness}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   )}
    // </div>
  );
};

export default Reports;