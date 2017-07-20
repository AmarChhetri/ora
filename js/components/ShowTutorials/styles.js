import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
     marginTop:extraTopMargin,
    //  justifyContent: 'center',
     alignItems: 'center',
    //  backgroundColor:'red',
  },
  offerImage: {
    flex: 1,
    width:width,
    height:height,
  },
  dotStyle:{
    backgroundColor: 'transparent',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 150,
  },
  dotActiveStyle:{
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 150
  },
  skip:{
    alignSelf:'flex-end',
    paddingRight:20,
    paddingTop:20,
    flexDirection:'row',
    alignItems:"center",
  },
  skipText:{
    color:"#fff",
    fontFamily:'Roboto-Regular',
    fontSize:12,
    fontWeight: '400',
  },
  checkoutIcon:{
    paddingLeft:10,
    color:"white",
    fontWeight: '100',
    fontSize:11,
  }
});
