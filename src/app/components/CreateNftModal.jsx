import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { addplayer } from '../api/player';

const CreateNftModal = ({ open, setOpen }) => {
  const [assetData, setAssetData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    region: ""
  });

  const addParticipant = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await addplayer({ ...assetData }); // Call the correct function
      console.log("Participant added successfully", response.data);
      handleClose();
    } catch (error) {
      console.error("Error adding participant:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setAssetData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="relative w-full max-w-xl h-[50vh] rounded-lg ">
        <div className="relative bg-white shadow px-6 p-4">
          <div className="flex items-center justify-between p-4 md:p-4">
            <h3 className="text-3xl font-bold text-gray-900 ">
              Add new participant
            </h3>
            <button
              onClick={handleClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="select-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form
            onSubmit={addParticipant}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div className="w-full flex flex-col items-start p-2 gap-4">
              <span className="text-[20px] leading-[30px] text-black">
                Participant Full Name
              </span>
              <div className="w-full flex justify-normal gap-6">
                <input
                  onChange={(e) => handleInputChange(e, "firstName")}
                  value={assetData.firstName}
                  className="border border-[#2E75B5] rounded-3xl p-2 w-2/3"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  onChange={(e) => handleInputChange(e, "lastName")}
                  value={assetData.lastName}
                  className="border border-[#2E75B5] rounded-3xl p-2 w-2/3"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-start p-2 gap-4">
              <span className="text-[20px] leading-[30px] text-black">
                Participant Email
              </span>
              <div className="w-full flex justify-normal gap-6">
                <input
                  value={assetData.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  className="w-full border border-[#2E75B5] rounded-3xl p-2"
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-start p-2 gap-4">
              <span className="text-[20px] leading-[30px] text-black">
                Participant Number:
              </span>
              <div className="w-full flex justify-normal gap-6">
                <input
                  value={assetData.phoneNumber}
                  onChange={(e) => handleInputChange(e, "phoneNumber")}
                  className="w-full border border-[#2E75B5] rounded-3xl p-2"
                  type="text"
                  placeholder="Number"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#2E75B5] text-white hover:text-[#2E75B5] hover:bg-white rounded-[25px] text-[20px] font-medium py-3 px-4 mt-4"
            >
              Add participant
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNftModal;
