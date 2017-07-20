import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import { find } from 'lodash';
import CardView from 'react-native-cardview';
import { Spinner } from "../../common/";
import { removeAndClearShoppingBag, addToShoppingBag } from '../../../actions/shopping-bag';
import { showProductDisplay, hideProductDisplay } from '../../../actions';
import ProductHomeCarousels from "./productHomeCarousels";
import Toast, {DURATION} from '../../Toaster/';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import styles from './styles';
//const ProductHome = ({data}) => {
class ProductHome extends Component {
    state = {expanded: false};

  onPrevWeight = ()=>{
    const id = this.state.activeId || 1;
    this.setState({
      activeId:id-1
    })
  }
  onNextWeight = ()=>{
    const id = this.state.activeId || 1;
    this.setState({
      activeId:id+1
    })
  }
  addToBag(title, id, weightCategory, returnable ){
    const { cartItem } = this.props.shoppingBag;
    const foundObject = find(cartItem, item=>(item.id === id)&&(item.subcategory_id === weightCategory.id));
    if (foundObject !== undefined) {
      // alert('object already there')
      // this.refs.toast.show('Product already in your shopping bag',500);
      this.props.alert.alertWithType('info', 'Info','Product already in your shopping bag');
      return ;
    }else if (weightCategory.stock === 0) {
      //this.refs.toast.show('Stock is not available',500);
      this.props.alert.alertWithType('info', 'Info','Product out of stock');
      return ;
    }
    const itemToAdd = {
      id : id,
      name:title,
      qty:1,
      subcategory_id:weightCategory.id,
      subcategory:weightCategory.sub_cat,
      price:weightCategory.price,
      return: returnable
    }
    this.props.addToShoppingBag(itemToAdd);
  }
  renderProductWeightSelector(weightArray){
    if(weightArray.length === 1 && weightArray[0].sub_cat === "") {
      return;
    }
    if(weightArray.length === 1 && weightArray[0].sub_cat !== "") {
      return <Text>{weightArray[0].sub_cat}</Text>
    }
    const { activeId } = this.state;
    const activeWeight = find(weightArray, weight=>weight.id === (activeId || 1));
    return (
      <View style={styles.productOtherSection}>
        <TouchableOpacity
          onPress={()=>this.onPrevWeight()}
          style={{marginRight:10}}
          disabled={(activeId || 1) === 1}
          >
          <Icon name="chevron-circle-left" style={{fontSize:26, color:'rgba(0,120,60,0.7)'}}/>
        </TouchableOpacity>
        <Text style={{width: 40, textAlign:'center'}}>{activeWeight.sub_cat}</Text>
        <TouchableOpacity
          onPress={()=>this.onNextWeight()}
          style={{marginLeft:10}}
          disabled={(activeId || 1) === weightArray.length}
          >
          <Icon name="chevron-circle-right" style={{fontSize:26, color:'rgba(0,120,60,0.7)'}}/>
        </TouchableOpacity>
      </View>
    )
  }
  displayRelatedItems(relatedProducts) {
    return (
      <View>
        <View style={styles.relatedProductsSection}>
        {
          relatedProducts.map((item, index) => {
            const { id, name, description, price, avatar } = item;
            return (
              <View key={index}>
                <CardView
                  style={styles.CardView}
                  cardElevation={3}
                  cardMaxElevation={3}
                  cornerRadius={0}
                >
                  <TouchableOpacity
                    
                    onPress={()=>{this.props.showProductDisplay(id)}}
                    >
                    <Image
                      source={{uri: avatar}}
                      style={styles.cards2}
                      >
                        <View style={[styles.cards2, {backgroundColor:'rgba(0,0,0,0.5)'}]}>
                          <View style={styles.restaurantNameView}>
                            <Text style={[styles.productName]}>{name}</Text>
                          </View>
                        </View>
                    </Image>
                  </TouchableOpacity>
                </CardView>
              </View>
            );
          })
        }
        </View>
      </View>
    );
  }


  render(){
  const { fetching, productHomeData } = this.props.data;

  if (!fetching) {
    const { activeId } = this.state;
    const activeWeight = find(productHomeData.data.attributes.category, weight=>weight.id === (activeId || 1));
    const productTitle = productHomeData.data.name;
    const productId = productHomeData.data.id;
    const { return:returnable, return_policy: returnText } = productHomeData.data.attributes;
    const { relatedProducts } = productHomeData;

    return (
      <ScrollView style={{flex:1, paddingBottom: 10}}>
        <View style={styles.productDetailsContainer}>
          <View style={styles.productCarouselView}>
            <ProductHomeCarousels arrayOfImages={productHomeData.data.avatar}/>
          </View>

          <View style={styles.productOtherView}>
            <CardView
              style={{marginTop: 10,}}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={5}
            >
              <View style={styles.productDetailsSection}>
                <ProductTitle title={productTitle}/>

                <View style={styles.productControlsView}>
                  <View style={styles.productDetailsLeft}>
                    <View style={{ flex: 0.5, height:20}}>
                      {
                        (activeWeight.stock <= 5 && activeWeight.stock !== 0)
                        &&
                        <Text style={[styles.italicText, {color:'red'}]}>Only {activeWeight.stock} item(s) left</Text>
                      }
                      {
                        activeWeight.stock === 0
                        &&
                        <Text style={[styles.italicText, {color:'red'}]}>Out of Stock</Text>
                      }
                    </View>

                    <View style={{ flex: 0.5}}>
                      {
                        this.renderProductWeightSelector(productHomeData.data.attributes.category)
                      }
                    </View>
                  </View>

                  <View style={styles.productDetailsRight}>
                    <Text style={styles.priceText}>₹ {activeWeight.price}</Text>
                    <TouchableOpacity
                      style={styles.buyButton}
                      onPress={()=>this.addToBag(productTitle, productId, activeWeight, returnable)}>
                      <Text style={styles.buyButtonText}>ADD TO BAG</Text>
                    </TouchableOpacity>
                  </View>
                </View>


                <TouchableOpacity 
                  style={{flex: 1, flexDirection: 'row', marginTop: 10}}
                  onPress={ () => { this.setState({expanded: !this.state.expanded})} }
                >
                  <View style={{flex: .6}}>
                    <Text style={{fontWeight:'600'}}>Description</Text>
                  </View>
                  <View style={{flex:.4, alignItems: 'flex-end',justifyContent:'center'}}>
                      { this.state.expanded ? (<MaterialIcon  name="keyboard-arrow-up" size={24}/>):(<MaterialIcon  name="keyboard-arrow-down" size={24} />)}
                  </View>
                </TouchableOpacity>
                
                { this.state.expanded 
                  && 
                  <View>
                    <ProductDescription desc={productHomeData.data.description}/>
                    <View style={styles.productReturnPolicy}>
                      <Text>
                      Return Policy: {returnText || 'Return policy not available'}
                      </Text>
                    </View>
                  </View>
                }

              </View>
            </CardView>
            <View style={styles.cardsHeader}>
              <Text style={styles.cardsHeaderText}>RELATED PRODUCTS</Text>
            </View>
            <ScrollView
              style={{marginBottom: 10}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              { this.displayRelatedItems(relatedProducts) }
            </ScrollView>
          </View>
        </View>
        <Toast
          ref="toast"
          position={'center'}
          // positionValue={200
        />
      </ScrollView>
    );
  }
  return <Spinner/>
}
};

const ProductDescription=({desc}) => {
  return (
    <View style={styles.productDescView}>
      <Text style={styles.productDescription}>{desc}</Text>
    </View>
  )
}

const ProductTitle=({title}) => {
  return (
    <View style={styles.productNameView}>
      <Text style={styles.productNameText}>{title.toUpperCase()}</Text>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    productHome: state.ecommerce.productHome,
    cart:state.cart,
    shoppingBag: state.shoppingBag
  }
};

function mapDispatchToProps (dispatch) {
  return {
    showProductDisplay:(id)=>dispatch(showProductDisplay(id)),
    removeAndClearShoppingBag:()=>dispatch(removeAndClearShoppingBag()),
    addToShoppingBag:(item)=>dispatch(addToShoppingBag(item))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductHome);
