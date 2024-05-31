import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const ExpensesSummary = ({expenses, expensePeriod}) => {

  const expenseSum = expenses.reduce((sum, expense) => (sum + expense.amount), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{expensePeriod}</Text>
      <Text style={styles.sum}>{expenseSum.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 12
    },
    period: {
        fontSize: 18,
        fontWeight: "400"
    }, sum: {
        fontSize: 18,
        fontWeight: "600"
    }
});


export default ExpensesSummary;

