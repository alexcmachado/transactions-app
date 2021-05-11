import React from "react";

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

  return (
    <div>
      <span>
        <strong>Transactions:</strong> {entries}
      </span>
      <span>
        <strong>Total income:</strong> {income}
      </span>
      <span>
        <strong>Total expense:</strong> {expense}
      </span>
      <span>
        <strong>Balance:</strong> {balance}
      </span>
    </div>
  );
}
