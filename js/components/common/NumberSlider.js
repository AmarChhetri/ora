import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class NumberSlider extends Component {
  constructor(props){
    super(props);
    this.state = {
    currentValue: this.props.value,
    id: "2"
  };
  }

  increaseNumber() {
     let newValue = this.state.currentValue + 1;
     this.setState({currentValue: newValue});
     this.props.onChangeQuantity(this.props.itemId, newValue);
  }

  decreaseNumber() {
    if(this.state.currentValue > 1) {
      let newValue = this.state.currentValue - 1;
      this.setState({currentValue: newValue});
      this.props.onChangeQuantity(this.props.itemId, newValue);
    }
  }

  render(){
    const { buttonStyle, iconStyle } = styles;
    return(
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={buttonStyle} onPress={this.increaseNumber.bind(this)}>
          <Icon name="plus" style={[this.props.style, iconStyle]} />
        </TouchableOpacity>
        <Text> { this.state.currentValue } </Text>
        <TouchableOpacity style={buttonStyle} onPress={this.decreaseNumber.bind(this)}>
          <Icon name="minus" style={[this.props.style, iconStyle]} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderColor: "silver",
    borderWidth:1,
    margin:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    textAlign: 'center',
    color:'silver',
    fontSize:10,
  }
};

export default NumberSlider;
