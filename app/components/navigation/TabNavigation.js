import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Create from "../Create";
import TabBar from "../TabBar";
import ProfileNavigation from "./ProfileNavigation";
import Show from "../Show";
import Profile from "../Profile";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Show"
        component={ProfileNavigation}
        initialParams={{ icon: "appstore-o" }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        initialParams={{ icon: "plus" }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ icon: "user" }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
