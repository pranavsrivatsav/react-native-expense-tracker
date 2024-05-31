import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesOutput({ expenses, expensePeriod, fallbackText }) {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>

  if(expenses?.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} expensePeriod={expensePeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  fallbackText: {
    color: 'white',
    fontSize: 18,
    marginTop: 32, 
    textAlign: 'center'
  }
});
