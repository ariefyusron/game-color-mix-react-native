import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Reducers } from "../../redux/types";

import styles from "./styles";

const ButtonCustom: any = Button;

const Index = () => {
  const persistState = useSelector((state: Reducers) => state.persist);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Welcome, ${persistState.username}`}</Text>
      <Text style={styles.desc}>
        The goal of this game is to produce the exact color as shown within a
        time limit. Provide the red, green, and blue values (0 to 255), then
        press the Guest Color button to answer. Your score is determined by the
        remaining time. When the time is up, then it&apos;s a game over! See if
        you can reach top 5!
      </Text>

      <View style={styles.wrapButton}>
        <ButtonCustom width="50%" onPress={() => navigation.navigate("Play")}>
          PLAY GAME
        </ButtonCustom>
      </View>
    </View>
  );
};

export default Index;
