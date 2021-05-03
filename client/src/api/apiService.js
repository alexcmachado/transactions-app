import axios from "axios";

const URL = "http://localhost:3001/api/transaction";

async function getTransactions(period) {
  const res = await axios.get(URL, { params: { period } });

  const transactions = res.data;
  return transactions;
}

export { getTransactions };
