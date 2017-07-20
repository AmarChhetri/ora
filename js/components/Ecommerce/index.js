import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, Image, View, Dimensions, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, InteractionManager } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';
import CardView from 'react-native-cardview';
import { ShoppingCart, Spinner } from "../common/";
import ProductDetailsTab from '../ProductDetailsTab/';
import { openDrawer } from '../../actions/sidebar';
import { fetchProductCategories, fetchProductHomeBanner, fetchLatestProducts , showProductDisplay} from '../../actions';
import SearchEcom from '../SearchEcom/';
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

class Ecommerce extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      showSearch: false,
      showProductCategoryTabs: false,
      tabInitialPage: 0 ,
      number:0
    }
  }
  componentDidMount(){
     InteractionManager.runAfterInteractions(() => {
      this.props.fetchProductCategories();
      this.props.fetchProductHomeBanner();
      this.props.fetchLatestProducts();
     });
  }
  gotoCartHome(){
    this.props.navigator.push({
      id:'cart-shop',
    })
  }

  gotoProductDisplay(id, category_id){
    const { productCategoriesList, showProductDisplay, navigator } = this.props;
    let initialPage = 0;
    productCategoriesList.map((item, index)=>{
      if (item.id === category_id) {
        initialPage = index
      }
    });
    showProductDisplay(id);
    navigator.push({
      id:'product-details-tab-home',
      initialPage: initialPage,
      tabLabels: productCategoriesList,
      catId: category_id
    })
  }

  displayCategories() {
    if(this.props.isProductCatLoading){

        return(
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.cards,{backgroundColor:'rgba(0,0,0,0.1)'}]}>
              <Spinner size="large" />
            </View>
            <View style={[styles.cards,{backgroundColor:'rgba(0,0,0,0.1)'}]}>
              <Spinner size="large" />
            </View>
          </View>
        );
    }
    return this.props.productCategoriesList.map( (productItem, index) => {
        return (
          <View key={productItem.id}>
            <CardView
              style={styles.CardView}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={0}
            >
              <TouchableOpacity
                onPress={()=>this.gotoDetails(index, productItem.id)}>
                <Image style={styles.cards} source={{uri: productItem.avatar}}>
                  <View style={[styles.cards, {backgroundColor:'rgba(0,0,0,0.5)'}]}>
                    <Text style={[styles.headerDishes,styles.italicText]}>{productItem.category}</Text>
                  </View>
                </Image>
              </TouchableOpacity>
            </CardView>
          </View>
        );
     });

  }

  displayLatestProduct(){
    const { isLoading, latestProductList } = this.props.latestProduct
    if (isLoading) {
      return(
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.cards2,{backgroundColor:'rgba(0,0,0,0.1)'}]}>
            <Spinner size="large" />
          </View>
          <View style={[styles.cards2,{backgroundColor:'rgba(0,0,0,0.1)'}]}>
            <Spinner size="large" />
          </View>
        </View>
      );
    }
    return latestProductList.map( (productItem, index) => {
        return (
          <View key={productItem.id}>
            <CardView
              style={styles.CardView}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={0}
            >
              <TouchableOpacity
                key={`${productItem.id}-${index}`}
                onPress={()=>this.gotoProductDisplay(productItem.id, productItem.category_id)}>
                <Image
                  resizeMode={'stretch'}
                  style={styles.cards2}
                  source={{uri: productItem.avatar}}>
                  <View style={[styles.cards2, {backgroundColor:'rgba(0,0,0,0.5)'}]}>
                    <Text style={[styles.headerDishes,styles.italicText]}>{productItem.name}</Text>
                  </View>
                </Image>
              </TouchableOpacity>
            </CardView>
          </View>
        );
     });
  }

  renderCart(){
    const { bagSize } = this.props;
    return (
      <ShoppingCart
        numberOfItemsInCart={bagSize}
        onCartClick={()=>this.gotoCartHome()}
        tab={this.props.tab} />);
  }

  renderEcommerce(){
    if (this.state.showSearch) {
      return <SearchEcom
              productCatList={this.props.productCategoriesList}
              navigator={this.props.navigator}/>
    }
      return (
        <ScrollView style={styles.scrollbar}>

          <View style={styles.offersCarousel}>
          { this.renderSwiper() }
          </View>
          <View style={styles.cardsHeader}>
            <Text style={styles.cardsHeaderText}>CATEGORIES</Text>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.categoriesSection, {flex: 1, marginBottom: 5, flexDirection: 'row',}]}
            >

            {this.displayCategories()}

          </ScrollView>
          <View style={styles.cardsHeader}>
            <Text style={styles.cardsHeaderText}>LATEST PRODUCTS</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.categoriesSection, {flex: 1, flexDirection: 'row'}]}
            >

            {this.displayLatestProduct()}

          </ScrollView>

        </ScrollView>
      );
   // }
  }

  gotoDetails(indexOfTab, id){
    this.props.navigator.push({
      id:'product-details-tab-home',
      initialPage: indexOfTab,
      tabLabels: this.props.productCategoriesList,
      catId: id
    })
  }

   renderTopbarIcon(){
    if (this.state.showSearch) {
      return (
        <TouchableOpacity
          onPress={()=>this.setState({showSearch:false})}
          style={styles.leftTopbar}
        >
          <Icon style={styles.menuIcon} name="arrow-back" size={26} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={()=>this.props.openDrawer()}
        style={styles.leftTopbar}
      >
        <Icon style={styles.menuIcon} name="menu" size={28} />
      </TouchableOpacity>
    );
  }

  render() {
     return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          {
            this.renderTopbarIcon()
          }
          <TouchableOpacity
            style={[styles.midTopbar]}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={[styles.headerText]}>
              CityOra Shop
            </Text>
          </TouchableOpacity>
          <View style={[styles.rightTopbar]}>            
            <View style={{marginRight:0,  height: 30}}>
                { this.renderCart() }
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollbar}>
          {
            !this.state.showSearch
            &&
            <View>
              <CardView
                style={{marginTop: 5}}
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={5}
              >
                <TouchableOpacity
                  style={styles.searchBox}
                  onPress={()=>this.setState({showSearch:true})}
                  >
                    <Icon name="search" size={24} style={{paddingLeft: 10, paddingBottom: 10}}/>
                    <Text style={styles.searchBoxText}>Search products categories, products </Text>
                </TouchableOpacity>
              </CardView>
            </View>
          }
          {
            this.renderEcommerce()
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
    if (this.props.isProductHomeBannerLoading || this.props.productHomeBannerList.length === 0) {
      return null;
    }
    return(
      <Swiper
        height={220}
        style={styles.wrapper}
        showsButtons={false}
        dot={dotStyle}
        activeDot={dotActiveStyle}
        autoplay
        autoplayTimeout = {5}
        >

        { this.displayProductHomeBanner() }

      </Swiper>
    );
  }

  displayProductHomeBanner() {
    return this.props.productHomeBannerList.map( (productItem) => {
        return (
          <Image key={productItem.title}
              style={styles.offerImage}
              resizeMode={'cover'}
             source={{uri: productItem.avatar}}
              >
              <View style={[styles.slides,{backgroundColor:'rgba(0,0,0,0)'}]}/>
          </Image>
        );
     });
  }


} //class Ecommerce ends

const mapStateToProps = (state) => {
  const { productCategories, productHomeBanner, latestProduct } = state.ecommerce;
  return {
    latestProduct:latestProduct,
    isProductCatLoading: productCategories.isLoading,
    productCategoriesList: productCategories.productCategoriesList ,
    isProductHomeBannerLoading: productHomeBanner.isLoading,
    productHomeBannerList: productHomeBanner.productHomeBannerList,
    bagSize: state.shoppingBag.size,
  }
};

function mapDispatchToProps (dispatch) {
  return {
    openDrawer:()=>dispatch(openDrawer()),
    fetchProductCategories:()=>dispatch(fetchProductCategories()),
    fetchProductHomeBanner:()=>dispatch(fetchProductHomeBanner()),
    fetchLatestProducts:()=>dispatch(fetchLatestProducts()),
    showProductDisplay:(id)=>dispatch(showProductDisplay(id)),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Ecommerce);
