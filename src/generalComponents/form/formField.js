import React from "react";
/* Importing necessary files and images */
import "./formField.css";
import showIcon from "../../assets/images/icons/showIcon.svg";
import hideIcon from "../../assets/images/icons/hideIcon.svg";

const FormField = ({ name, id, label, type, validator }) => {
  let onInputTimeOut;

  function formFieldOnInput(event) {
    clearTimeout(onInputTimeOut);
    onInputTimeOut = setTimeout(() => {
      if (validator !== undefined) {
        validator(event);
      }
    }, 500);
  }

  function showPassword(event) {
    const password = document.getElementById("signUpPassword");
    if (password.getAttribute("type") === "password") {
      password.setAttribute("type", "text");
      event.target.src = hideIcon;
    } else {
      password.setAttribute("type", "password");
      event.target.src = showIcon;
    }
  }

  function formFieldOnClick(event) {
    if (event.target.classList.contains("modalInput")) {
      event.target.labels[0].classList.add("active");
    }
  }

  function formFieldOnLoseFocus(event) {
    if (!event.target.value) {
      event.target.labels[0].classList.remove("active");
    }
  }

  return (
    <div className="formField">
      <label
        className="modalInputLabel"
        htmlFor={id}
        onClick={formFieldOnClick}
        onBlur={formFieldOnLoseFocus}
      >
        <div className="modalInputLabelOuterDiv">
          <div className="modalInputDiv">
            <input
              className="modalInput"
              type={type}
              id={id}
              name={name}
              onChange={formFieldOnInput}
            />
            {type === "password" && (
              <img
                className="showHidePasswordIcon"
                src={showIcon}
                onClick={showPassword}
              />
            )}
          </div>
          <div className="modalInputLabelSpanDiv">
            <span className="labelSpan">{label}</span>
          </div>
        </div>
      </label>
      <div className="formErrorDiv">
        <span></span>
      </div>
    </div>
  );
};

export function resetFormFields(form) {
  if (!form || typeof form[Symbol.iterator] !== "function") {
    return;
  }

  for (const formElement of form) {
    if (formElement.tagName === "INPUT") {
      validateFormField(formElement);
      formElement.labels[0].classList.remove("active");
    }
  }
}

export function invalidateFormField(formInput, errors) {
  const formField = formInput.closest(".formField");
  formField.classList.add("fieldError");
  formField.querySelector(".formErrorDiv span").textContent = errors;
}

export function validateFormField(formInput) {
  const formField = formInput.closest(".formField");
  formField.classList.remove("fieldError");
  formField.querySelector(".formErrorDiv span").textContent = "";
}

export default FormField;
