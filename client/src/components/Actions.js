import React from "react";

export default function Actions({ onClick, filter, onType }) {
  const handleClick = () => {
    onClick();
  };

  const handleChange = (event) => {
    onType(event.currentTarget.value);
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Add transaction</button>
      </div>
      <div>
        <input value={filter} onChange={handleChange} type="text" />
      </div>
    </div>
  );
}
