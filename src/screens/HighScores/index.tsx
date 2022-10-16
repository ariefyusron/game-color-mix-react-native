import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { Header } from "../../components";
import { Reducers } from "../../redux/types";

import styles from "./styles";

const Index = () => {
  const persistStore = useSelector((state: Reducers) => state.persist);

  return (
    <>
      <Header title="High Scores" />
      <View style={styles.container}>
        <Text style={styles.title}>High Scores</Text>

        <FlatList
          data={persistStore.listScore
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={() => (
            <View style={styles.wrapEmpty}>
              <Text>Kosong</Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View style={styles.wrapTextNumber}>
                <Text style={styles.textNumber}>{index + 1}</Text>
              </View>
              <View>
                <Text style={styles.text}>{item.username}</Text>
                <Text style={styles.text}>{item.score}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default Index;
