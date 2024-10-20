import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './formInput';
import ErrorMsg from './ErrorMsg';
import BlueBtn from './InputBlueBtn';
import axios from 'axios';
import { toast } from'react-toastify';

const BookRoom = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [rooms, setRooms] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    (async () => {
        const res = await axios.get('http://localhost:3000/rooms');
        const res2 = await axios.get('http://localhost:3000/agents');
        setRooms(res.data);
        setAgents(res2.data);
    }) ();
  }, []);

  const roomType = watch('roomCategory');
  const checkInDate = watch('checkinDate');
  const today = new Date().toISOString().split('T')[0];


  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/rooms/booking', data, { withCredentials: true });

      // Show success toast on successful response
      toast.success(response.data.message);
      // Clear form fields after successful submission
      reset();
    } catch (error) {
      // Show error toast if something goes wrong
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="w-full max-w-md p-8">
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Room Category */}
          <div className="mb-4">
          <select
                id="roomCategory"
                className={`block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border border-zinc-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.roomCategory ? 'border-red-500' : ''}`}
                {...register('roomCategory', { required: 'Room category is required' })}
            >
                <option value="">Select Category</option>
                <option value="Economy">Economy</option>
                <option value="Standard">Standard</option>
                <option value="Luxury">Luxury</option>
            </select>

            <ErrorMsg
                error={errors.roomCategory}
                msg={errors.roomCategory?.message}
            />
          </div>
          
          {/* Select Room */}
          <div className="mb-4">
          <select
                id="roomName"
                className={`block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border border-zinc-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.roomName ? 'border-red-500' : ''}`}
                {...register('roomName', { required: 'Room name is required' })}
            >
                <option value="">Select Room</option>
                {roomType === 'Economy' && rooms
                    .filter(room => room.roomCategory === 'Economy')
                    .map((room, idx) => {
                    return (
                        <option key={idx} value={room.roomName}>{room.roomName} (₹{room.roomRate} / Night)</option>
                    );
                })}
                {roomType === 'Standard' && rooms
                    .filter(room => room.roomCategory === 'Standard')
                    .map((room, idx) => {
                    return (
                        <option key={idx} value={room.roomName}>{room.roomName} (₹{room.roomRate} / Night)</option>
                    );
                })}
                {roomType === 'Luxury' && rooms
                    .filter(room => room.roomCategory === 'Luxury')
                    .map((room, idx) => {
                    return (
                        <option key={idx} value={room.roomName}>{room.roomName} (₹{room.roomRate} / Night)</option>
                    );
                })}
            </select>

            <ErrorMsg
                error={errors.roomName}
                msg={errors.roomName?.message}
            />
          </div>

          {/* Guest Name */}
          <div className="mb-4">
          <FormInput
                placeholder="Guest Name"
                type="text"
                register={register("guestName", { required: "Guest Name is required" })}
                id="guestName"
            />

            <ErrorMsg
                error={errors.guestName}
                msg={errors.guestName?.message}
            />
          </div>

          <div className='flex gap-3'>
            {/* Check-in Date */}
            <div className="mb-4 w-full">
            <FormInput
                placeholder="Check-in Date"
                type="date"
                register={register("checkinDate", { required: "Check-in date is required" })}
                id="checkinDate"
                min={today}
            />

            <ErrorMsg
                error={errors.checkinDate}
                msg={errors.checkinDate?.message}
            />
            </div>
            {/* Check-out Date */}
            <div className="mb-4 w-full">
            <FormInput
                placeholder="Check-out Date"
                type="date"
                register={register("checkoutDate", { required: "Check-out date is required" })}
                id="checkoutDate"
                min={checkInDate}
            />

            <ErrorMsg
                error={errors.checkoutDate}
                msg={errors.checkoutDate?.message}
            />
            </div>
          </div>
  
          {/* Select Agent */}
          <div className="mb-4">
          <select
                id="travelAgentName"
                className={`block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border border-zinc-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.travelAgentName ? 'border-red-500' : ''}`}
                {...register('travelAgentName', { required: 'Travel Agent is required' })}
            >
                <option value="">Select Agent</option>
                {agents.map((agent, idx) => {
                    return (
                        <option key={idx} value={agent.personalName}>{`${agent.personalName} (${agent.agencyName})`}</option>
                    );
                })}
            </select>

            <ErrorMsg
                error={errors.travelAgentName}
                msg={errors.travelAgentName?.message}
            />
          </div>

          {/* Submit Button */}
          <BlueBtn btnText={"Book room"} />
        </form>
      </div>
    </div>
  );
};

export default BookRoom;