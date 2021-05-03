import React from "react";

export default function Transaction({ data }) {
  const { description, value } = data;
  return (
    <div>
      <span>
        {description}-{value}
      </span>
    </div>
  );
}
