import React from "react";

export default function Actions({ filterText, onFilter, onNewTransaction }) {
  const handleFilterTextChange = (event) => {
    const userText = event.currentTarget.value;
    onFilter(userText);
  };

  const handleButtonClick = () => {
    onNewTransaction();
  };

  const { containerStyle, inputStyle } = styles;

  return (
    <div style={containerStyle}>
      <button
        className="btn"
        disabled={filterText.trim() !== ""}
        onClick={handleButtonClick}
      >
        + New transaction
      </button>

      <div className="input-filter" style={inputStyle}>
        <input
          placeholder="Filter"
          type="text"
          value={filterText}
          onChange={handleFilterTextChange}
        />
      </div>
    </div>
  );
}

const styles = {
  containerStyle: {
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  inputStyle: {
    marginLeft: "10px",
    display: "flex",
    flex: 1,
  },
};
