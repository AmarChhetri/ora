import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ color, size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator
        animating={true}
        color={color || "#00E676"}
        size={size || 'large'}/>
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export { Spinner };
