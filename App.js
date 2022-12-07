import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import TabNavigation from "./app/components/navigation/TabNavigation";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs([
    "Invalid prop `textStyle` of type `array` supplied to `Cell`",
  ]);
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
