import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import * as api from "./api/apiService.js";
import Transactions from "./components/Transactions";
import Stats from "./components/Stats";
import Filter from "./components/Filter";
import ModalTransaction from "./components/ModalTransaction";
import AddButton from "./components/AddButton";

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState("2021-05");
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getTransactions(selectedMonth);
      setAllTransactions(transactions);
    };
    getTransactions();
  }, [selectedMonth]);

  useEffect(() => {
    const transactions = allTransactions.filter(({ description }) => {
      return description.includes(filter);
    });
    setFilteredTransactions(transactions);
  }, [filter, allTransactions]);

  const handleTyping = (text) => {
    setFilter(text);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
      <Stats transactions={filteredTransactions} />
      <div>
        <AddButton onClick={handleClick} />
        <Filter filter={filter} onType={handleTyping} />
      </div>
      <Transactions transactions={filteredTransactions} />
      {isModalOpen && <ModalTransaction onClose={handleClose} />}
    </div>
  );
}
