import React from "react";
import Transaction from "./Transaction";

export default function Transactions({ transactions }) {
  return (
    <div>
      {transactions.map((transaction) => {
        return <Transaction key={transaction._id} data={transaction} />;
      })}
    </div>
  );
}
