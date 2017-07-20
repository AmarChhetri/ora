import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, Image, View, Dimensions, TouchableOpacity, ScrollView, InteractionManager, Linking } from 'react-native';
import styles from './styles';
import { Spinner } from "../common/";
import { openDrawer } from '../../actions/sidebar';
import { fetchListOfTableReservation } from '../../actions/table-reservation';
import SearchEcom from '../SearchEcom/';
import Icon from "react-native-vector-icons/MaterialIcons";

class TableOrdering extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
     InteractionManager.runAfterInteractions(() => {
       this.props.fetchListOfTableReservation();
     });
  }

  handleClick(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

  renderLIst(){
    const { isLoading , restaurants } = this.props;
    if (isLoading || restaurants === undefined) {
      return <Spinner />
    }
    return restaurants.map((item,index)=>
      <View key={index} style={styles.restroCards}>
        <Text style={{textAlign: 'justify'}}>
          <Text style={styles.restroName}>{item.rest_name}, </Text>
          <Text style={styles.restroLocation}>{item.location}</Text>
        </Text>
      </View>
    );
  }
  render() {
     return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          <TouchableOpacity
            onPress={()=>this.props.openDrawer()}
            style={styles.leftTopbar}
          >
            <Icon style={styles.menuIcon} name="menu" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.midTopbar]}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={[styles.headerText]}>
              CityOra Table Booking
            </Text>
          </TouchableOpacity>
          <View style={[styles.rightTopbar]}>
            <Image
              style={{width:25, height: 25, alignSelf: "center"}}
              source={require('../../../assets/image/cityora-app-logo.jpg')}
              />
          </View>
        </View>
        <ScrollView style={styles.scrollbar}>
          <Image
              style={styles.offerImage}
              resizeMode={'cover'}
              source={require('../../../assets/table.jpg')}
              >
          </Image>
          <TouchableOpacity
            style={styles.callUsBtn}
            onPress={()=>this.handleClick('tel:9127018661')}
          >
              <Icon style={styles.callusIcon} name="call" size={24} /><Text style={styles.callusText}>  CALL US</Text>
          </TouchableOpacity>
          <View style={styles.listOfrestroView}>
            <Text style={styles.listHeading}>Currently, we offer table reservations at</Text>
              { this.renderLIst() }
          </View>
        </ScrollView>
      </View>
    );
  }


} //class TableOrdering ends

const mapStateToProps = (state) => {
  const { isFetching, restaurants } = state.tableReservation;
  return {
    isFetching,
    restaurants
  }
};

function mapDispatchToProps (dispatch) {
  return {
    openDrawer:()=>dispatch(openDrawer()),
    fetchListOfTableReservation:()=>dispatch(fetchListOfTableReservation()),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(TableOrdering);
