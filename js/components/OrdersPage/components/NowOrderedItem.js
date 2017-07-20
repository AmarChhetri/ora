import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Card, CardSection, Button } from '../../common';
import styles from '../styles';


const { width, height } = Dimensions.get("window");


let currentTime = new Date().getTime();
var moment = require('moment');


class NowOrderedItem extends Component {

  state = {expanded: false}

  displayProgressStatus(status) {
    const { typeOfOrder } = this.props;
    let secondStatus = '';
    if(typeOfOrder=='1'){
      secondStatus = 'COOKING'
    }
    else{
      secondStatus = 'PROCESSING'
    }

    const statusStyle = {
      orderedStatusColor: {
        backgroundColor: 'lightgrey'
      },
      cookingStatusColor: {
        backgroundColor: 'lightgrey'
      },
      deliveringStatusColor: {
        backgroundColor: 'lightgrey'
      },
      deliveredStatusColor: {
        backgroundColor: 'lightgrey'
      }
    };

    switch (status) {
     // case 'ordered':
      case 0:
        statusStyle.orderedStatusColor.backgroundColor = 'rgba(0,120,60,0.7)';
        break;
      //case 'cooking':
      case 1:
        statusStyle.orderedStatusColor.backgroundColor = 'rgba(0,120,60,0.7)';
        statusStyle.cookingStatusColor.backgroundColor = 'rgba(0,120,60,0.7)';
        break;
      //case 'delivering':
      case 2:
        statusStyle.orderedStatusColor.backgroundColor = 'rgba(0,120,60,0.7)';
        statusStyle.cookingStatusColor.backgroundColor = 'rgba(0,120,60,0.7)';
        statusStyle.deliveringStatusColor.backgroundColor = 'rgba(0,120,60,0.7)';
        break;
      // case 'delivered':
      case 3:
        statusStyle.orderedStatusColor.backgroundColor = 'rgba(0,120,60,0.7)';
        statusStyle.cookingStatusColor.backgroundColor = 'rgba(0,120,60,0.7)';
        statusStyle.deliveringStatusColor.backgroundColor = 'rgba(0,120,60,0.7)';
        statusStyle.deliveredStatusColor.backgroundColor = 'rgba(0,120,60,0.7)';
        break;
      default:
    }

    return(
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                  <View>
                    <View style={{height: 10, width: 10, backgroundColor: statusStyle.orderedStatusColor.backgroundColor, borderRadius:50 }}></View>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', position: 'relative'}}>
                    <View style={{flex: 1, height: 3,width: 50, backgroundColor: statusStyle.cookingStatusColor.backgroundColor, marginTop: 3}}></View>
                    <View style={{height: 10, width: 10, backgroundColor: statusStyle.cookingStatusColor.backgroundColor, borderRadius:50 }}></View>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', position: 'relative'}}>
                    <View style={{flex: 1,height: 3,width: 50, backgroundColor: statusStyle.deliveringStatusColor.backgroundColor, marginTop: 3}}></View>
                    <View style={{height: 10, width: 10, backgroundColor: statusStyle.deliveringStatusColor.backgroundColor, borderRadius:50 }}></View>
                  </View>

                  <View style={{flex: 1.8, flexDirection: 'row', position: 'relative'}}>
                    <View style={{flex: 1, height: 3,width: 50, backgroundColor: statusStyle.deliveredStatusColor.backgroundColor, marginTop: 3}}></View>
                    <View style={{height: 10, width: 10, backgroundColor: statusStyle.deliveredStatusColor.backgroundColor, borderRadius:50 }}></View>
                  </View>
              </View>

              <View style={{flex: 1,flexDirection: 'row', marginTop:2,}}>
              <Text style={{flex: .15, textAlign: 'left', fontSize: 10, fontWeight: '500'}}>ORDERED</Text>
              <Text style={{flex: .2, fontSize: 10, textAlign: 'left', fontWeight: '500'}}>{secondStatus}</Text>
              <Text style={{flex: .2, fontSize: 10, textAlign: 'left', fontWeight: '500'}}>DELIVERING</Text>
              <Text style={{flex: .2, textAlign: 'right', fontSize: 10, fontWeight: '500',}}>DELIVERED</Text>
            </View>
            </View>
    );
  }

  displayItemsOrderedOnExpand(cartItem) {
    return  cartItem.map( (item, index) => {
             return  <View key={`${item.subcategory_id}-${item.id}-${index}`} style={{flexDirection: 'row'}}>
                        <View style={{flex: 0.5}} >
                           <Text style={componentStyles.expandTextLeftStyle}>{item.name}{item.subcategory ? '('+item.subcategory+')': ''}</Text>
                        </View>
                        <View style={{flex: 0.2}} >
                          <Text style={{ textAlign:'center'}}>{item.qty}</Text>
                        </View>
                        <View style={{flex: 0.3}}>
                          <Text style={componentStyles.expandTextRightStyle}>₹ {item.price}</Text>
                        </View>
                    </View>

                  });
  }

  displayOrderDetails(expand, payablePrice, typeOfOrder) {
    const { order_id, cartItem, total_price, additions, deductions } = expand;
    const { vat, packing_charge, delivery_charge } = additions;
    if(this.state.expanded){
      return (
         <CardSection>
             <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style = {{fontWeight: '500'}}>Bill details</Text>
                {
                   this.displayItemsOrderedOnExpand(cartItem)
                }
                <View style={{flex: 1, flexDirection: 'column'}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={componentStyles.expandTextLeftStyle}>Item Total</Text>
                        <Text style={componentStyles.expandTextRightStyle}>₹ { total_price }</Text>
                      </View>

                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={componentStyles.expandTextLeftStyle}>VAT</Text>
                        <Text style={componentStyles.expandTextRightStyle}>₹ { vat }</Text>
                      </View>
                      { (packing_charge != undefined) &&
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <Text style={componentStyles.expandTextLeftStyle}>Packaging Charge</Text>
                          <Text style={componentStyles.expandTextRightStyle}>₹ { packing_charge }</Text>
                        </View>
                      }
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={componentStyles.expandTextLeftStyle}>Delivery Charge</Text>
                        <Text style={componentStyles.expandTextRightStyle}>₹ { delivery_charge }</Text>
                      </View>
                      { (packing_charge != undefined) &&
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={componentStyles.expandTextLeftStyle}>Deductions</Text>
                        <Text style={componentStyles.expandTextRightStyle}>₹ { deductions }</Text>
                      </View>
                      }
                      <View style={componentStyles.divider}/>
                      <View style={{flex: 1, flexDirection: 'row', paddingBottom: 10,}}>
                        <Text style={[componentStyles.expandTextLeftStyle, {fontWeight:'500'}]}>Total Payable Amount</Text>
                        <Text style={[componentStyles.expandTextRightStyle,{fontWeight:'500'}]}>₹ { payablePrice }</Text>
                      </View>
                </View>

             </View>
         </CardSection>
      );
    }
  }

  render() {
    const { id, status, restroName, items, price, order_time, expand } = this.props.nowOrderedItem;
    const { typeOfOrder } = this.props;

    return (
      <Card>
        <CardSection>
          <View>
            <Text style={styles.orderStatus}>Ordered: { moment(`${order_time.date}`).fromNow()} </Text>
          </View>
        </CardSection>

        <CardSection>
          { this.displayProgressStatus(status) }
        </CardSection>

        <CardSection>
          <TouchableOpacity style={{flex: 1, flexDirection: 'row'}}
                    onPress={ () => { this.setState({expanded: !this.state.expanded})} }
                  >
              <View style={{flex: 1}}>
                <View style={styles.restroNamePrice}>
                  <Text style={styles.restroName}>{restroName ? restroName:"Shopping" }</Text>
                  <Text style={styles.price}>₹ {price}  </Text>
                </View>

                <Text style={[styles.items]}> {items} </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>

                    { this.state.expanded ? (<Icon  name="keyboard-arrow-up" size={24}/>):(<Icon  name="keyboard-arrow-down" size={30} />)}

              </View>
          </TouchableOpacity>
        </CardSection>


          { this.displayOrderDetails(expand, price, typeOfOrder) }



        <CardSection style={{paddingLeft:0, paddingRight:0}}>





        </CardSection>
      </Card>
    );
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

export default NowOrderedItem;
