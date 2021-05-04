import React from "react";
import Select from "./Select";

export default function Header({ selectedMonth, onMonthChange }) {
  const handleChange = (month) => {
    onMonthChange(month);
  };

  return (
    <div>
      <h3>Bootcamp Full Stack - Desafio Final</h3>
      <span>Controle Financeiro Pessoal</span>
      <Select selection={selectedMonth} onSelect={handleChange} />
    </div>
  );
}
