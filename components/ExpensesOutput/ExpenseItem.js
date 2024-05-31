import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { getDisplayDate } from "../../models/expense";

const ExpenseItem = ({ expense, onPress }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={() => {
        navigation.navigate("ManageExpenses", {
            expenseId: expense.id
        });
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemdetailsContainer}>
          <Text style={styles.itemDescription}>{expense.description}</Text>
          <Text style={styles.itemDate}>{getDisplayDate(expense)}</Text>
        </View>
        <View style={styles.itemAmountContainer}>
          <Text style={styles.itemAmount}>${expense.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
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
    color: GlobalStyles.colors.primary50,
  },
  itemDescription: {
    fontWeight: "600",
    fontSize: 18,
    color: "white",
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
