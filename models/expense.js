import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

class Expense {
  constructor(id, date, description, amount) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.amount = amount;
  }

  updateExpense({ date, description, amount }) {
    this.date = date;
    this.description = description;
    this.amount = amount;
  }
}

export default Expense;

export function compareFn(a, b) {
  if (a.date > b.date) return -1;
  if (b.date > a.date) return 1;
  return 0;
}

export function getDisplayDate(expense) {
  return expense.date.toISODate();
}
