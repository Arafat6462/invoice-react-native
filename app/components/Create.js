import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "./Btn";
import InputItem from "./InputItem";
const Create = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textCreate}>Create</Text>
        <View style={{ marginVertical: 20 }}>
          <InputItem label="Email" placeholder="Enter your Email" />
          <InputItem label="Password" placeholder="Enter your Password" />
          <InputItem label="User name" placeholder="Enter your User Name" />
          <InputItem label="User name" placeholder="Enter your User Name" />
          <Btn title="Create" onPress={() => navigation.navigate("Show")} />
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Create;
