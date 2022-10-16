import React, { useCallback, useState } from "react";
import { Alert, Text, View } from "react-native";
import { Button, Input, Stack } from "native-base";
import { useDispatch } from "react-redux";

import { handleLogin } from "../../redux/actions";

import styles from "./styles";

const ButtonCustom: any = Button;

const Index = () => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const _handleChangeForm = useCallback(
    (name: string, value: string) => {
      setFormState({ ...formState, [name]: value });
    },
    [formState]
  );

  const _handleSubmit = useCallback(() => {
    if (formState.username !== "" && formState.password !== "12345678") {
      Alert.alert("Password salah!");
    } else {
      dispatch(handleLogin(formState.username));
    }
  }, [dispatch, formState.password, formState.username]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Color Mixer</Text>

        <View>
          <Stack space={4}>
            <Input
              placeholder="Username"
              onChangeText={(e) => _handleChangeForm("username", e)}
            />
            <Input
              placeholder="Password"
              type="password"
              onChangeText={(e) => _handleChangeForm("password", e)}
            />
          </Stack>

          <ButtonCustom marginTop={8} onPress={_handleSubmit}>
            LOGIN
          </ButtonCustom>
        </View>
      </View>
    </View>
  );
};

export default Index;
