import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Btn = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.btnPress}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnPress: {
    height: 55,
    width: "100%",
    backgroundColor: "#0000ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
    marginBottom: 100,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Btn;
