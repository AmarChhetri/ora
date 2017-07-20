import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, TouchableOpacity } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ShoppingCart } from "../common/";
import styles from "./styles";

class Header extends Component {
  render() {
    const { shoppingBag } = this.props;
    const { activeHomepage } = this.props.tab;
    const nextGoId = activeHomepage === 'food' ? 'cart' : 'cart-shop';
    const number = activeHomepage === 'food' ? this.props.cart.size : shoppingBag.size;
    if (number <= 0) {
      return(
        <View style={styles.toolbar}>
         <TouchableOpacity style={styles.toolbarButton} onPress={this.props.onBack}>
          {
            !this.props.hideBack
            &&
            <MaterialIcon name="arrow-back" style={styles.backIcon} />
          }
         </TouchableOpacity>
          <View style={styles.toolbarTitle}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={[styles.headerText,styles.italicText]}>
              {this.props.title}
            </Text>
          </View>
          <View style={styles.toolbarRight}>
            {
              (this.props.showCart !==undefined && this.props.showCart)
              &&
              <ShoppingCart
                tab={activeHomepage}
                left={2}
                cartStyle={styles.cartStyle} />
            }
          </View>
        </View>
      )
    }
    return (
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={this.props.onBack}>
          {
            !this.props.hideBack
            &&
            <MaterialIcon name="arrow-back" style={styles.backIcon} />
          }
        </TouchableOpacity>
        <View style={styles.toolbarTitle}>
          <Text style={[styles.headerText,styles.italicText]}>{this.props.title}</Text>
        </View>
        <View style={styles.toolbarRight}>
        {
          (this.props.showCart !==undefined && this.props.showCart)
          &&
            <ShoppingCart
              onCartClick={()=>this.props.navigator.push({id:nextGoId})}
              tab={activeHomepage}
              numberOfItemsInCart={number}
              left={2}
              cartStyle={styles.cartStyle} />
        }
        </View>
      </View>
      );
  }
}

function mapStateToProps (state) {
  return {
    cart:state.cart,
    shoppingBag:state.shoppingBag,
    tab:state.tab
  }
}


module.exports = connect(mapStateToProps, null)(Header);
