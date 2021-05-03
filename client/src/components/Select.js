import React from "react";

export default function Select({ selection }) {
  return (
    <div>
      <select value={selection} className="browser-default">
        <option value="2021-05">2021-05</option>
      </select>
    </div>
  );
}
