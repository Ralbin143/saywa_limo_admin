import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingForm from "../../Pages/Trips/BookingForm";
import { FaRegUserCircle, FaMobileAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

function TripContentComponent() {
  const { tabIndexState, tripData } = useSelector((state) => state?.trips);
  const { selectedCustomer } = useSelector((state) => state?.customer);

  return (
    <div>
      <div
        className="mt-3"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          borderRadius: "5px",
          padding: "10px",
          width: "100%",
        }}
      >
        <strong>
          <FaRegUserCircle /> {selectedCustomer?.fullName},
        </strong>
        <div>
          <FaMobileAlt /> {selectedCustomer?.contact_no},
        </div>
        <div>
          <MdAlternateEmail /> {selectedCustomer?.email}
        </div>
      </div>
      <div className="mt-4">
        <BookingForm />
      </div>
    </div>
  );
}

export default TripContentComponent;
