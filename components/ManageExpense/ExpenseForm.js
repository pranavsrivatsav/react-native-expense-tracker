import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { DateTime } from "luxon";
import { getDisplayDate } from "../../models/expense";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, expense }) => {
  const [inputValues, setInputValues] = useState(initializeInputValues());
  const [isValidInputs, setIsValidInputs] = useState({
    date: true,
    description: true,
    amount: true
  });

  const isInvalidForm = !isValidInputs.date || !isValidInputs.description || !isValidInputs.amount;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.rowInputContainer}>
        <Input
          label={"Date"}
          textInputProps={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: onInputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
          style={isValidInputs.date ? styles.rowInput : {...styles.rowInput, ...styles.errorInput}}
        />
        <Input
          label={"Amount"}
          textInputProps={{
            keyboardType: "decimal-pad",
            maxLength: 8,
            onChangeText: onInputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
          style={isValidInputs.amount ? styles.rowInput : {...styles.rowInput, ...styles.errorInput}}
        />
      </View>
      <Input
        label={"Description"}
        textInputProps={{
          multiline: true,
          onChangeText: onInputChangeHandler.bind(this, "description"),
          value: inputValues.description,
        }}
        style={!isValidInputs.description && styles.errorInput}
      />
      {isInvalidForm && <Text style={styles.errorText}>Invalid Input: Please check and correct the provided details.</Text>}
      {renderButtons()}
    </View>
  );

  function renderButtons() {
    return <View style={styles.buttonsContainer}>
      <Button style={styles.button} mode="flat" onPress={onCancel}>
        Cancel
      </Button>
      <Button style={styles.button} onPress={onSubmitHandler}>
        {submitButtonLabel}
      </Button>
    </View>;
  }

  function onInputChangeHandler(inputKey, value) {
    setInputValues((prevInputValues) => {
      return {
        ...prevInputValues,
        [inputKey]: value,
      };
    });
  }

  function onSubmitHandler() {
    const { date, description, amount } = inputValues;
    const expenseObj = {
      date: DateTime.fromISO(date),
      description,
      amount: Number(amount),
    };

    const isValidInput = validateExpenseObj(expenseObj);

    if (!isValidInput) {
      return;
    }

    onSubmit(expenseObj);
  }

  function validateExpenseObj({ date, description, amount }) {
    const isValidDate = date.isValid;
    const isValidDescription = description.trim().length > 0;
    const isValidAmount = !isNaN(amount) && amount > 0;

    setIsValidInputs({
      date: isValidDate,
      description: isValidDescription,
      amount: isValidAmount
    })

    return isValidDate && isValidDescription && isValidAmount;
  }

  function initializeInputValues() {
    return expense
      ? {
          date: getDisplayDate(expense),
          amount: String(expense?.amount),
          description: expense?.description,
        }
      : {};
  }
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
  rowInputContainer: {
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    backgroundColor: GlobalStyles.colors.error500,
    fontSize: 16,
    color: GlobalStyles.colors.error50,
    fontWeight: "600",
    textAlign: 'center',
    marginVertical: 8,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6
  },
  errorInput: {
    borderColor: GlobalStyles.colors.error500,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.error500
  }
});
