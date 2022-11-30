import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Show from "../Show";
import Update from "../Update";

const Stack = createStackNavigator();
const ProfileNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTransparent: true, title: "" }}>
      <Stack.Screen name="Show Item" component={Show} />
      <Stack.Screen name="Update" component={Update} />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
