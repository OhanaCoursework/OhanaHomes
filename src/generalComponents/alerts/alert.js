import React from "react";
/* Importing necessary files and images */
import "./alert.css";

const Alert = () => {
  return (
    <div className="alert alertDiv">
      <div className="alert-content">
        <p className="alertMessage"></p>
        <span
          className="alert-close-button"
          onClick={closeAlert}
        >
          &times;
        </span>
      </div>
    </div>
  );
};

let alertRemovalTimeout;

export function showAlert(alert, alertType, timeout) {
  closeExistingAlert();
  setTimeout(() => {
    document.querySelector("alertMessage").innerText = alert;
    document.querySelector("alertDiv").className =
      "alert " + "show-alert " + alertType;
    if (timeout) {
      alertRemovalTimeout = setTimeout(() => {
        closeAlert();
      }, 5000);
    }
  }, 1);
}

export function closeAlert() {
  document.getElementById("alertMessage").innerText = "";
  document.getElementById("alertDiv").className = "alert";
  if (alertRemovalTimeout) {
    console.log("close clear timeout");
    clearTimeout(alertRemovalTimeout);
  }
}

export function closeExistingAlert() {
  clearTimeout(alertRemovalTimeout);
  const alertDiv = document.getElementById("alertDiv");
  if (alertDiv) {
    alertDiv.className = "alert " + "close-instantly";
    setTimeout(() => {
      alertDiv.classList.remove("close-instantly");
    }, 1);
  }
}

export default Alert;
