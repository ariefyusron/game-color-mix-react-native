import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Button, Input, Stack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { saveScore } from "../../redux/actions";

import styles from "./styles";

const ButtonCustom: any = Button;

let timeInterval: any;
const initTimer = 255;
const initFormState: any = {
  red: "",
  green: "",
  blue: "",
};

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation() as any;

  const [isEnd, setIsEnd] = useState(true);
  const [timer, setTimer] = useState(initTimer);
  const [colorRandom, setColorRandom] = useState("rgba(255,255,255,1)");
  const [formState, setFormState] = useState(initFormState);
  const [yourColor, setYourColor] = useState("rgba(255,255,255,1)");
  const [textHint, setTextHint] = useState("");
  const [countGuestColor, setCountGuestColor] = useState(0);

  const _getScore = useCallback(
    (countGuest: number) => {
      const hintMultiplier = textHint === "" ? 1 : 0.5;
      const guestMultiplier = countGuest < 5 ? 5 - countGuest : 1;

      return Math.floor(hintMultiplier * guestMultiplier * timer);
    },
    [textHint, timer]
  );

  const _getRandomRgb = useCallback(() => Math.floor(Math.random() * 256), []);

  const _getRandomColor = useCallback(() => {
    setColorRandom(
      `rgba(${_getRandomRgb()},${_getRandomRgb()},${_getRandomRgb()},1)`
    );
  }, [_getRandomRgb]);

  useEffect(() => {
    _getRandomColor();
  }, [_getRandomColor]);

  const _convertTimer = useCallback((time: number) => {
    const minutes = `0${Math.floor(time / 60)}`;
    const seconds = `0${time - Number(minutes) * 60}`;
    return `${minutes.substr(-2)}:${seconds.substr(-2)}`;
  }, []);

  const _onGameOver = useCallback(() => {
    dispatch(saveScore(0));
    navigation.replace("Result", {
      finalScore: 0,
      totalTime: _convertTimer(initTimer - timer),
      averageGuesses: countGuestColor,
      hintUsed: textHint === "" ? 0 : 1,
    });
  }, [_convertTimer, countGuestColor, dispatch, navigation, textHint, timer]);

  useEffect(() => {
    if (timer >= 0) {
      timeInterval = setInterval(() => {
        const countTimer = timer - 1;

        if (countTimer >= 0) {
          setTimer(countTimer);
        } else if (isEnd) {
          setIsEnd(false);
          Alert.alert("GAME OVER", "Good Game Great Eyes!", [
            { text: "SHOW RESULT", onPress: _onGameOver },
          ]);
        }
      }, 1000);
    } else {
      clearInterval(timeInterval);
    }

    return () => clearInterval(timeInterval);
  }, [_onGameOver, isEnd, timer]);

  const _handleChangeForm = useCallback(
    (name: string, value: string) => {
      setFormState({ ...formState, [name]: value });
    },
    [formState]
  );

  const _handleSubmit = useCallback(() => {
    let success = true;

    Object.values(formState).forEach((e) => {
      if (e === "" || Number(e) < 0 || Number(e) > 255) {
        success = false;
      }
    });

    if (success) {
      const colorMix = `rgba(${formState.red},${formState.green},${formState.blue},1)`;
      const averageGuesses = countGuestColor + 1;

      if (colorMix === colorRandom) {
        dispatch(saveScore(Number(_getScore(averageGuesses))));
        navigation.replace("Result", {
          finalScore: _getScore(averageGuesses),
          totalTime: _convertTimer(initTimer - timer),
          averageGuesses,
          hintUsed: textHint === "" ? 0 : 1,
        });
      } else {
        setYourColor(colorMix);
        setCountGuestColor(averageGuesses);
      }
    } else {
      Alert.alert("Input hanya menerima angka 0 sampai 255");
    }
  }, [
    _convertTimer,
    _getScore,
    colorRandom,
    countGuestColor,
    dispatch,
    formState,
    navigation,
    textHint,
    timer,
  ]);

  const _handleUseHint = useCallback(() => {
    const hint = colorRandom.slice(5, colorRandom.length - 1).split(",")[0];
    const hint2 = colorRandom.slice(5, colorRandom.length - 1).split(",")[1];
    const hint3 = colorRandom.slice(5, colorRandom.length - 1).split(",")[2];

    let result = "";

    if (textHint === "") {
      result = hint;
    } else if (textHint.split(",").length === 1) {
      result = `${hint},${hint2}`;
    } else if (textHint.split(",").length === 2) {
      result = `${hint},${hint2},${hint3}`;
    }

    setTextHint(result);
    setTimer(Math.floor(timer / 2));
  }, [colorRandom, textHint, timer]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapIndicatorTimer}>
        <View
          style={[
            styles.indicatorTimer,
            {
              backgroundColor: colorRandom,
              width: `${(timer / initTimer) * 100}%`,
            },
          ]}
        />
      </View>
      <View style={styles.wrapTextTimer}>
        <Text style={styles.textTimer}>{_convertTimer(timer)}</Text>
      </View>

      <View style={styles.wrapTextScore}>
        <Text style={styles.textScore}>
          {`Score: ${_getScore(countGuestColor)}`}
        </Text>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.wrapCompareColor}>
          <View>
            <Text style={styles.titleContainerColor}>Guest this color!</Text>
            <View
              style={[styles.containerColor, { backgroundColor: colorRandom }]}
            />
          </View>
          <View>
            <Text style={styles.titleContainerColor}>Your color!</Text>
            <View
              style={[styles.containerColor, { backgroundColor: yourColor }]}
            />
          </View>
        </View>

        <View style={styles.wrapTextHint}>
          <Text>{`${textHint !== "" ? `Hint: ${textHint}` : ""}`}</Text>
        </View>

        <View style={styles.form}>
          <Stack space={4}>
            <Input
              placeholder="Red (0-255)"
              onChangeText={(e) => _handleChangeForm("red", e)}
              value={formState.red}
              keyboardType="number-pad"
            />
            <Input
              placeholder="Green (0-255)"
              onChangeText={(e) => _handleChangeForm("green", e)}
              value={formState.green}
              keyboardType="number-pad"
            />
            <Input
              placeholder="Blue (0-255)"
              onChangeText={(e) => _handleChangeForm("blue", e)}
              value={formState.blue}
              keyboardType="number-pad"
            />
          </Stack>

          <View style={styles.wrapButton}>
            <ButtonCustom width="45%" onPress={_handleSubmit}>
              GUESS COLOR
            </ButtonCustom>
            <ButtonCustom
              width="45%"
              onPress={_handleUseHint}
              isDisabled={textHint.split(",").length === 3}
            >
              SHOW HINT
            </ButtonCustom>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
