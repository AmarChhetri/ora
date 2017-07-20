import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class EmptyCart extends Component {
  render(){
    return(
          <View style={styles.profile}>
            <View style={styles.topGuest}>
              <Image
                style={{width:180, height: 180}}
                // style={styles.userPicStyle}
                source={require('../../../assets/nothing-in-cart.png')}
                />
            </View>
            <View style={styles.middleGuest}>
              <Text style={styles.guestOopsText}>Oops! You cart is empty</Text>
              <Text style={[styles.guestAdviceText,{textAlign:"center"}]}>PLEASE ADD ITEMS TO YOUR CART</Text>
            </View>
          </View>
    );
  }
}


module.exports = EmptyCart
