/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NativeBaseProvider } from "native-base";

import { persistor, store } from "./src/redux/store";
import NavigationApp from "./src/navigation";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NativeBaseProvider>
        <NavigationApp />
      </NativeBaseProvider>
    </PersistGate>
  </Provider>
);

export default App;
