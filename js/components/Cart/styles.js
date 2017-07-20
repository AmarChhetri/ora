import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    marginTop:extraTopMargin,
    flex: 1,
    backgroundColor:'#FCFCFC',
  },
  topbar:{
    flex:0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  mainContainer:{
    flex:0.8,
  },
  mainBlock:{
    flex:0.9,
    margin:10,
  },
  buttonSection: {
    flex:0.1,
    flexDirection: "row",
    backgroundColor:"grey",
  },
  detailsBlock:{
    backgroundColor:"transparent",
    marginBottom: 10,
  },
  divider:{
    width:width-20,
    height:1,
    backgroundColor:"silver",
    marginTop:20,
    // marginBottom:10,
  },
  restroNameSection:{

  },
  restroName:{
    paddingTop:10,
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize:18,
    color: '#393939',
  },
  listSection:{
    // flex:0.4
  },
  listitem:{
    flexDirection: "column",
    padding:15,
    backgroundColor: "#fff"
  },
  listItemTitle:{
    flex:0.6,
    flexDirection:"row",
    justifyContent: "space-between",
    // backgroundColor: "green",
    paddingTop:10,
    paddingBottom:10,
    // alignItems: "center",
  },
  listItemDetails:{
    padding:10,
    flex:0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"

  },
  listItemLeft:{
    // flex:0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemMid:{
    // flex:0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  listItemRight:{
    // flex:0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  totalPriceSection:{
    // backgroundColor:"blue"
  },
  controlButtonStyle:{
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#fff',
    borderColor: "silver",
    borderWidth:1,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    flex:0.7,
    alignItems: "center",
    padding:10,
  },
  buttonRight: {
    flex: 0.3,
    backgroundColor: "#6A6A6A",
    padding:10,
    alignItems: "center",
  },
  //
  // Empty cart
  //
  profile:{
    flex:1,
    alignItems:'center',
  },
  topGuest:{
    // padding:10,
    paddingTop:height/6.5,
    alignItems:'center',
  },
  guestPic:{
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor:'silver',
    borderColor:'rgba(0,0,0,0.2)',
    borderWidth:1,
  },
  guestOopsText:{
    textAlign: "center",
    padding:10,
    color:'grey',
    fontSize:18,
    fontFamily: "Roboto-LightItalic"
  },
  middleGuest:{
    // marginTop:25,
  },
  guestAdviceText:{
    fontSize:16,
    color:'grey',
    fontFamily: "Roboto-Light"
  },
  couponButton:{
    flexDirection: "row",
    // backgroundColor:"red",
    alignItems: "center",
    justifyContent: "space-between"
  },
  couponTextField:{
    height: 35,
    width:200,
    backgroundColor: '#fff',
    paddingLeft: 10,
    fontSize: 16,
  },
  controllIcon:{
    textAlign: 'center',
    color:'silver',
    fontSize:10,
    padding:5,
  },
  couponIcon:{
    fontSize:18,
    color: "silver",
    padding:15,
  },
  price:{
    alignSelf: 'center',
    textAlign: 'center',
    color:'grey',
  },
  divider2:{
    width:width-50,
    height:1,
    backgroundColor:"silver"
  },
  showErrorSuccessSection:{
    width:width,
    height:45,
  },
  bottombar:{
    flex:0.1,
    flexDirection: "row"
  },
  addAddressLeftButton:{
    flex:0.6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    flexDirection: "row",
  },
  buttonText:{
    fontSize:16,
    color:"white",
    // padding:10,
    fontFamily:'Helvetica'
  },
  totalPrice:{
    fontSize:16,
    color:"white",
    // padding:10,
    fontFamily:'Helvetica'
  },
  addAddressRightButton:{
    flex: 0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,120,60,0.7)"
  },
  checkoutIcon:{
    paddingTop: 3,
    paddingLeft: 10,
    color:"white",
    fontWeight: 'bold',
    fontSize:15,
  }
});
