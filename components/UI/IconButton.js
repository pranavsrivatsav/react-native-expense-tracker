import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function IconButton(
  { name, color, size, onPress = () => {}, containerStyle = styles.container },
  
) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [containerStyle, styles.pressed] : containerStyle
      }
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
