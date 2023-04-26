import React from "react";
/* Importing necessary files and images */
import "./alert.css";

const Alert = () => {
  return (
    <div id="alertDiv" className="alert">
      <div className="alert-content">
        <p id="alertMessage"></p>
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

let alertRemovalTimeout;

export function showAlert(alert, alertType, timeout) {
  closeExistingAlert();
  setTimeout(() => {
    document.getElementById("alertMessage").innerText = alert;
    document.getElementById("alertDiv").className =
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
