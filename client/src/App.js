import React, { useEffect, useState } from "react";
import * as api from "./api/apiService.js";
import PeriodSelector from "./components/PeriodSelector";
import Transactions from "./components/Transactions";
import Summary from "./components/Summary";
import Actions from "./components/Actions.js";
import ModalTransaction from "./components/ModalTransaction";
import Spinner from "./components/Spinner.js";

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

  const [summary, setSummary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

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

      setIsDataLoaded(false);

      const transactions = await api.getTransactions(currentPeriod);
      setCurrentTransactions(transactions);

      setIsDataLoaded(true);
    };

    fetchData();
  }, [currentPeriod]);

  useEffect(() => {
    if (filterText.trim() === "") {
      setFilteredTransactions(currentTransactions);
    } else {
      const lowerCaseFilter = filterText.toLowerCase();

      const newFilteredTransactions = currentTransactions.filter(
        ({ descriptionLowerCase }) => {
          return descriptionLowerCase.includes(lowerCaseFilter);
        }
      );
      setFilteredTransactions(newFilteredTransactions);
    }
  }, [filterText, currentTransactions]);

  useEffect(() => {
    const totalEntries = filteredTransactions.length;

    const totalIncome = filteredTransactions
      .filter(({ type }) => type === "+")
      .reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);

    const totalExpense = filteredTransactions
      .filter(({ type }) => type === "-")
      .reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);

    const balance = totalIncome - totalExpense;

    setSummary({
      totalEntries,
      totalIncome,
      totalExpense,
      balance,
    });
  }, [filteredTransactions]);

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  const handleFilter = (text) => {
    setFilterText(text);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="center">
        <h3>Personal Finances Manager</h3>
      </div>

      <PeriodSelector
        allPeriods={allPeriods}
        selectedPeriod={currentPeriod}
        onChangePeriod={handlePeriodChange}
      />

      {!isDataLoaded && <Spinner>Loading...</Spinner>}

      {isDataLoaded && (
        <>
          <Summary summary={summary} />

          <Actions
            filterText={filterText}
            onFilter={handleFilter}
            onNewTransaction={handleClick}
          />

          <Transactions transactions={filteredTransactions} />

          {isModalOpen && <ModalTransaction onClose={handleClose} />}
        </>
      )}
    </div>
  );
}
