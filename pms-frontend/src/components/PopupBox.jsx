// PopupBox.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

const PopupBox = ({ bookingId, onCancelBooking, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    onCancelBooking(bookingId, data.cancellationReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-white">Cancel Booking</h2>
        
        {/* Form for cancellation reason */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Message Box */}
          <textarea
            {...register('cancellationReason', { required: 'Cancellation reason is required.' })}
            placeholder="Please provide a reason for cancellation"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-zinc-700 resize-none"
            rows="4"
          />
          {errors.cancellationReason && <p className="text-red-500 mb-2">{errors.cancellationReason.message}</p>}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-zinc-500 text-white px-4 py-2 rounded-md hover:bg-zinc-600"
              onClick={onClose}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Cancel Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupBox;