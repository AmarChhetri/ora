import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Button = ({ onPress, children, style, childrenStyle, showIndicator}) => {
  const { buttonStyle, textStyle , indicator } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={[textStyle, childrenStyle]}>
        {children}
      </Text>
      {
        showIndicator &&
        <View style={indicator}/>
      }
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: "rgba(0,120,60,0.5)"
  },
  indicator:{
    width:100,
    height:2,
    backgroundColor: 'black'
  }
};

export { Button };
