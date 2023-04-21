import React, { useEffect } from "react";
/* Importing necessary files and images */
import "./alert.css";

const Alert = ({ active, setActive, alert, alertType, timeout }) => {
  let alertRemovalTimeout;

  const closeAlert = () => {
    setActive(false);
    if (alertRemovalTimeout) {
      console.log("close clear timeout");
      clearTimeout(alertRemovalTimeout);
    }
  };

  useEffect(() => {
    if (active && timeout) {
      alertRemovalTimeout = setTimeout(() => {
        closeAlert();
      }, 5000);
    }

    return () => {
      if (alertRemovalTimeout) {
        clearTimeout(alertRemovalTimeout);
      }
    };
  });

  return (
    <div
      className={`${active ? "show-alert" : ""} ${
        alertType ? alertType : ""
      } alert`}
    >
      <div className="alert-content">
        <p>{alert}</p>
        <span
          id="alertCloseButton"
          className="alert-close-button"
          onClick={closeAlert}
        >
          &times;
        </span>
      </div>
    </div>
  );
};

export default Alert;
