import React from "react";
import { formatMoney } from "../helpers/formatHelpers";

const INCOME_COLOR = "#A1F0DC";
const EXPENSE_COLOR = "#F0A1A8";

export default function Transaction({ transaction, differentDay }) {
  const { id, description, day, value, category } = transaction;
  const {
    containerStyle,
    transactionStyle,
    expenseStyle,
    incomeStyle,
    dateStyle,
    descriptionValueStyle,
    dataStyle,
    categoryStyle,
    descriptionStyle,
    valueStyle,
    actionsStyle,
  } = styles;

  const typeStyle = transaction.type === "+" ? incomeStyle : expenseStyle;
  const date = `${day.toString().padStart(2, "0")}`;
  const extraTransactionStyle = differentDay ? { marginTop: "20px" } : {};

  return (
    <div
      style={{
        ...containerStyle,
        ...transactionStyle,
        ...extraTransactionStyle,
        ...typeStyle,
      }}
      // className={transaction.type === "+" ? css.income : css.expense}
    >
      <span style={dateStyle}>{date}</span>

      <div style={dataStyle}>
        <div style={descriptionValueStyle}>
          <span style={categoryStyle}>{category}</span>
          <span style={descriptionStyle}>{description}</span>
        </div>
        <span style={valueStyle}>{formatMoney(value)}</span>
      </div>

      <div style={actionsStyle}>
        <button className="btn">Edit</button>
        <button className="btn">Delete</button>
      </div>
    </div>
  );
}

const styles = {
  containerStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },

  transactionStyle: {
    border: "1px solid transparent",
    borderRadius: "4px",
    padding: "5px",
    margin: "5px",
  },

  expenseStyle: {
    backgroundColor: EXPENSE_COLOR,
  },

  incomeStyle: {
    backgroundColor: INCOME_COLOR,
  },

  dateStyle: {
    marginRight: "20px",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },

  descriptionValueStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  dataStyle: {
    display: "flex",
    flex: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryStyle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },

  descriptionStyle: {
    fontSize: "1.1rem",
  },

  valueStyle: {
    textAlign: "right",
    fontSize: "1.8rem",
  },

  actionsStyle: {
    marginLeft: "10px",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
};
