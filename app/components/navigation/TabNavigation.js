import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home";
import Create from "../Create";
import Profile from "../Profile";
import TabBar from "../TabBar";
import ProfileNavigation from "./ProfileNavigation";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ icon: "home" }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        initialParams={{ icon: "plus" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        initialParams={{ icon: "user" }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
