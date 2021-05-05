import React from "react";

export default function AddButton({ onClick }) {
  const handleClick = () => {
    onClick();
  };
  return (
    <div>
      <button onClick={handleClick}>Add transaction</button>
    </div>
  );
}
