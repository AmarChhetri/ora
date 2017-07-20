import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fcfcfc',
  },
  topbar:{
    flex:0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  mainBlock:{
    flex:0.9,
    backgroundColor: 'transparent',
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  notifications:{
    backgroundColor:'white',
    flexDirection: 'row',
    padding:5,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.5,
    alignItems:'center',
    paddingBottom: 15,
  },
  leftNoti:{
    flex: 0.15,
    alignItems:'center',
    justifyContent:'center',
  },
  pic:{
    alignSelf:'flex-start',
    marginLeft: 10
    // width:75,
    // height:75
  },
  rightNoti:{
    flex:0.75,
    flexDirection: 'column',
    alignItems:'center'
  },
  rightNotiTop:{
    flex:0.7,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  notiTopLeft:{
    flex: 0.8,
    padding:5,
  },
  orderStatus:{
    fontSize:16,
    fontStyle :'italic',
    fontFamily : 'Iowan Old Style',
  },
  restroName:{
    fontSize:16,
    fontFamily : 'Iowan Old Style',
  },
  notiTopRight:{
    width:20,
    height:20,
    borderRadius:10,
    marginTop:8,
    marginRight:15,
    alignItems:'center',
  },
  closeIcon:{
    fontSize:14,
    textAlign:'center',
  },
  rightNotiBottom:{
    flex:0.2,
    flexDirection:'row',
    padding:5,
    justifyContent:'space-between',
    borderWidth:1,
    borderColor:'silver'
  },
  dateAndTime:{
    alignSelf:'center',
    justifyContent: 'center',
    textAlign:'center',
  },
  viewButton:{
    backgroundColor:'grey',
    width:60,
    height:25,
    alignItems:'center',
    alignSelf:'center',
    justifyContent: 'center',
  },
  buttonText:{
    color:'white',
    fontSize:12,
    textAlign:'center',
  },
  notificationsOOpsText:{
    paddingTop: 15,
    fontFamily:'Roboto-Regular',
    color: "grey",
    fontSize:18,
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
});
