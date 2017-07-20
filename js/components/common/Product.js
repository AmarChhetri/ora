import React from 'react';
import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get("window");
const Product = ({ title, price, style, childrenStyle, numberOfItems, notAvailable, color, onPlus, onMinus, hideButtons, desc}) => {
  const { indicator, viewStyle,viewStyle2, divider, top, bottom, textStyle, buttonViewStyle, numberOfItemsText, buttonStyle, iconStyle, priceStyle } = styles;
  const containerStyle = notAvailable ? viewStyle2 : viewStyle;
  return (

    <View style={[containerStyle]}>
      <CardView
        cardElevation={3}
        cardMaxElevation={3}
        cornerRadius={5}
      >
      <View style={top}>
        <Text style={[textStyle, childrenStyle]}>
          {title}
        </Text>
        <View style={[indicator,{backgroundColor:color}]}/>
      </View>
      <View style={divider}/>
      <View style={bottom}>
        <View style={buttonViewStyle}>
        {
          !hideButtons
          &&
          <TouchableOpacity
            style={buttonStyle}
            disabled={ numberOfItems > 0 ? false : true }
            onPress={onMinus}
          >
            <Icon name="minus" style={iconStyle}/>
          </TouchableOpacity>
        }
          {
            !hideButtons
            &&
            <Text style={numberOfItemsText}>{numberOfItems}</Text>
          }
        {
          !hideButtons
          &&
          <TouchableOpacity
            style={buttonStyle}
            disabled={notAvailable}
            onPress={onPlus}
          >
            <Icon name="plus" style={iconStyle}/>
          </TouchableOpacity>
        }
        </View>
        <Text style={priceStyle}>
           ₹ {price}
        </Text>
      </View>
      {
        (desc !== undefined)
        &&
        <Description desc={desc} />
      }
      </CardView>
    </View>

  );
};


const Description = ({desc})=>{
  const { divider, descHolder, descText } = styles;
  if (desc === "") {
    return null;
  }
  return (
    <View style={{marginTop:5}}>
      <View style={divider}/>
      <View style={descHolder}>
        <Text style={descText}>{desc}</Text>
      </View>
    </View>
  )
}
const styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'column',
    marginBottom: 10,
    // alignItems: 'center',
    //margin:2,
    // padding:5,

  },
  viewStyle2: {
    flex: 1,
    backgroundColor: 'silver',
    opacity: .3,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'column',
  },
  top:{
   // flex:0.5,
    margin:5,
    marginTop: 5,
    marginBottom: 10,
    flexDirection: "row",
  },
  textStyle: {
    // alignSelf: "center",
    flex:0.5,
    color: '#757575',
    fontSize: 15,
    fontWeight: '400',
    paddingLeft: 0,
    // fontStyle :'italic',
    fontFamily : 'Roboto-Light'
  },
  indicator:{
    width:8,
    height:8,
    borderRadius: 4,
    marginLeft:10,
    marginRight: 10,
    alignSelf: "center",
  },
  divider:{
    width:width-30,
    marginLeft: 7,
    height:1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  bottom:{
    flexDirection: "row",
    flex:0.4,
    marginTop:5,
    marginBottom: 15,
  },
  buttonViewStyle: {
    flexDirection: 'row',
    alignItems:"center",
    flex:0.8,
    paddingLeft:5,
  },
  buttonStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: "silver",
    borderWidth:1,
    margin:4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    textAlign: 'center',
    color:'silver',
    fontSize:10,
  },
  numberOfItemsText:{
    padding:3,
    textAlign: 'center',
    color:'grey',
    fontSize:14,
    fontFamily : 'Roboto-Light'
  },
  priceStyle:{
    flex:0.2,
    alignSelf: "center",
    textAlign: "right",
    color:'grey',
    fontSize:14,
    fontFamily : 'Roboto-Light',
    marginRight: 15
  },
  descHolder:{
    padding:10,
    paddingBottom: 15,
  },
  descText:{
    fontFamily : 'Roboto-Light',
    // color: '#fff'
  }
};

export { Product };
