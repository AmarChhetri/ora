import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from 'react-redux';
import { Card, CardSection, Spinner } from '../../common';
import { toogleFavourite } from '../../../actions';
import styles from '../styles';


//let currentTime = new Date().getTime();
const { width, height } = Dimensions.get("window");

var g_favourite = 0;

class PastOrderedItem extends Component {

  state = { favourite: 0, expanded: false }

 componentWillMount() {
  // console.log("mounted PASTORDER");
}
componentWillReceiveProps(nextProps){
  //console.log("the past object is", nextProps.pastOrderedObj);
}

// displayReturnScreen(productId, orderId, subcategory_id) {
  displayReturnScreen(orderId, cartItem) {
    var {items} = this.props.pastOrderedItem;
    var itemToReturn = {
      items,
      orderId,
      cartItem
    };
    this.props.navigator.push({
        id:'return-item',
        // orderId: orderId,
        // subcategory_id: subcategory_id
        itemToReturn: itemToReturn
      })
}

displayItemsOrderedOnExpand(cartItem, orderId, orderId2) {
    return  cartItem.map( (item, index) => {
         return <View key={index}>
                  <View  style={{flexDirection: 'row'}}>
                        <View style={{flex: 0.5}} >
                          <Text style={componentStyles.expandTextLeftStyle}>{item.name}{item.subcategory ? '('+item.subcategory+')': ''}</Text>
                        </View>
                        <View style={{flex: 0.2}} >
                          <Text style={{ textAlign:'center'}}>{item.qty}</Text>
                        
                        </View>
                        <View style={{flex: 0.3,}}>
                          <Text style={componentStyles.expandTextRightStyle}>₹ {item.price}</Text>
                          { item.return &&
                            <TouchableOpacity 
                              key={index} 
                              style={{width: 61, marginBottom: 5, marginTop: 2, borderRadius: 5, alignSelf: 'flex-end'}} 
                              onPress={ () => {this.displayReturnScreen(orderId, item)}}
                            >
                                <Text style={styles.returnButton}>RETURN</Text>
                            </TouchableOpacity>
                          }
                        </View>
                    </View>
                    <View style={[componentStyles.divider, {height: 0.5}]}/>
                </View>
              });
  }

displayOrderDetails(expand, payablePrice, typeOfOrder, orderId) {
    const { order_id, cartItem, total_price, additions, deductions } = expand;
    const { vat, packing_charge, delivery_charge } = additions;
    if(this.state.expanded){
      return (
         <CardSection style={{paddingTop:0,paddingBottom:20}}>
             <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style = {{fontWeight: '500'}}>Bill details</Text>
                {
                   this.displayItemsOrderedOnExpand(cartItem, orderId,  order_id)
                }
                <View style={{flex: 1, flexDirection: 'column'}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={componentStyles.expandTextLeftStyle}>Item Total</Text>
                        <Text style={componentStyles.expandTextRightStyle}>₹ {total_price}</Text>
                      </View>

                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={componentStyles.expandTextLeftStyle}>VAT</Text>
                        <Text style={componentStyles.expandTextRightStyle}>₹ {vat}</Text>
                      </View>
                      {
                        packing_charge !== undefined
                        &&
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <Text style={componentStyles.expandTextLeftStyle}>Packaging Charge</Text>
                          <Text style={componentStyles.expandTextRightStyle}>₹ {packing_charge}</Text>
                        </View>
                      }
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={componentStyles.expandTextLeftStyle}>Delivery Charge</Text>
                        <Text style={componentStyles.expandTextRightStyle}>₹ {delivery_charge}</Text>
                      </View>
                      { deductions !== undefined
                        &&
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <Text style={componentStyles.expandTextLeftStyle}>Deductions</Text>
                          <Text style={componentStyles.expandTextRightStyle}>₹ {deductions}</Text>
                        </View>
                      }
                      <View style={componentStyles.divider}/>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[componentStyles.expandTextLeftStyle, {fontWeight:'500'}]}>Total Payable Amount</Text>
                        <Text style={[componentStyles.expandTextRightStyle,{fontWeight:'500'}]}>₹ {payablePrice}</Text>
                      </View>
                </View>

             </View>
         </CardSection>
      );
    }
    return ;
  }


 render() {
    const { id, restroName, items, price, favourite, toggleLove, addtoFavourite, date, expand } = this.props.pastOrderedItem;
    const { typeOfOrder } = this.props;
    return (
      <Card>
        <CardSection>
          <View style={{flex: 1}}>
            <View style={styles.restroNamePrice}>
              <Text style={styles.restroName}>{restroName ? restroName:"Shopping" }</Text>
              { this.displayButtonCaption(id,favourite, toggleLove, addtoFavourite) }

            </View>

            <Text style={[styles.items]}> { items }</Text>
          </View>
        </CardSection>

        <CardSection style = {{paddingBottom: 10}}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}}
              onPress={ () => { this.setState({expanded: !this.state.expanded})} }>
                <View style={{flex: .6}}>
                  <Text style={styles.orderStatus}>Ordered: { date } </Text>
                </View>
                <View style= {{ flex: .3}}>
                  <Text style={styles.price}>₹ {price}</Text>
                </View>
                <View style={{flex:.1, alignItems: 'flex-end',justifyContent:'center'}}>
                    { this.state.expanded ? (<Icon  name="keyboard-arrow-up" size={24}/>):(<Icon  name="keyboard-arrow-down" size={24} />)}
                </View>
            </TouchableOpacity>
        </CardSection>
 
        { this.displayOrderDetails(expand, price, typeOfOrder, id) }

      </Card>
    );
  }

  displayButtonCaption(id, favourite, toggleLove, addtoFavourite) {
    if(!toggleLove){
      return <View><Text style={{fontSize: 12, color: '#ef3969'}}>CANCELLED</Text></View>
    }
      if(favourite==0){
        return (<TouchableOpacity style={styles.heartIcon} onPress={() => this.props.toogleFavourite(id, addtoFavourite)}>
            <Image style={{width:28, height: 25}}

            source={require('../../../../assets/heart-grey.png')}
            />
        </TouchableOpacity>
        )

      }
      return (<TouchableOpacity onPress={() => this.props.toogleFavourite(id, addtoFavourite)}>
                  <Image style={{width:28, height: 25}}

                source={require('../../../../assets/heart-pink.png')}
                />
             </TouchableOpacity>
      )
  }

}

const componentStyles = {
  textSize: {
    color: '#757575',
    fontSize: 15,
    fontWeight: '400',
    paddingLeft: 0,
    fontStyle :'italic',
    fontFamily : 'Roboto-LightItalic'
  },
  divider:{
    width:width-44,
    // padding:10,
    alignSelf: 'center',
    height:1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginTop: 5,
    marginBottom: 5
  },
  expandTextLeftStyle: {
    flex: 0.7
  },
  expandTextRightStyle: {
    flex:0.3,
    textAlign: 'right'
  }
};



const mapStateToProps = (state) => {
  const {isLoading, favoriteAlteredResponseData } =  state.orders.favoriteAlteredResponseObj;
  const { favourite, status } = favoriteAlteredResponseData;
  // g_favourite =   favourite;
 // this.setState({favourite: favourite});
  return {
    pastOrderedObj:state.orders.pastOrderedObj,
    isLoading: isLoading,
    favourite: favourite,
    status: status
  }
};

function mapDispatchToProps (dispatch) {
  return {
    toogleFavourite: (id, addtoFavourite) => dispatch(toogleFavourite(id, addtoFavourite))
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(PastOrderedItem);

//export default PastOrderedItem;
