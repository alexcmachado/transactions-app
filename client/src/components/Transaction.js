import React from "react";
import css from "./transaction.module.css";

export default function Transaction({ data }) {
  const { description, value, day, category, type } = data;
  return (
    <div className={type === "+" ? css.income : css.expense}>
      <div>
        <span>
          <strong>{day}</strong>
        </span>
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
