import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { Dimensions, Text, Image, View, TouchableOpacity, ScrollView, Alert, InteractionManager } from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Header from '../Header/'
import { Product, Spinner } from '../common';
import { fetchMenu, clearMenuReducers } from '../../actions/restaurant';
import { addToCart, removeFromCart, removeAndClear } from '../../actions/cart';
import styles from './styles';

const { width } = Dimensions.get("window");

class RestaurantHome extends Component {
  constructor(props){
    super(props);
    this.state={
      fetching: false,
      restroId: null,
      restaurantObject : null,
      avatar:null,
      showPrompt: false,
    }
  }
  componentDidMount(){
    const restroId = this.props.restroId;
    const menuId = this.props.menuId;
    this.setState({avatar:this.props.img, restroId: restroId, closed: this.props.status === 'CLOSED'?true:false})
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchMenu(menuId);
    });
  }

  componentWillUnmount(){
    this.props.clearMenuReducers();
  }
  componentWillReceiveProps(props){
     if (props.restaurantObject.menu) {
       this.setState({
         restaurantObject: props.restaurantObject.menu
       })
     }

  }

  showPrompt(){
    Alert.alert(
        "You can order from only one restaurant",
        "Clear all cart items",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Clear", onPress: () => this.props.removeAndClear() },
        ])
  }
  //
  // Render product view
  //
  //
  renderProduct(productItem, color){
    const cartItem = this.props.cartItem
    return productItem.map((item, index)=>{
      let numberOfItems = 0;
      filter(cartItem, function(o) {
        if (o.id === item.id) {
          numberOfItems = o.qty;
        }
      });
      const cartItemCheck = this.props.cart.restroId !== null && this.state.restroId !== this.props.cart.restroId
      if (!item.avail) {
        return (
            <Product
              key={index}
              title={item.title}
              style={[styles.productView,{backgroundColor:"rgba(0,0,0,0.1)"}]}
              childrenStyle={styles.productTextStyle}
              price={item.price}
              hideButtons={this.state.closed}
              color={color}
              numberOfItems={this.state.restroId !== this.props.cart.restroId ? 0 : numberOfItems}
              notAvailable = {true}
              desc={item.desc}
              onPlus={()=> console.log()}
              onMinus={()=> console.log()}
              />
        );
      }
      return(
          <Product
            key={index}
            title={item.title}
            style={styles.productView}
            childrenStyle={styles.productTextStyle}
            hideButtons={this.state.closed}
            price={item.price}
            color={color}
            numberOfItems={this.state.restroId !== this.props.cart.restroId ? 0 : numberOfItems}
            desc={item.desc}
            onPlus={()=> cartItemCheck ? this.showPrompt() :
              this.props.addToCart(this.state.restroId,this.props.restaurantObject.menu, item.id, item.title, item.price)}
            onMinus={()=>this.props.removeFromCart(this.state.restroId, item.id)}
            />
      );
    })
  }
  // Render Items List
  //
  renderItemList(itemList){
    return itemList.map((product, index)=>{
      let colorPill = 'red';
      if (product.item_category === 0) {
        colorPill = 'green';
        return this.renderProduct(product.items, colorPill);
      }
      return this.renderProduct(product.items, colorPill);
    })
  }
  renderItems(item){
    if (item.type === 0) {
      return(
        <View style={styles.categoryView}>
          {
            this.renderItemList(item.items)
          }
        </View>
      )
    }
    return item.sub_categories.map((item, index)=>{
      return(
        <View key={index} style={styles.categoryView}>
          <Text style={styles.categoryHeader}>{item.title}</Text>
          {
            this.renderItemList(item.category_list)
          }
        </View>
      );
    })
  }

  //
  // Render Menu tab
  //

  renderMenuTabs(menuArray){
      return menuArray.menu.map((category,index)=>{
        return(
          <View key={index} tabLabel={category.title.toUpperCase()}>
            {this.renderItems(category)}
          </View>
        );
      })
  }
  render() {
    const restaurantObject = this.props.restaurantObject;
    if (restaurantObject.isFetching || restaurantObject.isInit ) {
      return(
        <View style={styles.container}>
          <Header
            onBack={()=>this.props.navigator.pop()}
            style={styles.topbar}
            title={restaurantObject.menu.title || '...'}
            showCart={true}
            navigator={this.props.navigator}
            />
          <View style={[styles.container]}>
            <Spinner size="large" />
          </View>
       </View>);
    }
    return(
      <View style={styles.container}>
        <Header
          onBack={()=>this.props.navigator.pop()}
          style={styles.topbar}
          title={restaurantObject.menu.title}
          showCart={true}
          navigator={this.props.navigator}
          />
        <ScrollView style={styles.mainBlock}>
          <View style={styles.imageView}>
          <Image
            style={styles.imageStyle}
            resizeMode={'stretch'}
            source={{uri: `${this.state.avatar}`}}
            >
            {
              this.state.closed
              &&
              <View style={[styles.imageStyle, { backgroundColor: 'rgba(0,0,0,0.5)'}]}>
                  <View
                    style={{
                      backgroundColor:"rgba(255,0,0,0.7)",
                      position:'absolute',
                      borderRadius:3,
                      padding:3,
                      bottom:15,
                      left:width-70,
                    }}
                    >
                    <Text style={styles.closedText}>CLOSED</Text>
                  </View>
              </View>
            }
          </Image>
          </View>
            {/* {
              this.state.showPrompt
              &&

            } */}
          <ScrollableTabView
              style={{marginTop: 0,padding:0, backgroundColor: '#FCFCFC' }}
              initialPage={0}
              locked={false}
              tabBarTextStyle={{color:'#757575', fontFamily: 'Gill Sans'}}
              tabBarUnderlineStyle={{backgroundColor:'#00E676', height:2}}
              renderTabBar={() => <ScrollableTabBar />}
            >
                {this.renderMenuTabs(restaurantObject.menu.menu)}
          </ScrollableTabView>
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    restaurantObject: state.restaurant,
    cartItem: state.cart.cartItem,
    cart: state.cart,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMenu:(id)=>dispatch(fetchMenu(id)),
    addToCart:(restroId,restroObject,id,name,price)=>dispatch(addToCart(restroId,restroObject,id,name,price)),
    removeFromCart:(restroId,id)=>dispatch(removeFromCart(restroId,id)),
    removeAndClear:()=>dispatch(removeAndClear()),
    clearMenuReducers:()=>dispatch(clearMenuReducers()),
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(RestaurantHome);
