import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Tab = ({ color, tab, onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AntDesign name={icon} size={24} color={color} />
      <Text style={{ color }}>{tab.name}</Text>
      {console.log("icon si :" + typeof icon)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#0ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  iconn: {
    width: 24,
    height: 24,
  },
});

export default Tab;
