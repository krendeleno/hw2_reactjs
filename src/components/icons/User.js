import * as React from "react";

function SvgUser(props) {
  return (
    <svg
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.125 7a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm2.45.875h-.457a4.765 4.765 0 01-3.986 0h-.457A3.676 3.676 0 000 11.55v1.137C0 13.412.588 14 1.313 14h9.624c.725 0 1.313-.588 1.313-1.313V11.55a3.676 3.676 0 00-3.675-3.675z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgUser;
