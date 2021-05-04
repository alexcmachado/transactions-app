import React from "react";

export default function Filter({ filter, onType }) {
  const handleChange = (event) => {
    onType(event.currentTarget.value);
  };
  return (
    <div>
      <input value={filter} onChange={handleChange} type="text" />
    </div>
  );
}
