import React from "react";
import clsx from "clsx";

import PropTypes from "prop-types";

export const Label = ({ children, light = true, isRequired = false, showValue = false, className = "", ...props }) => {
  return (
    <label
      {...props}
      className={clsx(
        "text-black-900 text-sm flex py-0.5",
        {
          "text-gray-500 font-normal": light,
        },
        className
      )}
    >
      {children}
      {isRequired && !showValue ? <span className="text-blue px-1">*</span> : null}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  light: PropTypes.bool,
  isRequired: PropTypes.bool,
  showValue: PropTypes.bool,
  className: PropTypes.string,
};

export const AuthInput = ({ label, error, errorMessage, ...props }) => {
  return (
    <div className="relative w-full">
      {label ? <Label light>{label}</Label> : null}
      <input
        {...props}
        className={clsx(
          "shadow-xl rounded-md focus:ring-0 text-sm text-black font-bold px-4 py-4 w-full",
          { "pl-16": props.icon },
          { "border-[#dc2626]": error, "border-none": !error }
        )}
      />
      {props.icon ? <span className="absolute left-6 top-3.5 bottom-0">{props.icon}</span> : null}
      {error && errorMessage ? <span className="text-sm tracking-tight px-1 text-red-600">{errorMessage}</span> : null}
    </div>
  );
};

AuthInput.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  icon: PropTypes.node,
  error: PropTypes.any,
  errorMessage: PropTypes.string,
  label: PropTypes.node,
};
