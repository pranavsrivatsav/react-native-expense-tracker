import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { DateTime } from "luxon";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { useScrollToTop } from "@react-navigation/native";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const editedExpenseId = route.params?.expenseId;
  const isEditMode = !!editedExpenseId;
  const expense =
    isEditMode &&
    expenseCtx.expenses.find((expense) => expense.id === editedExpenseId);

  useEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit Expense" : "Add Expense",
    });
  }, []);

  if (error) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={() => {
          setError(null);
        }}
      />
    );
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <View style={styles.container}>
        <ExpenseForm
          onCancel={onCancel}
          onSubmit={isEditMode ? onUpdate : onAdd}
          submitButtonLabel={isEditMode ? "Update" : "Add"}
          expense={expense}
        />

        {isEditMode && (
          <View style={styles.deleteContainer}>
            <IconButton
              name={"trash"}
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={onDelete}
            />
          </View>
        )}
      </View>
    </>
  );

  async function onDelete() {
    setIsLoading(true);
    const errorMsg = await expenseCtx.deleteExpense(editedExpenseId);
    if (errorMsg) {
      setError(errorMsg);
    } else {
      navigation.goBack();
    }
    setIsLoading(false);
  }

  async function onAdd(expenseObj) {
    setIsLoading(true);
    const errorMsg = await expenseCtx.addExpense(expenseObj);
    if (errorMsg) {
      setError(errorMsg);
    } else {
      navigation.goBack();
    }
    setIsLoading(false);
  }

  function onCancel() {
    navigation.goBack();
  }

  async function onUpdate(expenseObj) {
    setIsLoading(true);
    const errorMsg = await expenseCtx.updateExpense(
      editedExpenseId,
      expenseObj
    );
    if (errorMsg) {
      setError(errorMsg);
    } else {
      navigation.goBack();
    }
    setIsLoading(false);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
