import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Create = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#76a6df",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Create;
