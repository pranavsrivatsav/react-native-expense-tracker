import React, { createContext, useEffect, useReducer, useState } from "react";
import Expense from "../models/expense";
import {
  createExpenseInDb,
  deleteExpenseInDb,
  getExpensesInDb,
  updateExpenseInDb,
} from "../api/http";
import { DateTime } from "luxon";
import ExpensesList from "../components/ExpensesOutput/ExpensesList";
import { useScrollToTop } from "@react-navigation/native";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import {
  createError,
  deleteError,
  fetchError,
  updateError,
} from "../constants/errorMessages";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: async ({ date, description, amount }) => {},
  updateExpense: async (id, { date, description, amount }) => {},
  deleteExpense: async (id) => {},
  getExpenses: async () => {},
});

function expensesReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET": {
      return payload;
    }
    case "ADD": {
      const { id, date, description, amount } = payload;
      const newExpense = new Expense(id, date, description, amount);
      return [...state, newExpense];
    }
    case "UPDATE": {
      const newState = [...state];
      const expenseIndex = newState.findIndex(
        (expense) => expense.id === payload.id
      );
      newState[expenseIndex].updateExpense(payload.expenseData);
      return newState;
    }
    case "DELETE": {
      return state.filter((expense) => expense.id !== payload.id);
    }
    default:
      return state;
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  async function addExpense(expenseData) {
    try {
      const { date, description, amount } = expenseData;
      const expenseId = await createExpenseInDb({ date, description, amount });
      expenseData.id = expenseId;
      dispatch({ type: "ADD", payload: expenseData });
    } catch (error) {
      return createError;
    }
  }

  async function updateExpense(id, expenseData) {
    try {
      await updateExpenseInDb(id, expenseData);
      dispatch({ type: "UPDATE", payload: { id, expenseData } });
    } catch (error) {
      return updateError;
    }
  }

  async function deleteExpense(id) {
    try {
      await deleteExpenseInDb(id);
      dispatch({ type: "DELETE", payload: { id } });
    } catch (error) {
      return deleteError;
    }
  }

  async function getExpenses() {
    try {
      const expensesInDb = await getExpensesInDb();
      const expenseIds = Object.keys(expensesInDb);
      const expenseArray = expenseIds.map((expenseId) => {
        const { amount, date, description } = expensesInDb[expenseId];
        return new Expense(
          expenseId,
          DateTime.fromISO(date),
          description,
          amount
        );
      });
      dispatch({ type: "SET", payload: expenseArray });
    } catch (error) {
      return fetchError;
    }
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
