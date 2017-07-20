import React, { Component } from 'react';
import { Text, Image, View, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import CardView from 'react-native-cardview';
import styles from '../styles';

// const { width } = Dimensions.get("window");
class Cuisines extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){

  }

  render() {
    const cuisine = this.props.cuisine;
    if (cuisine.isFetching) {
      return(
        <View
          style={{flexDirection: 'row'}}
        >
          <View style={[styles.cards2,{backgroundColor:'rgba(0,0,0,0.1)'}]}>
            <ActivityIndicator
              animating={true}
              color="#00E676"
              size="large"/>
          </View>
          <View style={[styles.cards2,{backgroundColor:'rgba(0,0,0,0.1)'}]}>
            <ActivityIndicator
              animating={true}
              color="#00E676"
              size="large"/>
          </View>
        </View>
      );
    }
    return(
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.sectionScrollView}
        >
        {
          cuisine.cuisines.map((item, index)=>{
            return (
              <View key={index}>
                <CardView
                  style={styles.CardView}
                  cardElevation={3}
                  cardMaxElevation={3}
                  cornerRadius={0}
                  >
              <TouchableOpacity

                onPress={()=>this.props.gotoCuisineHome(item.id,item.cuisine)}
              >
                <Image
                  style={styles.cards2}
                  source={{uri: `${item.avatar}`}}
                  >
                  <View style={[styles.cards2, {backgroundColor:'rgba(0,0,0,0.5)'}]}>
                    <Text style={[styles.headerDishes,styles.italicText]}>{item.cuisine}</Text>
                  </View>
                </Image>
              </TouchableOpacity>
            </CardView>
          </View>
            )
          })
        }
      </ScrollView>
    );
  }
}

module.exports = Cuisines;
