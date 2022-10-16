import React, { memo } from "react";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";

import { handleLogin } from "../../redux/actions";
import { Reducers } from "../../redux/types";

import styles from "./styles";

const Index = (props: DrawerContentComponentProps<DrawerContentOptions>) => {
  const dispatch = useDispatch();
  const persistState = useSelector((state: Reducers) => state.persist);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.text}>{persistState.username}</Text>
      </View>

      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => dispatch(handleLogin(""))} />
    </DrawerContentScrollView>
  );
};

export default memo(Index);
