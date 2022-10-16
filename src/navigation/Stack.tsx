import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import Play from "../screens/Play";
import Login from "../screens/Login";
import Result from "../screens/Result";
import HighScores from "../screens/HighScores";
import { Reducers } from "../redux/types";

const { Navigator, Screen } = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerComponent = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="HighScores" component={HighScores} />
    </Drawer.Navigator>
  );
};

const Stack = () => {
  const persistState = useSelector((state: Reducers) => state.persist);

  return (
    <Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
      {persistState.username === "" ? (
        <Screen
          name="Login"
          component={Login}
          options={{ header: () => null }}
        />
      ) : (
        <>
          <Screen
            name="Drawer"
            component={DrawerComponent}
            options={{ header: () => null }}
          />
          <Screen
            name="Play"
            component={Play}
            options={{ title: "Color Mixer" }}
          />
          <Screen
            name="Result"
            component={Result}
            options={{ title: "Result Screen" }}
          />
        </>
      )}
    </Navigator>
  );
};

export default Stack;
