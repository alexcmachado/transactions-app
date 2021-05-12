import React from "react";
import { formatMoney } from "../helpers/formatHelpers";

const INCOME_COLOR = "#16a085";
const EXPENSE_COLOR = "#c0392b";

export default function Summary({ summary }) {
  if (!summary) {
    return null;
  }

  const { totalEntries, totalIncome, totalExpense, balance } = summary;

  const { containerStyle, incomeStyle, expenseStyle } = styles;
  const balanceStyle = balance >= 0 ? incomeStyle : expenseStyle;

  return (
    <div style={containerStyle}>
      <span>
        <strong>Transactions: </strong>
        {totalEntries}
      </span>

      <span>
        <strong>
          Total income:{" "}
          <span style={incomeStyle}>{formatMoney(totalIncome)}</span>
        </strong>
      </span>

      <span>
        <strong>
          Total expense:{" "}
          <span style={expenseStyle}>{formatMoney(totalExpense)}</span>
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
