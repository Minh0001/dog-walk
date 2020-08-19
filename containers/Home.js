import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { startWalk } from "../store/actions";

export default function Home() {
  const dispatch = useDispatch();
  const { actionQueue } = useSelector(({ network }) => network);
  console.log(actionQueue);
  const onStartPress = () => dispatch(startWalk());

  return (
    <View style={styles.container}>
      <Button
        title="Start"
        onPress={onStartPress}
        accessibilityLabel="Start dog walk"
      />
      <View style={styles.queue}>
        <Text>Actions Queue</Text>
        {actionQueue.map((item, index) => (
          <Text style={styles.queueItem} key={`${item.type}-${index}`}>
            {item.type}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  queue: {
    position: "absolute",
    bottom: 50,
  },
});
