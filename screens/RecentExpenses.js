import { View, Text, StyleSheet } from 'react-native'
import { DateTime } from "luxon";
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context';
import Expense, { compareFn } from '../models/expense';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const errorMsg = await expenseCtx.getExpenses();
      setIsLoading(false);
      if(errorMsg) setError(errorMsg)
    })();
  }, []);

  if(error) {
    return <ErrorOverlay message={error} onConfirm={()=>{setError(null)}}/>
  }

  if(isLoading) {
    return <LoadingOverlay message={'Fetching your expenses...'}/>
  }

  const dt = DateTime.now();
  const dtWeekAgo = dt.minus({days: 7});
  let recentExpenses = expenseCtx.expenses.filter(expense => expense.date >= dtWeekAgo);
  recentExpenses = recentExpenses.sort(compareFn)
  return (
    <View style={styles.container}>
      <ExpensesOutput
        expensePeriod={"Last 7 days"}
        expenses={expenseCtx.expenses}
        fallbackText={"No Expenses Registered in the last 7 days."}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})