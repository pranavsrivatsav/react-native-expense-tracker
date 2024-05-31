import axios from "axios";

const dbUrl = 'https://react-native-demo-5bca4-default-rtdb.firebaseio.commmm/';

export async function createExpenseInDb(expenseData) {
  const url = dbUrl + 'expenses.json'
  const response = await axios.post(url, expenseData);
  return response.data.name;
}

export async function getExpensesInDb() {
  const url = dbUrl + 'expenses.json'
  const response = await axios.get(url);
  return response.data;
}

export async function updateExpenseInDb(expenseId, expenseData) {
  const url = dbUrl + `expenses/${expenseId}.json`;
  await axios.put(url, expenseData);
}

export async function deleteExpenseInDb(expenseId) {
  const url = dbUrl + `expenses/${expenseId}.json`;
  await axios.delete(url);
}