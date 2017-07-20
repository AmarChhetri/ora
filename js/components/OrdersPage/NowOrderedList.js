import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../common';
import NowOrderedItem from './components/NowOrderedItem';
import styles from './styles';
import CardView from 'react-native-cardview';

class NowOrderedList extends Component {

  render() {
    const { isLoading, status } = this.props;

    if(isLoading) {
     return (<Spinner size="large" />);
    }

    if(status==0) {
      return (
          <View style={[styles.topGuest, {justifyContent:"center"}]}>
            <Image
              style={{width:200, height: 200}}
              source={require('../../../assets/no-orders.png')}
              />

              <Text style={[styles.guestAdviceText,{marginTop:10, fontSize:18}]}>NO ORDERS PLACED</Text>
          </View>
      )
    }

 		return (
      <ScrollView style={{backgroundColor: '#FCFCFC'}}>
        <View style={{marginTop: 10}}>
          {
            this.renderNowOrderedList()
          }
        </View>
     </ScrollView>
 		);
 	}

  renderNowOrderedList() {
    return this.props.nowOrderedList.map( (nowOrderedItem, index) =>
      <CardView style={{marginBottom: 5}} key={index} cardElevation={3} cardMaxElevation={3} cornerRadius={5}>
        <NowOrderedItem nowOrderedItem={nowOrderedItem} typeOfOrder={nowOrderedItem.type}/>
      </CardView>
    );
  }

  // renderFoodNowOrderedList() {
  //    return this.props.nowOrderedList.foodDelivery.map( (nowOrderedItem, index) =>
  //       <NowOrderedItem key={nowOrderedItem.id} nowOrderedItem={nowOrderedItem} typeOfOrder="food" />
  //   );
  // }
  // renderEcommerceNowOrderedList() {
  //    return this.props.nowOrderedList.ecommerce.map( (nowOrderedItem, index) =>
  //       <NowOrderedItem key={nowOrderedItem.id} nowOrderedItem={nowOrderedItem} typeOfOrder="ecommerce"/>
  //   );
  // }
}

const mapStateToProps = (state) => {
  const {isLoading, nowOrderedData } =  state.orders.nowOrderedObj;

  return { isLoading,
           status: nowOrderedData.status,
           nowOrderedList: nowOrderedData.data,
           activeOrderTab: state.orders.activeOrderTab
  }
};

export default connect(mapStateToProps, null )(NowOrderedList);
