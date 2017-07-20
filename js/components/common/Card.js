import React from 'react';
import { View } from 'react-native';
import CardView from 'react-native-cardview';


const Card = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
        {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    marginRight: 10,
    backgroundColor: '#FCFCFC',
  }
};

export { Card };
