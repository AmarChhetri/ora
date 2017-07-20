import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, Image, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Spinner } from "../common/";
import CardView from 'react-native-cardview';
import { find } from 'lodash';
import { searchApp } from '../../actions/search-ecom';
import { showProductDisplay } from '../../actions';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './styles';

var moment = require('moment');

class SearchEcom extends Component {
  constructor(props){
    super(props);
    this.state = {
      text:"",
      showInit: true,
    }
  }
  componentWillMount(){

  }
  gotoProductDisplay(id, category_id){
    const { productCatList, showProductDisplay, navigator } = this.props;
    let initialPage = 0;
    productCatList.map((item, index)=>{
      if (item.id === category_id) {
        initialPage = index
      }
    });
    showProductDisplay(id);
    navigator.push({
      id:'product-details-tab-home',
      initialPage: initialPage,
      tabLabels: this.props.productCatList,
      catId: category_id
    })
  }
  //
  // List of results
  //
  renderResults(data, index){
    return(
      <View style={{marginBottom: 5}} key={index}>
        <CardView
          cardElevation={3}
          cardMaxElevation={3}
          cornerRadius={5}
        >
          <TouchableOpacity
            key={index}
            style={styles.resultObjectView}
            onPress={()=>this.gotoProductDisplay(data.id, data.category_id)}
          >
              <Image
                source={{uri: data.avatar}}
                style={styles.left}
                />

              <View style={styles.right}>
                  <View style={styles.rightTop}>
                    <View><Text style={styles.restroName}>{data.name}</Text></View>
                    <View style={styles.divider}></View>
                    <View style = {{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
                    </View>
                  </View>
                  <View style={styles.rightBottom}>
                    <Text style={styles.statusText}>Rs. {data.price}</Text>
                  </View>
            </View>
          </TouchableOpacity>
        </CardView>
      </View>
    );
  }

  //
  // Search app
  //
  searchapp(queryText){
    this.setState({text:queryText})
    if (queryText === ""){
      this.setState({
        showInit: true
      })
      return ;
    }else if (queryText !== "") {
      this.setState({
        showInit: false
      })
      this.props.searchApp(queryText);
    }
  }

  //
  // Render main
  //
  renderMain(){

    const { showInit } = this.state;
    const { requesting, isInit, results, noResults } = this.props

    if (isInit || showInit) {
      return null;
    }else if (requesting && !isInit) {
      return (
        <View style={styles.centered2}>
          <Spinner style={[styles.centered ]} size={"large"}/>
        </View>
      );
    }
    else if (!requesting && !isInit && results !== undefined) {
      return results.map((data, index)=>this.renderResults(data,index))
    }else if (noResults) {
      return (
        <View style={styles.centered}>
          <Image
            style={{width:200, height: 200}}
            source={require('../../../assets/search-not-found.png')}
            />
          <Text style={styles.centeredText}>Oops! We didn't get a match to your taste</Text>
        </View>
      );
    }
  }
  render() {

    return (
      <View style={styles.container}>
        <CardView
          style={{marginTop: 10, height: 55,}}
          cardElevation={3}
          cardMaxElevation={3}
          cornerRadius={2}
        >
          <View style={styles.searchBarAndFilterSection}>
            <Icon name={"search"} style={styles.searchIcon}/>
            <TextInput
              style={styles.textInput}
              placeholder="Search for Products"
              placeholderTextColor ={"#757575"}
              value={this.state.text}
              onChangeText={(text) => this.searchapp(text)}
              underlineColorAndroid='rgba(0,0,0,0)'
              // onFocus={()=>this.setState({text:''})}
            />
          </View>
        </CardView>
        <ScrollView style={styles.listviewContainer}>
        {
          this.renderMain()
        }
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps (state) {
  const { requesting, isInit, results, noResults } = state.searchEcom
  return {
    requesting,
    isInit,
    results,
    noResults
  }
}

function mapDispatchToProps (dispatch) {
  return {
    searchApp:(queryText)=>dispatch(searchApp(queryText)),
    showProductDisplay:(id)=>dispatch(showProductDisplay(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEcom)
