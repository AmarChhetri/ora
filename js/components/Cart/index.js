import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, Image, View, Dimensions, TouchableOpacity, TextInput, ListView, ScrollView } from 'react-native';
import Header from '../Header/';
import CardView from 'react-native-cardview';
import EmptyCart from './emptycart';
import DropdownAlert from 'react-native-dropdownalert';
import { Spinner } from "../common/";
import { setActiveTab } from '../../actions/tab';
import { updateQtyIncrease, removeFromCart, requestCoupon, removeAndClear, requestReorderFood } from '../../actions/cart';
import Icon from "react-native-vector-icons/FontAwesome";
import styles from './styles';


class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      noitemView:false,
      coupon:null,
      success:false,
    }
  }
  componentDidMount(){
    const { item } = this.props;
    if (item !== undefined) {
      this.props.requestReorderFood(item);
    }
    if (this.props.coupon.found) {
      this.setState({
        error:false,
        success:true,
        successMessage:"Coupon applied successfully",
      })
    }
    else if (this.props.coupon.error) {
      this.setState({
        error:true,
        errorMessage:"Invalid coupon",
      })
    }

  }

  componentWillUnmount(){
    const { from } = this.props;
    if (from === 'fav-orders') {
      this.props.removeAndClear();
    }
  }

  goBack(){
    const { navigator } = this.props;
    navigator.pop()
  }
  componentWillReceiveProps(props){
    const { error, errorMsg } = props.cart.appStateForFoodBag;
    if (error && (errorMsg !== null)) {
      //this.refs.toast.show(errorMsg,1000);
      this.dropdown.alertWithType('error', 'Error', errorMsg);
    }
    if (props.cart.restroId === null || props.cart.restroId === undefined) {
      this.setState({
        noitemView:true
      })
    }
    if (props.coupon.found) {
      this.setState({
        error:false,
        success:true,
        successMessage:"Coupon applied successfully",
      })
    }
    else if (props.coupon.error) {
      this.setState({
        error:true,
        errorMessage:"Invalid coupon",
      })
    }
  }
  //
  // Select location for DELIVERY
  //
  gotoSelectAddress(){
    const { error, errorMsg } = this.props.cart.appStateForFoodBag;
    if (error && (errorMsg !== null)) {
      // this.refs.toast.show(errorMsg,1000);
      this.dropdown.alertWithType('error', 'Error', errorMsg);
      return ;
    }
    if (this.props.user === null || this.props.user === undefined) {
      this.gotoLogin();
      return ;
    }
    this.props.navigator.push({
      id:'select-address',
      from:'food'
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
        <View style={styles.listitem}>
          <View style={styles.listItemTitle}>
            <Text style={{fontSize:16}}>{data.name}</Text>
          </View>
          <View style={styles.divider2}/>
          <View style={styles.listItemDetails}>
            <View style={styles.listItemLeft}>
                <Text style={styles.price}>₹ {data.price}</Text>
            </View>
            <View style={styles.listItemMid}>
              <TouchableOpacity
                style={styles.controlButtonStyle}
                onPress={()=>this.props.removeFromCart(this.props.cart.restroId, data.id)}
              >
                <Icon name="minus" style={styles.controllIcon}/>
              </TouchableOpacity>
                <Text>{data.qty}</Text>
              <TouchableOpacity
                style={styles.controlButtonStyle}
                onPress={()=>this.props.updateQtyIncrease( data.id )}
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

  applyCoupon(){
    if (this.state.coupon === null || this.state.coupon == "") {
      this.setState({
        error:true,
        errorMessage: "Coupon cannot be blank"
      })
    }else if (this.props.user === null || this.props.user === undefined) {
      this.gotoLogin();
    }else if (this.state.coupon !== null || this.state.coupon !== "") {
        this.props.requestCoupon(this.state.coupon);
    }
  }


  renderCouponButton(){
    const coupon = this.props.coupon;
    if ( coupon.isFetching ) {
      return (
        <View style={{padding:15}}>
            <Spinner size="small"/>
        </View>
      )
    }
    return (
      <TouchableOpacity
        onPress={()=>this.applyCoupon()}
      >
          <Text style={styles.couponIcon}>Apply</Text>
      </TouchableOpacity>
    )
  }
  renderMain(cartObject) {
    if (this.state.noitemView) {
      return <EmptyCart />
    }
    return(
      <View style={styles.mainContainer}>
        <ScrollView style={styles.mainBlock}>
          <View style={styles.detailsBlock}>
            <View style={styles.restroNameSection}>
              <Text style={styles.restroName}>{cartObject.restroName}</Text>
            </View>
             { this.renderResults(cartObject.cartItem) }
             <View style={styles.divider}/>
             <View style={styles.showErrorSuccessSection}>
               {
                 this.state.error
                 &&
                 <Text style={{color:"#e74c3c", padding:15}}>{this.state.errorMessage}</Text>
               }
               {
                 this.state.success
                 &&
                 <Text style={{color:"green", padding:15}}>{this.state.successMessage}</Text>
               }
             </View>
             {
               (cartObject.deductions === 0)
               &&
               <View style={styles.couponButton}>
                 <View style={{borderBottomColor: '#e3e3e3', borderBottomWidth: 1, marginLeft: 5,}}>
                  <TextInput
                    placeholder={"Enter coupon"}
                    autoCapitalize={"characters"}
                    underlineColorAndroid={"transparent"}
                    style={styles.couponTextField}
                    onChangeText={(text)=>this.setState({coupon:text})}
                    onFocus={()=>this.setState({error:false})}
                    onSubmitEditing={() => this.applyCoupon()}
                  />
                </View>

                  {
                    this.renderCouponButton()
                  }
               </View>
             }
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
              <View style={{flexDirection:"row", justifyContent: "space-between", padding:15,paddingBottom:2}}>
                <Text style={{flex:0.7}}>Packing Charges</Text>
                <Text>₹ </Text>
                <Text>{cartObject.additions.packing_charge}</Text>
              </View>
              <View style={{flexDirection:"row", justifyContent: "space-between", padding:15,paddingBottom:25}}>
                <Text style={{flex:0.7}}>Deductions</Text>
                <Text>₹ </Text>
                <Text>{cartObject.deductions}</Text>
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
    const { cart } = this.props;
    return (
      <View style={styles.container}>
        <Header
        style={styles.topbar}
        onBack={()=>this.goBack()}
        title={"Cart"}
        />
          {
            this.renderMain( cart)
          }
        {/*<Toast
          ref="toast"
          position={'center'}
          // positionValue={200
        />*/}
        <DropdownAlert
        ref={(ref) => this.dropdown = ref} 
        />
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    cart:state.cart,
    coupon: state.coupon,
    user: state.user.user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setActiveTab:(tab)=>dispatch(setActiveTab(tab)),
    updateQtyIncrease:(id)=>dispatch(updateQtyIncrease(id)),
    requestCoupon:(couponCode)=>dispatch(requestCoupon(couponCode)),
    removeFromCart:(restroId,id)=>dispatch(removeFromCart(restroId,id)),
    requestReorderFood:(restroId)=> dispatch(requestReorderFood(restroId)),
    removeAndClear:()=>dispatch(removeAndClear()),
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(Cart);
