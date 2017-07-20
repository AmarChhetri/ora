import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Card, CardSection } from '../../common';
import styles from '../styles';


let currentTime = new Date().getTime();



class FavouriteOrderedItem extends Component {
  render() {
    const { id, restroName, items, price, order_again} = this.props.favouriteOrderedItem;
    var navigator = this.props.navigator;
    return (
      <Card>

        <CardSection>
          <View style={{flex: 1}}>
            <View style={styles.restroNamePrice}>
              { restroName  && <Text style={styles.restroName}>{restroName}</Text>}
              { !restroName  && <Text style={styles.restroName}>Shopping</Text>}
              <Text style={styles.price}>₹ {price}</Text>
            </View>

            <Text style={[styles.items]}>{ items } </Text>
          </View>
        </CardSection>

        <CardSection style={{paddingLeft:0, paddingRight:0, justifyContent: 'center', paddingBottom: 20}}>
           <TouchableOpacity style ={{ borderWidth:1, borderColor: 'rgba(0,120,60,0.7)', paddingLeft:12, paddingRight: 12, paddingTop: 5, paddingBottom: 5}}
              onPress={ () => this.props.orderAgainAndReroute(order_again,restroName)}
              >
             <Text style={{color: 'rgba(0,120,60,0.7)'}}> REORDER</Text>
           </TouchableOpacity>
        </CardSection>
      </Card>
    );
  }

}

export default FavouriteOrderedItem;
