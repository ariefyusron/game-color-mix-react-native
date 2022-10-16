import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { useSelector } from "react-redux";

import Home from "../screens/Home";
import Play from "../screens/Play";
import Login from "../screens/Login";
import { Reducers } from "../redux/types";

const { Navigator, Screen } = createStackNavigator();

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
            name="Home"
            component={Home}
            options={{ header: () => null }}
          />
          <Screen
            name="Play"
            component={Play}
            options={{ title: "Color Mixer" }}
          />
        </>
      )}
    </Navigator>
  );
};

export default Stack;
