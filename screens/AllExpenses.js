import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function AllExpenses() {
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

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expensePeriod={"Total"}
        expenses={expenseCtx.expenses}
        fallbackText={"No Expenses Registered."}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
