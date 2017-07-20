import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    marginTop: extraTopMargin,
  },
  topbar:{
    flex:0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  mainBlock:{
    flex:0.9,
    marginTop: 10,
    marginLeft:2,
    marginRight: 2,
    backgroundColor: 'transparent',
    flexDirection:'column',
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
   // backgroundColor:'#fff',
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

  //
  // Style for Host(logged in)
  //
  profileView:{
  },
  topHost:{
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom:10,
    height: height * .22,
  },
  userPicView:{
    flexDirection:"row",
    flex: .35,
    justifyContent: 'center',
  },
  userBackground:{
    backgroundColor: 'rgba(0,120,60,0.7)',
    height: 90,
    width: 90,
    borderRadius: 45, 
    marginTop: 15,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  userInitial:{
    paddingBottom: 2,
    paddingLeft: 4,
    color: '#fff',
    fontSize: 50,
    
    alignSelf: 'center',
  },
  userInfo: {
    flex: .55,
    paddingTop: 12,
    marginLeft: 15,
    justifyContent: 'flex-start',
  },
  welcomeText:{
    fontFamily: 'Helvetica',
    fontSize: 18,
    color: '#393939',
  },
  userPhone:{
    paddingTop: 10,
    fontSize:16,
    color: '#393939',
    fontFamily: 'Helvetica',
  },
  editProfile:{
    marginTop: 15,
    flex: .15,
    justifyContent: 'flex-start',
  },
  editIcon: {
    marginRight: 15,
    color: 'rgba(0,120,60,0.7)',
    fontSize: 20,
    alignSelf: 'center',
  },
  userUpdate: {
    flex: .7,
    marginLeft: 10,
    marginRight: 10,
    //justifyContent: 'flex-start',
  },
  userUpdateInput:{
    height: 35,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
  },
  actionButtons:{
    flexDirection: 'row',
    padding: 2,
  },
  cancelButton:{
    marginTop: 5,
    flex: .3,
    marginLeft: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0,120,60,0.7)',
    padding: 5,
    alignItems: 'center',
  },
  cancelText:{
    color: '#fff',
    fontSize: 16,
  },
  divider:{
    alignSelf: 'center',
    width:width - 60,
    height: 1,
    backgroundColor: 'rgba(0,120,60,0.3)',
  },
  bottomHost:{
    padding:25,
  },
  profileControlsTab:{
    flexDirection:'row',
    justifyContent: "space-between"
  },
  squareTabs:{
    width:40,
    height:40,
    backgroundColor:'silver',
    borderColor:'rgba(0,0,0,0.2)',
    borderWidth:1,
  },
  profileControlsText:{
    alignSelf:'center',
    // justifyContent: 'flex-end',
    color:"silver",
    fontSize:18,
    // paddingLeft:25,
  },
  profileControlsTabDivider:{
    alignSelf:'flex-start',
    margin:15,
    marginLeft:0,
    width:width-140,
    height: 1,
    backgroundColor: 'rgba(0,120,60,0.3)',
  },
  //
  // Styles for login view
  //
  phoneCountryCode:{
    // textAlign:'center',
     color: '#7f8c8d',
    // paddingRight:5,
    fontSize:18,
    // paddingTop:0,
  },
  phoneInput:{
    width:width-120,
  },
  submitBtn: {
    marginTop:30,
    width:120,
    backgroundColor:'#757575',
    alignItems:'center',
    justifyContent: 'center',
  },
  submitBtnText:{
    padding:5,
    color:'#fff',
    fontSize:16,
  },
  suggestText: {
    color: '#7f8c8d',
    alignSelf: 'center',
  },
  errorText: {
    color:'#e74c3c',
    fontSize:14,
  },
  forgotPassword: {
    marginTop:25,
    fontStyle: 'italic',
    fontSize:16,
    color: "#7f8c8d",
    fontFamily : 'Roboto-LightItalic'
  },
  textInput: {
    height: 48,
    width: width * 0.75,
    margin: 8,
    borderRadius:5,
    backgroundColor: '#fff',
    color:'#757575',
    fontSize: 18,
    paddingLeft: 19,
    fontFamily : 'Roboto-Light'
  },
  savedaddress:{
    marginTop:15,
    backgroundColor: "#fff",
    padding:10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftSavedAddress:{
    flex:0.7,
  },
  addressHeader:{
    // marginLeft:10,
    fontSize:16,
    color:'#7f8c8d',
    fontFamily: 'Roboto-Regular',
  },
  addressBody:{
    marginTop:10,
    // marginLeft:10,
  },
  addressText:{
    color:'#7f8c8d',
  },
  editAddressButton:{
    paddingTop:1,
    alignSelf: "flex-start",
    alignItems: "center"
  },
  editAddressButtonText:{
    color: "#7f8c8d"
  },
  updateProfileDetailsButton:{
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: "center",
    margin:10,
  },
  signOutBlock:{
    marginTop: 20,
    alignSelf:"center",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(0,120,60,0.7)',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 2,
    marginBottom: 20,
  },
  signOutText:{
    color: '#fff',
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "Helvetica"
  },

  textInputTextStyle:{
    color:"#000",
    marginLeft:10
  },

  editCard:{
    flex: .7,
    backgroundColor: '#fff',
  },
  headingBlock:{
    flex: .2,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  headingText:{
    color: '#393939',
    fontSize: 16,
    fontFamily: 'Helvetica',
  },
  inputBlock: {
    flexDirection: 'row',
    paddingTop: 5,
    marginTop: 10,
    borderBottomColor: '#757575',
    borderBottomWidth: .5,
    flex: 1,
  },
  Icon:{
    fontSize: 20,
    color: 'rgba(0,120,60,0.7)',
    flex: .1,
    textAlign: 'center',
    paddingTop: 2,
  },
  addressBlock:{
    flex: .6,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  heading:{
    fontSize: 16,
    color: '#393939',
    fontFamily: 'Helvetica',
    fontWeight: '500',
  },
  address:{
    fontSize: 14,
    color: '#757575',
    paddingTop: 3,
    paddingBottom: 3,
  },
  actionIcon:{
    flex: .2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginRight: 10,
    paddingTop:2,
  },
  iconClick:{
    flex: .1,
  },

  editAddrIcon:{
    fontSize: 18,
    color: 'rgba(0,120,60,0.7)',
    textAlign: 'center',
  },
  deleteIcon: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  noAddress:{
    flexDirection: 'row',
    //flex: .6,
    padding: 40,
    paddingBottom: 50,
    justifyContent: 'center',
  },
  noAddressText:{
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    marginLeft: 10,
  },
});
