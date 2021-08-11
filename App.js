import React, { useEffect, useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TextInput, FlatList } from "react-native";
window.navigator.userAgent = "react-native";
import io from 'socket.io-client/dist/socket.io.js';
import HomeScreen from './screens/HomeScreen';
import TaskListScreen from './screens/TaskListScreen';
import TemperaturaScreen from './screens/TemperaturaScreen';
import { View } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from 'react-native-vector-icons/FontAwesome5';
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'red',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Monitoreo de vibración" component={HomeScreen}

          options={{
            title: 'Vibración',
            headerStyle: {
              backgroundColor: "#12161c",


            },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: '#ffffff',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="megaphone" size={size} color={color} />
            )
          }}

        />
        <Tab.Screen name="Temperatura" component={TemperaturaScreen}
          options={{
            title: 'Temperatura',
            headerStyle: {
              backgroundColor: "#12161c",
              borderColor: 'red',

            },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: '#ffffff',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="thermometer" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen name="Energia" component={TaskListScreen}

          options={{
            title: 'Energia',
            headerStyle: {
              backgroundColor: "#12161c",
              borderColor: 'red',

            },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: '#ffffff',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="battery-charging" size={size} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );



}
