import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function StartButton() {
  return (
    <View style={styles.container}>
      <Text>Start</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
