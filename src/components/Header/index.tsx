import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import { Icon } from "..";

interface Props {
  title: string;
}

const Index = ({ title }: Props) => {
  const navigation = useNavigation() as any;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonMenu}
        onPress={() => navigation.openDrawer()}
      >
        <Icon name="menu" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default memo(Index);
