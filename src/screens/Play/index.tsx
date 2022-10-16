import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Button, Input, Stack } from "native-base";

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
  const [timer, setTimer] = useState(initTimer);
  const [colorRandom, setColorRandom] = useState("rgba(255,255,255, 1)");
  const [formState, setFormState] = useState(initFormState);
  const [yourColor, setYourColor] = useState("rgba(255,255,255,1)");
  const [textHint, setTextHint] = useState("");
  const [countGuestColor, setCountGuestColor] = useState(0);

  const score = useMemo(() => {
    const hintMultiplier = textHint === "" ? 1 : 0.5;
    const guestMultiplier = countGuestColor < 5 ? 5 - countGuestColor : 1;

    return Math.floor(hintMultiplier * guestMultiplier * timer);
  }, [countGuestColor, textHint, timer]);

  const _getRandomRgb = useCallback(() => Math.floor(Math.random() * 256), []);

  const _getRandomColor = useCallback(() => {
    setColorRandom(
      `rgba(${_getRandomRgb()},${_getRandomRgb()},${_getRandomRgb()}, 1)`
    );
  }, [_getRandomRgb]);

  useEffect(() => {
    _getRandomColor();
  }, [_getRandomColor]);

  useEffect(() => {
    if (timer > 0) {
      timeInterval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      clearInterval(timeInterval);
    }

    return () => clearInterval(timeInterval);
  }, [timer]);

  const _convertTimer = useCallback((time: number) => {
    const minutes = `0${Math.floor(time / 60)}`;
    const seconds = `0${time - Number(minutes) * 60}`;
    return `${minutes.substr(-2)}:${seconds.substr(-2)}`;
  }, []);

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
      setYourColor(
        `rgba(${formState.red},${formState.green},${formState.blue},1)`
      );
      setCountGuestColor(countGuestColor + 1);
    } else {
      Alert.alert("Input hanya menerima angka 0 sampai 255");
    }
  }, [countGuestColor, formState]);

  const _handleUseHint = useCallback(() => {
    const hint = colorRandom.slice(5, colorRandom.length - 1).split(",")[0];

    setTextHint(hint);
    setTimer(Math.floor(timer / 2));
  }, [colorRandom, timer]);

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
        <Text style={styles.textScore}>{`Score: ${score}`}</Text>
      </View>

      <ScrollView>
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
              isDisabled={textHint !== ""}
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
