import React from "react";
import { AppState, Button, StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackgroundTimer from "react-native-background-timer";
import NetInfo from "@react-native-community/netinfo";
import { startWalk, clearActionQueue } from "../store/actions";

export default function Home() {
  const appState = React.useRef(AppState.currentState);

  const dispatch = useDispatch();
  const { actionQueue } = useSelector(({ network }) => network);
  const onStartPress = () => dispatch(startWalk());

  const handleAppStateChange = React.useCallback(
    (nextAppState) => {
      if (
        appState.current.match(/inactive|active/) &&
        nextAppState === "background"
      ) {        
        if (actionQueue.length) {          
          BackgroundTimer.runBackgroundTimer(() => {
            NetInfo.fetch().then((state) => {              
              if (state.isConnected) {                
                actionQueue.forEach((action) => dispatch(action));
                dispatch(clearActionQueue());
                BackgroundTimer.stopBackgroundTimer();
              }
            });
          }, 3000);
        }
      }

      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        BackgroundTimer.stopBackgroundTimer();
      }

      appState.current = nextAppState;
    },
    [actionQueue]
  );

  React.useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, [handleAppStateChange]);

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
