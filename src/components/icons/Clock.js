import * as React from "react";

function SvgClock(props) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 0C4.923 0 0 4.923 0 11s4.923 11 11 11 11-4.923 11-11S17.077 0 11 0zm4.102 13.883l-.887 1.109a.71.71 0 01-.997.11l-2.972-2.204a1.774 1.774 0 01-.665-1.386v-6.9a.71.71 0 01.71-.709h1.419a.71.71 0 01.71.71V11l2.572 1.885a.708.708 0 01.11.998z"
        fill="#FF9A00"
      />
    </svg>
  );
}

export default SvgClock;
