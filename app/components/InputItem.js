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
          { borderColor: isFocused ? "blue" : "#c1c2d200" },
          { elevation: isFocused ? 10 : 0 },
          { shadowColor: isFocused ? "purple" : "" },
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
      <Text style={{ marginTop: 7, color: "#ff0000", fontSize: 12 }}>
        {error}
      </Text>
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
    backgroundColor: "#eff1f9",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    color: "blue",
    fontSize: 16,
    height: 55,
  },
});

export default InputField;
