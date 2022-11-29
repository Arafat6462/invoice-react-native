import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Tab from "./Tab";
const { width } = Dimensions.get("screen");

const TabBar = ({ navigation, state }) => {
  const [selected, setSelected] = useState("Home");
  const { routes } = state;

  // Change color of active tab
  const renderColor = (currentTab) => {
    return currentTab == selected ? "#22a7f0" : "black";
  };

  // switch to another page on tab press
  const handlePress = (activeTab, index) => {
    // console.log(activeTab);
    // to avoid re-render/navigate if user press same tab again.
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    width,
    height: 50,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#d7e1ee",
    width: "80%",
    justifyContent: "space-between",
    borderRadius: 100,
    elevation: 4,
    shadowColor: "blue",
  },
});

export default TabBar;
