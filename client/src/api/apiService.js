import axios from "axios";

const api = axios.create({ baseURL: "api" });
const RESOURCE = "/transaction";

const GLOBAL_YEARS = [2019, 2020, 2021];
const GLOBAL_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MONTH_DESCRIPTIONS = [
  "",
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

let allPeriods = [];

function _processPeriods() {
  allPeriods = [];
  let index = 0;

  GLOBAL_YEARS.forEach((year) => {
    GLOBAL_MONTHS.forEach((month) => {
      const id = `${year}-${month.toString().padStart(2, "0")}`;
      const monthDescription = `${MONTH_DESCRIPTIONS[month]}/${year}`;

      allPeriods.push({ id, description: monthDescription, index: index++ });
    });
  });
}

async function getTransactions(period) {
  const { id: yearMonth } = period;
  const { data } = await api.get(`${RESOURCE}?period=${yearMonth}`);

  const transactions = data;
  return transactions;
}

async function getAllPeriods() {
  if (allPeriods.length === 0) {
    _processPeriods();
  }

  return allPeriods;
}

export { getTransactions, getAllPeriods };
