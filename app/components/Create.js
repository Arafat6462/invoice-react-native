import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputItem from "./InputItem";
const Create = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textCreate}>Create</Text>
        <View style={{ marginVertical: 20 }}>
          <InputItem label="Email" placeholder="Enter your Email address" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollView: {
    // paddingTop: 50,
    paddingHorizontal: 20,
  },
  textCreate: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Create;
