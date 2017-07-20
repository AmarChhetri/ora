import React, { Component } from 'react';
import { View,ScrollView, Text, Alert, InteractionManager, Image } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../common';
import { favouriteOrderedListFetch } from '../../actions';
import { removeAndClearShoppingBag } from '../../actions/shopping-bag';
import { addOrderAgain, replaceAndClear } from '../../actions/cart';
import FavouriteOrderedItem from './components/FavouriteOrderedItem';
import CardView from 'react-native-cardview';
import styles from './styles';

class FavouriteOrderedList extends Component {

  constructor(props){
    super(props);
    this.state={
      activeLocalTab:null,
    }
  }

  componentWillUnMount(){
    this.setState({
      activeLocalTab:null
    })
  }


  render() {
    const { isLoading, cart, shoppingBag } = this.props;
    // console.log("the cart and shoppingBag is", cart, shoppingBag);
    if(isLoading) {
     return (<Spinner size="large" />);
    }
    if (this.props.favouriteOrderedList === undefined || this.props.favouriteOrderedList === null) {
      return (
          <View style={[styles.topGuest, {justifyContent:"center"}]}>
            <Image
              style={{width:200, height: 200}}
              source={require('../../../assets/no-orders.png')}
              />

              <Text style={[styles.guestAdviceText,{marginTop:10, fontSize:18}]}>NO FAVOURITE ORDERS</Text>
          </View>
      )
    }
 		return (
      <ScrollView>
        <View style={{marginTop: 10}}>
          {this.renderFavouriteOrderedItems()}
        </View>
      </ScrollView>
 		);
 	}

  showPrompt(item,restroName, extra){
    Alert.alert(
        "You can order from only one restaurant",
        "Clear all card items",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Clear", onPress: () => this.replaceAndCleartheCart(item,restroName, extra) },
        ])
  }

  showPromptShop(item){
    Alert.alert(
        "You have items in shopping bag",
        "Clear all card items",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Clear", onPress: () => this.replaceAndCleartheCart(item) },
        ])
  }

  replaceAndCleartheCart(item,restroName, extra){
    if (restroName === undefined) {
      this.props.removeAndClearShoppingBag();
      this.props.navigator.push({
        id: 'cart-shop',
        item: item.cartItem,
        from: 'fav-orders'
      });
      return ;
    }
    this.props.replaceAndClear(item,restroName, extra);
    this.props.navigator.push({
      id: 'cart',
      item: item.restroId,
      from: 'fav-orders'
    });
  }

  orderAgainAndReroute(item, restroName, type, additional_charges){
    const { cart, shoppingBag } = this.props;

    if (type === 'food') {
      if (cart.cartItem.length !== 0) {
        this.showPrompt(item,restroName, additional_charges);
        return ;
      }
      this.props.addOrderAgain(item,restroName, additional_charges);
      this.props.navigator.push({
        id: 'cart',
        item: item.restroId,
        from: 'fav-orders'
      });
    }
    else if (type === 'shop') {
      if (shoppingBag.cartItem.length !== 0) {
        this.showPromptShop(item);
        return ;
      }
      this.props.removeAndClearShoppingBag();
      this.props.navigator.push({
        id: 'cart-shop',
        item: item.cartItem,
        from: 'fav-orders'
      });
    }
  }

  renderFavouriteOrderedItems() {
    return this.props.favouriteOrderedList.map( (favouriteOrderedItem, index) => {
        const { vat, delivery_charge } = favouriteOrderedItem;
        const additional_charges = {
          vat: vat,
          delivery_charge: delivery_charge
        };
        
        var orderType = (favouriteOrderedItem.type == 1) ? 'food':'shop' ;
        return(
          <CardView style={{ marginBottom: 5,}} key={index} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
            <FavouriteOrderedItem
              orderAgainAndReroute={(item,restroName)=>this.orderAgainAndReroute(item,restroName, orderType, additional_charges)}
              favouriteOrderedItem={favouriteOrderedItem}
              navigator={this.props.navigator} />
          </CardView>
        );
      }
    );
  }
}



const mapStateToProps = (state) => {
  const {isLoading, favouriteOrderedData } =  state.orders.favouriteOrderedObj;

  return {
     isLoading,
     status: favouriteOrderedData.status,
     favouriteOrderedList: favouriteOrderedData.data,
     cart:state.cart,
     shoppingBag:state.shoppingBag,
     activeOrderTab:state.orders.activeOrderTab
  }
};

function mapDispatchToProps (dispatch) {
  return {
    addOrderAgain: (item,restroName, extra) => dispatch(addOrderAgain(item,restroName, extra)),
    replaceAndClear: (item, restroName, extra) => dispatch(replaceAndClear(item, restroName, extra)),
    removeAndClearShoppingBag: () => dispatch(removeAndClearShoppingBag())
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(FavouriteOrderedList);
