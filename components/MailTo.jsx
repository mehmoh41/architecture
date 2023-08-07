import Link from "next/link";
import React from "react";

const ButtonMailto = ({ mailto, label }) => {
  return (
    <Link
      href=""
      onClick={(e) => {
        window.location.href = mailto;
        e.preventDefault();
      }}
    >
      {label}
    </Link>
  );
};

export default ButtonMailto;
