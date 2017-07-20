import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, Image, View, Dimensions, TouchableOpacity, TextInput, ListView, ScrollView } from 'react-native';
import Header from '../Header/';
import EmptyCart from './emptycart';
import { Spinner } from "../common/";
import { setActiveTab } from '../../actions/tab';
import DropdownAlert from 'react-native-dropdownalert';
import { checkQTYandIncreaseQTY, decreaseQTY, removeAndClearShoppingBag, requestReorder } from '../../actions/shopping-bag';
import Icon from "react-native-vector-icons/FontAwesome";
import styles from './styles';
import { find } from 'lodash';
import CardView from 'react-native-cardview';


class CartShop extends Component {
  constructor(props){
    super(props);
    this.state = {
      noitemView:false,
    }
  }
  componentDidMount(){
    const { item } = this.props;
    if (item !== undefined) {
      const cartItemToPost = {
        cartItem: [ ...item]
      }

      this.props.requestReorder(cartItemToPost);
    }
  }
  componentWillUnmount(){
    const { from } = this.props;
    if (from === 'fav-orders') {
      this.props.removeAndClearShoppingBag();
    }
  }
  goBack(){
    const { navigator } = this.props;
    navigator.pop()
  }
  componentWillReceiveProps(props){
    const { appStateForShoppingBag , cartItem } = props.shoppingBag;
    const { error, productId, subCategoryId, errorMsg } = appStateForShoppingBag;
    const foundObject = find(cartItem, item=>(item.id == productId) && (item.subcategory_id == subCategoryId));
    if (error && foundObject)
      this.dropdown.alertWithType('error', 'Error', `Only ${foundObject.qty} items available in stock`);
    else if (error && (errorMsg !== null)) {
      this.dropdown.alertWithType('error', 'Error', errorMsg);
    }
  }
  //
  // Select location for DELIVERY
  //

  onIncreaseQTY(data){
    const objToCheck = {
      productId:data.id,
      subCategoryId: data.subcategory_id
    }
    this.props.checkQTYandIncreaseQTY(objToCheck, data.qty);
  }

  onDecreaseQTY(data){
    const objToDecreaseQTY = {
      productId:data.id,
      subCategoryId: data.subcategory_id
    }
    this.props.decreaseQTY(objToDecreaseQTY,data.qty);
  }
  gotoSelectAddress(){
    if (this.props.user === null || this.props.user === undefined) {
      this.gotoLogin();
      return ;
    }
    this.props.navigator.push({
      id:'select-address',
      from:'shop'
    })

  }

  gotoLogin(){
    this.props.setActiveTab('profile');
    this.props.navigator.push({
      id:'tabs',
    })
  }
  gotoRestroHome(id, img){
    this.props.navigator.push({
      id:'restro-home',
      restroId:id,
      img:img
    })
  }

  renderResults(arrayOfItems){

    return arrayOfItems.map((data, index)=>{
      return(
        <CardView
         key={index}
         cardElevation={3}
         cardMaxElevation={3}
         cornerRadius={5}
        >
          <View key={index} style={styles.listitem}>
            <View style={styles.listItemTitle}>
              <Text style={{fontSize:16}}>{data.name} ({data.subcategory})</Text>
            </View>
            <View style={styles.divider2}/>

            <View style={styles.listItemDetails}>
              <View style={styles.listItemLeft}>
                  <Text style={styles.price}>{data.price}</Text>
              </View>
              <View style={styles.listItemMid}>
                <TouchableOpacity
                  style={styles.controlButtonStyle}
                  onPress={()=>this.onDecreaseQTY(data)}
                >
                  <Icon name="minus" style={styles.controllIcon}/>
                </TouchableOpacity>
                  <Text>{data.qty}</Text>
                <TouchableOpacity
                  style={styles.controlButtonStyle}
                  onPress={()=>this.onIncreaseQTY( data )}
                >
                  <Icon name="plus" style={styles.controllIcon}/>
                </TouchableOpacity>
              </View>
              <View style={styles.listItemRight}>
                  <Text style={styles.price}>₹ {data.qty*data.price}</Text>
              </View>
            </View>
          </View>
        </CardView>
      )
    })
  }

  renderMain(cartObject, requesting) {
    if (requesting) {
      return <Spinner />;
    }else if (cartObject.cartItem.length === 0) {
      return <EmptyCart />
    }
    return(
      <View style={styles.mainContainer}>
        <ScrollView style={styles.mainBlock}>
          <View style={styles.detailsBlock}>
            <View style={styles.restroNameSection}>
              <Text style={styles.restroName}>CART DETAILS</Text>
            </View>
             { this.renderResults(cartObject.cartItem) }
             <View style={styles.divider}/>
             <View style={styles.totalPriceSection}>
              <View style={{flexDirection:"row", justifyContent: "space-between", padding:10, paddingLeft: 15}}>
                <Text style={{fontWeight:'bold',flex:0.7}}>Total</Text>
                <Text>₹</Text>
                <Text>{cartObject.total_price}</Text>
              </View>
              <View style={{flexDirection:"row", justifyContent: "space-between", padding:15,paddingBottom:2}}>
                <Text style={{flex:0.7}}>Taxes</Text>
                <Text>₹</Text>
                <Text>{cartObject.additions.vat}</Text>
              </View>
              <View style={{flexDirection:"row", justifyContent: "space-between", padding:15,paddingBottom:2}}>
                <Text style={{flex:0.7}}>Delivery charges</Text>
                <Text>₹ </Text>
                <Text>{cartObject.additions.delivery_charge}</Text>
              </View>
             </View>
          </View>
        </ScrollView>
        <View style={styles.bottombar}>
          <View
            style={styles.addAddressLeftButton}
            >
            <Text style={styles.buttonText}>GRAND TOTAL: ₹{cartObject.payable_price}</Text>
          </View>
          <TouchableOpacity
            style={styles.addAddressRightButton}
            onPress={()=>this.gotoSelectAddress()}
            >
            <Text style={styles.buttonText}>
              CHECKOUT
            </Text>
            <Icon style={styles.checkoutIcon} name="chevron-right" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render() {
    const { shoppingBag } = this.props;
    const { appStateForShoppingBag } = shoppingBag;
    return (
      <View style={styles.container}>
        <Header
        style={styles.topbar}
        onBack={()=>this.goBack()}
        title={"Cart"}
        />
          {
            this.renderMain( shoppingBag, appStateForShoppingBag.requesting)
          }
        <DropdownAlert
        ref={(ref) => this.dropdown = ref} 
        />
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    shoppingBag:state.shoppingBag,
    user: state.user.user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setActiveTab:(tab)=>dispatch(setActiveTab(tab)),
    checkQTYandIncreaseQTY:(obj,qty)=>dispatch(checkQTYandIncreaseQTY(obj,qty)),
    decreaseQTY:(dobj,qty)=>dispatch(decreaseQTY(dobj,qty)),
    requestReorder:(item)=> dispatch(requestReorder(item)),
    removeAndClearShoppingBag:()=>dispatch(removeAndClearShoppingBag())
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(CartShop);
