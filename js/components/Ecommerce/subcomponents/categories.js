import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, View, Platform, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { fetchProductDetails, showProductDisplay, hideProductDisplay } from '../../../actions';
import ProductHome from './productHome';
import Productcard from '../../SubComponents/Ecom/ProductCard';
import { Spinner } from "../../common/";
import CardView from 'react-native-cardview';
import styles from './styles';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");

class Categories extends Component {

  constructor(props){
    super(props);

    this.viewProduct = this.viewProduct.bind(this);
  }

  viewProduct(id){
    return ()=>{
      this.props.showProductDisplay(id);
      // this.props.scrollToTop()
    };
  }
   render() {
    const {isLoading, productDetailsArray, dataNotFound, productHome, productHomeObject } = this.props;
    if (productHome) {
      return <ProductHome alert={this.props.alert} data={productHomeObject} />
    }
    if(isLoading) {
      return (<Spinner size="large" />);
    }

    if(dataNotFound){
     return(<View><Text>DATA NOT FOUND</Text></View>);
    }

    return(
        <View style={{flex:1, backgroundColor: "#E0E0E0"}}>
          <ScrollView style={{flex:1}}>
          {
            this.renderList(productDetailsArray)
          }
          </ScrollView>
        </View>
    );
  }
  renderList(productDetailsArray) {
     return (
      <View style={[styles.cardView, {flex:1}]}>
        {
          productDetailsArray.map((item, index)=>
          <View key={index}>
            <CardView
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={2}
            >
              <Productcard
                
                viewProduct={this.viewProduct(item.id)}
                product={item}
              />
            </CardView>
          </View>
        )}
      </View>
      );
  }

}



const mapStateToProps = (state) => {
  const { isLoading, productDetailsArray, productHomeObject } = state.ecommerce.productDetailsObj;
  let dataNotFound = false;
  if(productDetailsArray.length <= 0){
    dataNotFound = true;
  }
  return {
    detailsObj: state.ecommerce.productDetailsObj,
    productHome: state.ecommerce.productHome,
    productHomeObject : state.ecommerce.productHomeObject,
    isLoading: isLoading,
    dataNotFound: dataNotFound,
    productDetailsArray: productDetailsArray
  }
};

function mapDispatchToProps (dispatch) {
  return {
    showProductDisplay:(id)=>dispatch(showProductDisplay(id)),
    hideProductDisplay:()=>dispatch(hideProductDisplay()),
    fetchProductDetails:(catId)=>dispatch(fetchProductDetails(catId))
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Categories);
