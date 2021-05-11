import React from "react";
import { formatMoney } from "../helpers/formatHelpers";

const INCOME_COLOR = "#16a085";
const EXPENSE_COLOR = "#c0392b";

export default function Summary({ transactions }) {
  const entries = transactions.length;
  const income = transactions
    .filter(({ type }) => {
      return type === "+";
    })
    .reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
  const expense = transactions
    .filter(({ type }) => {
      return type === "-";
    })
    .reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
  const balance = income - expense;

  const { containerStyle, incomeStyle, expenseStyle } = styles;
  const balanceStyle = balance >= 0 ? incomeStyle : expenseStyle;

  return (
    <div style={containerStyle}>
      <span>
        <strong>Transactions: </strong>
        {entries}
      </span>

      <span>
        <strong>
          Total income: <span style={incomeStyle}>{formatMoney(income)}</span>
        </strong>
      </span>

      <span>
        <strong>
          Total expense:{" "}
          <span style={expenseStyle}>{formatMoney(expense)}</span>
        </strong>
      </span>

      <span>
        <strong>
          Balance: <span style={balanceStyle}>{formatMoney(balance)}</span>
        </strong>
      </span>
    </div>
  );
}

const styles = {
  containerStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "5px",
    border: "1px solid lightgrey",
    borderRadius: "4px",
  },

  incomeStyle: {
    color: INCOME_COLOR,
  },

  expenseStyle: {
    color: EXPENSE_COLOR,
  },
};
