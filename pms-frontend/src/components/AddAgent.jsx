import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './formInput';
import ErrorMsg from './ErrorMsg';
import BlueBtn from './InputBlueBtn';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddTravelAgent = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/agents/add`, data);

      // Show success toast on successful response
      toast.success(res.data.message);
      // Clear form fields after successful submission
      reset();
    } catch (error) {
      // Show error toast if something goes wrong
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Travel Agent's Personal Name */}
          <div className="mb-4">
            <FormInput
              placeholder="Personal Name"
              type="text"
              register={register("personalName", { required: "Personal name is required" })}
              id="personalName"
            />
            <ErrorMsg
              error={errors.personalName}
              msg={errors.personalName?.message}
            />
          </div>

          {/* Travel Agency Name */}
          <div className="mb-4">
            <FormInput
              placeholder="Agency Name"
              type="text"
              register={register("agencyName", { required: "Agency name is required" })}
              id="agencyName"
            />
            <ErrorMsg
              error={errors.agencyName}
              msg={errors.agencyName?.message}
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <FormInput
              placeholder="Phone Number"
              type="text"
              register={register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number"
                }
              })}
              id="phoneNumber"
            />
            <ErrorMsg
              error={errors.phoneNumber}
              msg={errors.phoneNumber?.message}
            />
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <FormInput
              placeholder="Email Address"
              type="email"
              register={register("emailAddress", {
                required: "Email address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email address"
                }
              })}
              id="emailAddress"
            />
            <ErrorMsg
              error={errors.emailAddress}
              msg={errors.emailAddress?.message}
            />
          </div>

          {/* Physical Address */}
          <div className="mb-4">
            <FormInput
              placeholder="Physical Address"
              type="text"
              register={register("physicalAddress", { required: "Physical address is required" })}
              id="physicalAddress"
            />
            <ErrorMsg
              error={errors.physicalAddress}
              msg={errors.physicalAddress?.message}
            />
          </div>

          {/* Submit Button */}
          <BlueBtn btnText={"Add Travel Agent"} />
        </form>
      </div>
    </div>
  );
};

export default AddTravelAgent;