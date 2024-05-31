import Expense from "./models/expense";
import { DateTime } from "luxon";

const dummyData = {
  expenses: [
    new Expense(DateTime.local(2024, 5, 15, 8, 30), "Travel", 23.45),
    new Expense(DateTime.local(2024, 5, 16, 5, 40), "Groceries", 56.78),
    new Expense(DateTime.local(2024, 5, 17, 7, 33), "Travel", 23.45),
    new Expense(DateTime.local(2024, 5, 18, 14, 2), "Travel", 23.45),
    new Expense(DateTime.local(2024, 5, 19, 13, 13), "Travel", 23.45),
    new Expense(DateTime.local(2024, 5, 19, 13, 13), "Travel", 23.45),
    new Expense(DateTime.local(2024, 5, 19, 13, 13), "Travel", 23.45),
    new Expense(DateTime.local(2024, 5, 19, 13, 13), "Travel", 23.45),
    new Expense(DateTime.local(2024, 5, 19, 13, 13), "Travel", 23.45),
    new Expense(DateTime.local(2024, 5, 19, 13, 13), "Travel", 23.45),
    new Expense(DateTime.local(2024, 5, 19, 13, 13), "Travel", 23.45),
  ],
};

export default dummyData;
