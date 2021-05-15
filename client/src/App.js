import React, { useEffect, useState } from "react";
import * as api from "./api/apiService.js";
import PeriodSelector from "./components/PeriodSelector";
import Transactions from "./components/Transactions";
import Summary from "./components/Summary";
import Actions from "./components/Actions.js";
import ModalTransaction from "./components/ModalTransaction";
import Spinner from "./components/Spinner.js";

function sortTransactions(transactions) {
  return transactions.sort((a, b) =>
    a.yearMonthDay.localeCompare(b.yearMonthDay)
  );
}

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
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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

  const handleDeleteTransaction = async (id) => {
    await api.deleteTransaction(id);

    const newTransactions = currentTransactions.filter(
      (transaction) => transaction.id !== id
    );

    setCurrentTransactions(newTransactions);
  };

  const handleEditTransaction = (id) => {
    const newSelectedTransaction = currentTransactions.find(
      (transaction) => (transaction.id = id)
    );

    setSelectedTransaction(newSelectedTransaction);
    setIsModalOpen(true);
  };

  const handleInsertTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const handleModalSave = async (newTransaction, mode) => {
    setIsModalOpen(false);

    if (mode === "insert") {
      const postedTransaction = await api.postTransaction(newTransaction);

      let newTransactions = [...currentTransactions, postedTransaction];
      newTransactions = sortTransactions(newTransactions);
      setCurrentTransactions(newTransactions);
      setSelectedTransaction(null);
      return;
    }

    if (mode === "edit") {
      const updatedTransaction = await api.updateTransaction(newTransaction);
      const newTransactions = [...currentTransactions];

      const index = newTransactions.findIndex(
        (transaction) => transaction.id === newTransaction.id
      );

      newTransactions[index] = updatedTransaction;
      setCurrentTransactions(newTransactions);

      return;
    }
  };

  return (
    <div className="container">
      <div className="center">
        <h3>Transactions Manager</h3>
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
            onNewTransaction={handleInsertTransaction}
          />

          <Transactions
            transactions={filteredTransactions}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleEditTransaction}
          />

          {isModalOpen && (
            <ModalTransaction
              isOpen={isModalOpen}
              onClose={handleModalClose}
              onSave={handleModalSave}
              selectedTransaction={selectedTransaction}
            />
          )}
        </>
      )}
    </div>
  );
}
