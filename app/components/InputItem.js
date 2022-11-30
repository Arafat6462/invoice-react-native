import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";

const InputField = ({ label, error, onFocus = () => {}, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          { borderColor: isFocused ? "blue" : "gray" },
        ]}
      >
        <TextInput
          style={styles.textInput}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: "gray",
  },
  inputContainer: {
    height: 55,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    color: "blue",
  },
});

export default InputField;
