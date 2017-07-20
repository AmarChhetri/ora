import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, Image, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Categories from '../Ecommerce/subcomponents/categories';
import { fetchProductDetails, hideProductDisplay } from '../../actions';
import DropdownAlert from 'react-native-dropdownalert';
import styles from './styles';
import EcomHeader from '../EcomHeader/';


class ProductDetailsTab extends Component {
  constructor(props){
    super(props);
    this.state = {
      reload: true,
      initialPage: this.props.initialPage
    }
  }
  componentDidMount(){
    if (this.props.catId !== null) {
      this.props.fetchProductDetails(this.props.catId);
    }
  }
  onBack(){
    this.props.hideProductDisplay();
    this.props.navigator.pop();
  }
  render() {
    const { productHomeObject } = this.props;

    return (
      <View style={styles.container}>
        <EcomHeader
          onBack={()=>this.onBack()}
          style={styles.topbar}
          title="CityOra Shop"
          showCart={true}
          navigator={this.props.navigator}
          />
        <View style={styles.tabview}>

          <ScrollableTabView
            locked
            style={{flex:1,flexDirection:'column', marginTop: 0}}
            initialPage={this.state.initialPage}
            tabBarTextStyle={{color:'#757575'}}
            tabBarUnderlineStyle={{backgroundColor:'#00E676', height:1.5}}
            renderTabBar={() => <ScrollableTabBar />}
            onChangeTab = {(obj) => {this.reloadOnTabChange(obj)}}>
            { this.generateTabLabels() }
          </ScrollableTabView>
        </View>
        <DropdownAlert
        ref={(ref) => this.dropdown = ref} 
        />
      </View>
    );
  }

  reloadOnTabChange(obj) {
    this.props.hideProductDisplay();
    const catId = obj.ref.props.catId;
    this.props.fetchProductDetails(catId);
  }

  generateTabLabels() {
    var booleanValue = false;
    return this.props.tabLabels.map( (item, index) =>
    <Categories
      key={item.id}
      alert={this.dropdown}
      tabLabel={item.category.toUpperCase()}
      navigator={this.props.navigator}
      catId={item.id}/>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    productHomeObject: state.ecommerce.productHomeObject,
  }
};

function mapDispatchToProps (dispatch) {
  return {
    hideProductDisplay:()=>dispatch(hideProductDisplay()),
    fetchProductDetails:(id)=>dispatch(fetchProductDetails(id)),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ProductDetailsTab);
