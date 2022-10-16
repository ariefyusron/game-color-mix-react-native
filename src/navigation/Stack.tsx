import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";

import Home from "../screens/Home";
import Play from "../screens/Play";

const { Navigator, Screen } = createStackNavigator();

const Stack = () => (
  <Navigator
    initialRouteName="Home"
    screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}
  >
    <Screen name="Home" component={Home} options={{ header: () => null }} />
    <Screen name="Play" component={Play} options={{ title: "Color Mixer" }} />
  </Navigator>
);

export default Stack;
