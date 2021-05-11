import React, { useEffect, useState } from "react";
import * as api from "./api/apiService.js";
import PeriodSelector from "./components/PeriodSelector";
import Transactions from "./components/Transactions";
import Summary from "./components/Summary";
import Actions from "./components/Actions.js";
import ModalTransaction from "./components/ModalTransaction";

function getCurrentPeriod(allPeriods) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const yearMonth = `${year}-${month.toString().padStart(2, "0")}`;
  const currentPeriod = allPeriods.find(({ id }) => id === yearMonth);
  return currentPeriod || { ...allPeriods[0] };
}

export default function App() {
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [allPeriods, setAllPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [filterText, setFilterText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getAllPeriods = async () => {
      const data = await api.getAllPeriods();
      setAllPeriods(data);

      setCurrentPeriod(getCurrentPeriod(data));
    };

    getAllPeriods();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentPeriod) {
        return;
      }

      const transactions = await api.getTransactions(currentPeriod);
      setCurrentTransactions(transactions);
    };

    fetchData();
  }, [currentPeriod]);

  useEffect(() => {
    const transactions = currentTransactions.filter(({ description }) => {
      return description.includes(filterText);
    });
    setFilteredTransactions(transactions);
  }, [filterText, currentTransactions]);

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  const handleTyping = (text) => {
    setFilterText(text);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        <h3>Bootcamp Full Stack - Desafio Final</h3>
        <h4>Controle Financeiro Pessoal</h4>
      </div>
      <PeriodSelector
        allPeriods={allPeriods}
        selectedPeriod={currentPeriod}
        onChangePeriod={handlePeriodChange}
      />

      <Summary transactions={filteredTransactions} />

      <Actions
        onClick={handleClick}
        filter={filterText}
        onType={handleTyping}
      />

      <Transactions transactions={filteredTransactions} />

      {isModalOpen && <ModalTransaction onClose={handleClose} />}
    </div>
  );
}
