import React from "react";
import Transaction from "./Transaction";

export default function Transactions({ transactions }) {
  let currentDay = 1;

  return (
    <div className="center" style={styles.transactionsStyle}>
      {transactions.map((transaction) => {
        const { id, day } = transaction;

        let differentDay = false;

        if (day !== currentDay) {
          differentDay = true;
          currentDay = day;
        }

        return (
          <Transaction
            key={id}
            transaction={transaction}
            differentDay={differentDay}
          />
        );
      })}
    </div>
  );
}

const styles = {
  transactionsStyle: {
    padding: "5px",
  },
};
