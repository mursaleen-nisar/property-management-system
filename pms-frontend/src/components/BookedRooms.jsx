import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import RedBtn from './RedBtn';
import PopupBox from './PopupBox';

const BookedRooms = () => {
  const [bookings, setBookings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch the user's bookings
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:3000/rooms/bookedrooms', { withCredentials: true });
        setBookings(res.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }) ();
  }, []);

  // Show the popup when "Cancel Booking" is clicked
  const handleCancelClick = (bookingId) => {
    setSelectedBooking(bookingId);
    setShowPopup(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedBooking(null);
  };

  // Cancel Booking handler
  const handleCancelBooking = async (bookingId, cancellationReason) => {
    try {
      let res = await axios.put(`http://localhost:3000/rooms/bookedrooms/${bookingId}/cancel`, { cancellationReason, status: 'cancelled' });
      toast.success(res.data.message);

      // Update the status in the local state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      );
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel the booking.');
    }
  };

  // Render the list of booked rooms
  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const checkinDate = new Date(booking.checkinDate);
            const checkoutDate = new Date(booking.checkoutDate);
            const currentDate = new Date();
            const isPastReleaseDate = currentDate > checkoutDate;
            const isCancelled = booking.status === 'cancelled';

            return (
              <div
                key={booking._id}
                className="bg-zinc-950 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 p-4"
              >
                <h3 className="text-xl font-semibold mb-2">{booking.roomName} Room</h3>
                <p className="text-gray-500 mb-1">
                  <strong>Room Category:</strong> {booking.roomCategory}
                </p>
                <p className="text-gray-500 mb-1">
                  <strong>Guest Name:</strong> {booking.guestName}
                </p>
                <p className="text-gray-500 mb-1">
                  <strong>Check-in Date:</strong> {format(checkinDate, 'dd-MM-yyyy')}
                </p>
                <p className="text-gray-500 mb-1">
                  <strong>Check-out Date:</strong> {format(checkoutDate, 'dd-MM-yyyy')}
                </p>
                <p className="text-gray-500 mb-1">
                  <strong>Assigned Agent:</strong> {booking.travelAgent}
                </p>
                <p className="text-gray-500 mb-4">
                  <strong>Status:</strong> {booking.status}
                </p>

                {/* Conditional Rendering for Cancel/Completed */}
                {isCancelled ? (
                  <p className="text-red-500">Cancelled</p>
                ) : isPastReleaseDate ? (
                  <p className="text-green-500">Completed</p>
                ) : (
                  <RedBtn btnText={"Cancel booking"} onClick={() => handleCancelClick(booking._id)} />
                )}
              </div>
            );
          })}
        </div>
      )}

    {/* Show the PopupBox when needed */}
    {showPopup && (
        <PopupBox
          bookingId={selectedBooking}
          onCancelBooking={handleCancelBooking}
          onClose={handleClosePopup}
        />
    )}

    </div>
  );
};

export default BookedRooms;