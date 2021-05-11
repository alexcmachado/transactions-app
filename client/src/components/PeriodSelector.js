import React from "react";

export default function PeriodSelector({
  allPeriods,
  selectedPeriod,
  onChangePeriod,
}) {
  const handleSelectChange = (event) => {
    onChangePeriod(
      allPeriods.find((period) => period.id === event.target.value)
    );
  };

  if (allPeriods.length === 0 || !selectedPeriod) {
    return null;
  }

  return (
    <div>
      <select
        className="browser-default"
        value={selectedPeriod.id}
        onChange={handleSelectChange}
      >
        {allPeriods.map((period) => {
          const { id, description } = period;

          return (
            <option key={id} value={id}>
              {description}
            </option>
          );
        })}
      </select>
    </div>
  );
}
