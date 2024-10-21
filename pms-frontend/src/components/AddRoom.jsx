import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './formInput';
import ErrorMsg from './ErrorMsg';
import BlueBtn from './InputBlueBtn';
import axios from 'axios';
import { toast } from'react-toastify';

const AddRoom = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/rooms/add`, data);

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
          {/* Room Name */}
          <div className="mb-4">
          <FormInput
                placeholder="Room Name"
                type="text"
                register={register("roomName", { required: "Room name is required" })}
                id="roomName"
            />
            <ErrorMsg
                error={errors.roomName}
                msg={errors.roomName?.message}
            />
          </div>

          {/* Room Rate */}
          <div className="mb-4">
          <FormInput
                placeholder="Room Rate"
                type="number"
                register={register("roomRate", { required: "Room rate is required" })}
                id="roomRate"
            />
            <ErrorMsg
                error={errors.roomRate}
                msg={errors.roomRate?.message}
            />
          </div>

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

          {/* Submit Button */}
          <BlueBtn btnText={"Add room"} />
        </form>
      </div>
    </div>
  );
};

export default AddRoom;