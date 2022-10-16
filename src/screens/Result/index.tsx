import React from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";

const ButtonCustom: any = Button;

const Index = () => {
  const navigation = useNavigation() as any;
  const { params } = useRoute() as any;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Final Score: ${params.finalScore}`}</Text>

      <View>
        <Text>{`Total time played: ${params.totalTime}`}</Text>
        <Text>{`Average guesses: ${params.averageGuesses}`}</Text>
        <Text>{`Hint used: ${params.hintUsed}`}</Text>
      </View>

      <View style={styles.wrapButton}>
        <ButtonCustom
          width="45%"
          marginBottom={2}
          onPress={() => navigation.replace("Play")}
        >
          PLAY AGAIN
        </ButtonCustom>
        <ButtonCustom width="45%" marginBottom={2}>
          HIGH SCORES
        </ButtonCustom>
        <ButtonCustom width="45%" onPress={() => navigation.goBack()}>
          MAIN MENU
        </ButtonCustom>
      </View>
    </View>
  );
};

export default Index;
