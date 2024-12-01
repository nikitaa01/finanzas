import AntdIcon from "@/components/icons/AntdIcon";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "rgb(31 41 55)",
        },
        sceneStyle: {
          backgroundColor: "rgb(17 24 39)",
        },
        tabBarStyle: {
          backgroundColor: "rgb(31 41 55)",
          borderTopColor: "rgb(31 41 55)",
          ...Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntdIcon size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <AntdIcon size={28} name="search1" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
