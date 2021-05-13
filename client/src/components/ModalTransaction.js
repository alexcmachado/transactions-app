import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const INCOME_COLOR = "#27ae60";
const EXPENSE_COLOR = "#c0392b";

Modal.setAppElement("#root");

function today() {
  const date = new Date();

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const today = `${year}-${month}-${day}`;
  return today;
}

export default function ModalTransaction({
  isOpen,
  selectedTransaction = null,
  onClose,
  onSave,
}) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(today());
  const [mode, setMode] = useState("insert");

  const [type, setType] = useState(
    !!selectedTransaction ? selectedTransaction.type : "-"
  );

  useEffect(() => {
    if (!selectedTransaction) {
      setMode("insert");
      return;
    }

    const { description, value, category, yearMonthDay } = selectedTransaction;

    setDescription(description);
    setValue(value);
    setCategory(category);
    setDate(yearMonthDay);
    setMode("edit");
  }, [selectedTransaction]);

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setType(newType);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  };

  const handleValueChange = (event) => {
    const newValue = +event.target.value;
    setValue(newValue);
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
  };

  const handleCloseClick = () => {
    onClose();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newTransaction = !selectedTransaction
      ? {
          description,
          value,
          yearMonthDay: date,
          category,
          type,
        }
      : {
          id: selectedTransaction.id,
          description,
          value,
          yearMonthDay: date,
          category,
          type,
        };

    onSave(newTransaction, mode);
  };

  const canSave = () => {
    return description.trim() !== "" && category.trim() !== "";
  };

  const title = mode === "insert" ? "Insert Transaction" : "Edit Transaction";

  const {
    modalStyle,
    headerStyle,
    formStyle,
    radioStyle,
    radioButtonStyle,
    incomeExpenseStyle,
  } = styles;

  const incomeTextStyle =
    mode === "insert"
      ? { color: INCOME_COLOR, ...incomeExpenseStyle }
      : incomeExpenseStyle;

  const expenseTextStyle =
    mode === "insert"
      ? { color: EXPENSE_COLOR, ...incomeExpenseStyle }
      : incomeExpenseStyle;

  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <div>
        <div style={headerStyle}>
          <h3 style={{ marginRight: "10px", fontWeight: "bold" }}>{title}</h3>

          <button className={"btn red darken-4"} onClick={handleCloseClick}>
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={formStyle}>
            <div style={radioStyle}>
              <label style={radioButtonStyle}>
                <input
                  name="expense-income"
                  type="radio"
                  value="-"
                  checked={type === "-"}
                  onChange={handleTypeChange}
                  disabled={mode !== "insert"}
                />
                <span style={expenseTextStyle}>Expense</span>
              </label>

              <label style={radioButtonStyle}>
                <input
                  name="expense-income"
                  type="radio"
                  value="+"
                  checked={type === "+"}
                  onChange={handleTypeChange}
                  disabled={mode !== "insert"}
                />
                <span style={incomeTextStyle}>Income</span>
              </label>
            </div>

            <div className="input-field">
              <input
                id="inputDescription"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                autoFocus
                required
              />
              <label htmlFor="inputDescription" className="active">
                Description:
              </label>
            </div>

            <div className="input-field">
              <input
                id="inputCategory"
                type="text"
                value={category}
                onChange={handleCategoryChange}
                required
              />
              <label htmlFor="inputCategory" className="active">
                Category:
              </label>
            </div>

            <div style={headerStyle}>
              <div className="input-field" style={{ marginRight: "10px" }}>
                <input
                  id="inputValue"
                  type="number"
                  min="0"
                  step="0.01"
                  value={value}
                  onChange={handleValueChange}
                  required
                />
                <label htmlFor="inputValue" className="active">
                  Value:
                </label>
              </div>

              <input
                placeholder="Date"
                type="date"
                value={date}
                onChange={handleDateChange}
                required
              />
            </div>
          </div>

          <input
            type="submit"
            className="btn"
            value="Save"
            disabled={!canSave()}
          />
        </form>
      </div>
    </Modal>
  );
}

const styles = {
  modalStyle: {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  },

  headerStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  formStyle: {
    border: "1px solid lightgrey",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "10px",
  },

  radioStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
  },

  radioButtonStyle: {
    marginRight: "10px",
    marginLeft: "10px",
    padding: "20px",
  },

  incomeExpenseStyle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
};
