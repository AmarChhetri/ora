import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FCFCFC',
  },
  topbar:{
    flex:0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  orderStatus: {
    fontSize:17,
    fontWeight: "500",
    paddingBottom: 10,
  },
  italicText: {
    fontStyle: 'italic'
  },
  restroNamePrice: {
    flexDirection: 'row',
  },
  restroName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    //color: 'silver'
  },
  price: {
    alignSelf: 'flex-end',
    fontSize: 17
  },
  items: {
    fontSize: 12,
    color: '#757575',

    fontWeight: '400',
    paddingLeft: 0,
    paddingBottom: 5,
    // fontStyle :'italic',
    fontFamily : 'Roboto-LightItalic'
  },

  heartIcon: {

    alignSelf: 'flex-end',


  },

  //
  // Style for Guest(not logged in)
  //
  profile:{
    flex:1,
    alignItems:'center',
  },
  topGuest:{
    // padding:10,
    paddingTop:height/6,
    alignItems:'center',
  },
  guestPic:{
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor:'#757575',
    borderColor:'rgba(0,0,0,0.2)',
    borderWidth:1,
  },
  guestOopsText:{
    paddingTop:25,
    color: '#7f8c8d',
    fontSize:22,
    fontFamily: "Roboto-LightItalic",

  },
  middleGuest:{
    marginTop:25,
  },
  guestAdviceText:{
    fontSize:14,
    color: '#7f8c8d',
    fontFamily: "Roboto-Light"
  },
  bottomGuest:{
    flexDirection:'row',
    paddingTop:25,
    justifyContent:'space-between'
  },
 guestButton:{
    width:130,
    height:45,
    backgroundColor:'#fff',
    alignSelf:'center',
    justifyContent: 'center',
  },
  userPicStyle:{
    width: 80,
    height: 80,
    // borderRadius: 40,
  },
  guestButtonText:{
    textAlign:'center',
    padding:10,
    fontSize:18,
    fontFamily: "Roboto-Light"
  },
  guestButtonSeperator:{
    height:50,
    width:2,
    margin:10,
    backgroundColor: '#7f8c8d',
  },
  noOrderPlaced:{

  },
  returnItemContainer: {
    flex: 0.9,
    backgroundColor: '#FCFCFC',
  },
  cardView:{
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    paddingBottom: 25,
    backgroundColor: '#fff',
  },
  returnItemText: {
    paddingLeft: 5,
    fontSize:14,
    fontFamily : 'Iowan Old Style'
  },
  returnButton: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 2,
    backgroundColor: "rgba(0,120,60,0.7)",
  },
  returnOKButton: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 2,
    backgroundColor: "rgba(0,120,60,0.5)"
  },
  returnCancelButton: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 2,
    backgroundColor: "rgba(0,120,60,0.5)"
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
   controllIcon:{
    textAlign: 'center',
    color:'silver',
    fontSize:10,
    padding:5,
  }
});
