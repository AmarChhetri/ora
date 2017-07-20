import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardView from 'react-native-cardview';
import { Text, Image, View, TouchableOpacity, ScrollView, InteractionManager } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { openDrawer } from '../../actions/sidebar';
import { ShoppingCart } from "../common/";
import { fetchCuisines, fetchRestaurant, fetchBestInTown, fectchBanners } from '../../actions/homepage';
import Cuisines from './sub-components/cuisines';
import Restaurants from './sub-components/restaurants';
import BestInTown from './sub-components/bestintown';
import Banner from './sub-components/banner';
import Search from '../SearchApp/';
import styles from './styles';


class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      location: '',
      showSearch: false,
      number:0
    }
  }

  //
  // Before the component mounts
  //
  componentDidMount(){
    this.setState({
      number: this.props.cartSize
    })
   InteractionManager.runAfterInteractions(() => {
      this.props.fectchBanners();
      this.props.fetchBestInTown();
      this.props.fetchRestaurant();
      this.props.fetchCuisines();
    });
  }

  //
  // Deals with component receiving props, i.e state changes
  //
  componentWillReceiveProps(props){
    if (props.cartSize > 0 ) {
      this.setState({
        number: props.cartSize
      })
    }
    else if (props.cartSize === 0) {
      this.setState({
        number:0
      })
    }
    if (props.location) {
      const locationText = props.location.name.split(',')
      const locationConcatText = locationText[0]+','+locationText[1];
      if (locationConcatText.length < 26) {
        this.setState({
          location:locationConcatText  ,
        })
      }else {
        this.setState({
          location:locationConcatText.slice(0, 25)+' ...' ,
        })
      }
    }
  }

  //
  // Goto BestInTown
  //
  gotoBestInTownHome(id, title){
    this.props.navigator.push({
      id:'best-in-town-home',
      bestId:id,
      title:title
    })
  }
  //
  // Goto Select location
  //
  gotoSelectLocation(){
    this.props.navigator.push({id:'select-location'})
  }
  //
  // Go to menu list
  //
  gotoRestroHome(id,menu,img,status){
    this.props.navigator.push({
      id:'restro-home',
      restroId:id,
      menuId:menu,
      img:img,
      status:status,
    })
  }
  //
  // Go to list of cuines
  //
  gotoCuisineHome(id,cuisine){
    this.props.navigator.push({
      id:'cuisine-home',
      cuisineId:id,
      cuisine:cuisine
    })
  }

  //
  // Go to Cart
  //
  gotoCartHome(cuisine){
    this.props.navigator.push({
      id:'cart',
    })
  }

  //
  // Go to Cart
  //
  gotoRestroList(){
    this.props.navigator.push({
      id:'restro-list',
    })
  }

  renderCart(){
    return(
      <ShoppingCart
      onCartClick={()=>this.gotoCartHome()}
      tab={this.props.tab}
      numberOfItemsInCart={this.state.number}/>);
  }
  //
  // Render main section
  //
  renderMainSection(){
    if (this.state.showSearch) {
      return <Search navigator={this.props.navigator}/>
    }
    return(
      <View>
        { this.renderSwiper() }
        <BestInTown
          gotoBestInTownHome={(id, title)=>this.gotoBestInTownHome(id, title)}
          data={this.props.bestintown}
          />
        <View style={styles.cardsHeader}>
          <Text style={styles.cardsHeaderText}>NEW & HOT</Text>
        </View>
        <Restaurants
          restaurant={this.props.restaurant}
          gotoRestroList={()=>this.gotoRestroList()}
          gotoRestroHome={(id,menu,img,status)=>this.gotoRestroHome(id,menu,img,status)}
          />
        <View style={styles.cardsHeader}>
          <Text style={styles.cardsHeaderText}>CATEGORIES</Text>
        </View>
        <Cuisines
          cuisine={this.props.cuisine}
          gotoCuisineHome={(menu,cuisineName)=>this.gotoCuisineHome(menu, cuisineName)}
          />
      </View>
    );
  }

  renderTopbarIcon(){
    if (this.state.showSearch) {
      return (
        <TouchableOpacity
          onPress={()=>this.setState({showSearch:false})}
          style={styles.leftTopbar}
        >
          <Icon style={styles.menuIcon} name="arrow-back" size={24} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={()=>this.props.openDrawer()}
        style={styles.leftTopbar}
      >
        <Icon style={styles.menuIcon} name="menu" size={24} />
      </TouchableOpacity>
    );
  }
  //
  // Main render fn
  //
  render() {
    //console.log(this.props.connectionStatus);
    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          {
            this.renderTopbarIcon()
          }
          <TouchableOpacity
            onPress={()=>this.gotoSelectLocation()}
            style={[styles.midTopbar]}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={[styles.locationText]}>
              {this.state.location}
            </Text>
            <Icon style={styles.chevronIcon} name="keyboard-arrow-down" />
          </TouchableOpacity>
          <View style={[styles.rightTopbar]}>
            <View style={{marginRight:0,  height:30}}>
                { this.renderCart() }
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollbar}>
          {
            !this.state.showSearch
            &&
            <CardView
              style={{marginTop: 5}}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={2}
            >
            <View style={{ borderRadius: 2}} >

                <TouchableOpacity
                  style={styles.searchBox}
                  onPress={()=>this.setState({showSearch:true})}
                  >
                    <Icon name="search" size={24} style={{paddingLeft: 10, paddingBottom: 10}}/>
                    <Text style={styles.searchBoxText}>Search cuisines, restaurants</Text>
                </TouchableOpacity>

            </View>
            </CardView>
          }
          {
            this.renderMainSection()
          }
        </ScrollView>
      </View>
    );
  }

  //
  // Render Swiper
  //
  renderSwiper(){
    const dotStyle = <View style={styles.dotStyle} />
    const dotActiveStyle = <View style={styles.dotActiveStyle} />
    return(
      <Banner
        data={this.props.banners}
        dotStyle={dotStyle}
        dotActiveStyle={dotActiveStyle}
        />
    );
  }
}
function mapStateToProps (state) {
  return {
    banners: state.banners,
    bestintown: state.homepage.bestintown,
    restaurant: state.homepage.restaurant,
    cuisine: state.homepage.cuisine,
    location: state.location.activeLocation,
    cartSize:state.cart.size,
    cart:state.cart,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openDrawer:()=>dispatch(openDrawer()),
    fetchCuisines:()=>dispatch(fetchCuisines()),
    fetchRestaurant:()=>dispatch(fetchRestaurant()),
    fetchBestInTown:()=>dispatch(fetchBestInTown()),
    fectchBanners:()=>dispatch(fectchBanners()),
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(HomePage);
