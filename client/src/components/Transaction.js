import React from "react";
import css from "./transaction.module.css";

export default function Transaction({ data }) {
  const { description, value, day, category } = data;
  return (
    <div className={css.transaction}>
      <div>
        <span>{day}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{category}</span>
        <span>{description}</span>
      </div>
      <div>
        <span>{value}</span>
      </div>
    </div>
  );
}
