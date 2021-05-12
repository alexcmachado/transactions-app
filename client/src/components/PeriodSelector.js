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

  const { flexRowStyle, selectStyle } = styles;

  if (allPeriods.length === 0 || !selectedPeriod) {
    return null;
  }

  return (
    <div className="center" style={flexRowStyle}>
      <select
        className="browser-default"
        style={selectStyle}
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

const styles = {
  flexRowStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
  },

  selectStyle: {
    width: "150px",
    fontFamily: "monospace",
  },
};
