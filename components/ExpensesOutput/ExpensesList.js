import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(expense) => `expenseItem${expense.id}`}
      />
    </View>
  );

  function renderExpenseItem({ index, item: expense }) {
    return (
      <ExpenseItem expense={expense} onPress={()=>{}}/>
    );
  }
};

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  itemContainer: {
    height: 70,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    overflow: "hidden",
  },
  itemDate: {
    fontWeight: "400",
    color: GlobalStyles.colors.primary50
  },
  itemDescription: {
    fontWeight: "600",
    fontSize: 18,
    color: 'white'
  },
  itemdetailsContainer: {
    paddingHorizontal: 8,
    justifyContent: "space-evenly",
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  itemAmountContainer: {
    width: 100,
    backgroundColor: GlobalStyles.colors.primary400,
    justifyContent: "center",
    alignItems: "center",
  },
  itemAmount: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});
