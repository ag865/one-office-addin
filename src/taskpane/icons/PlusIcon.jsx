import * as React from "react";

const PlusIcon = (props) => {
  return (
    <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.1309 8.87679H19.2023C20.1332 8.87679 20.888 9.63157 20.888 10.5625C20.888 11.4934 20.1332 12.2482 19.2023 12.2482H13.1309C12.8784 12.2482 12.6738 12.4529 12.6738 12.7054V18.7768C12.6738 19.7077 11.919 20.4625 10.988 20.4625C10.0571 20.4625 9.30232 19.7077 9.30232 18.7768V12.7054C9.30232 12.4529 9.09764 12.2482 8.84518 12.2482H2.77375C1.84283 12.2482 1.08804 11.4934 1.08804 10.5625C1.08804 9.63157 1.84283 8.87679 2.77375 8.87679H8.84518C9.09764 8.87679 9.30232 8.6721 9.30232 8.41964V2.34821C9.30232 1.41729 10.0571 0.6625 10.988 0.6625C11.919 0.6625 12.6738 1.41729 12.6738 2.34821V8.41964C12.6738 8.6721 12.8784 8.87679 13.1309 8.87679Z"
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="0.1"
      />
    </svg>
  );
};

export { PlusIcon };