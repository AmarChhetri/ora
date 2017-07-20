import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === "ios" ? 20 : 0;
const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    marginTop:extraTopMargin,
    flex: 1,
    backgroundColor:'orange',
  },
  topbar:{
    flex:0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  mainBlock:{
    flex:0.9,
    // padding:10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  CardView: {
    height: 150,
    backgroundColor: '#fff',
    width:width/1.55,
    padding: 5,
    marginRight:5,
    alignSelf: 'center',
  },
  cardView:{
    // marginTop:2,
    margin: 2,
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
  cards:{
    margin:0.5,
    width:width/2 - 12,
    height:160,
    justifyContent:'center',
  },
  cards2:{
    width:width/1.67,
    height:130,
    justifyContent:'center',
  },
  headerDishes:{
    textAlign:'center',
    backgroundColor:'transparent',
    color: 'white',
    fontSize: 16,
  },
  italicText:{
    fontStyle :'italic',
    fontFamily : 'Iowan Old Style'
  },
  restaurantNameView:{
    paddingTop:20,
    flex:0.8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  restaurantName:{
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    fontWeight:'600',
    textAlign: 'center'
  },
  productName: {
    textAlign:'center',
    backgroundColor:'transparent',
    color: 'white',
    fontSize: 16,
    //fontStyle :'italic',
    //fontFamily : 'Iowan Old Style'
  },
  restaurantBrief:{
    flex:0.2,
    flexDirection: 'row',
  },
  restaurantDistance:{
    marginLeft:15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantRating:{
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:8,
  },
  offersCarousel:{
    height:160,
    width: width,
    marginTop:10,
  },
  dotStyle:{
    backgroundColor: 'rgba(0,0,0,.1)',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 3,
    marginRight: 3,
    marginTop: 40,
    marginBottom: 3,
  },
  dotActiveStyle:{
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 40,
    marginBottom: 3
  },
  productDetailsContainer:{
    flex:1,
  },
  productCarouselView:{
    flex:0.4
  },
  productOtherView:{
    flex:0.5,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 5,
  },
  productDetailsSection:{
    flex: 1,
    padding: 15,
    backgroundColor: "white",
    flexDirection: "column"
  },
  relatedProductsSection:{
    flexDirection: "row",
    padding:2,
    flexWrap:'wrap',
  },
  productDetailsLeft:{
    flex:0.6,
    flexDirection:"column",
  },
  productNameView:{
    flex:0.1,
    flexDirection: "row"
  },
  productReturnPolicy:{
    flex:0.1,
    paddingTop:10,
  },
  productControlsView:{
    marginTop:10,
    flex:0.4,
    flexDirection: "row",
  },
  productNameText:{
    color:"#393939",
    fontSize:16,
    fontFamily : "Roboto-Medium"
  },
  productDescView:{
    paddingTop:10,
    flex:0.4
  },
  productDescription:{
    color:"grey",
  },
  cardsHeader:{
    marginTop: 5,
  },
  cardsHeaderText:{
    fontSize:16,
    fontWeight: '600',
    padding:10,
    paddingTop: 20,
    paddingBottom: 0,
    color:"#393939",

  },
  productOtherSection:{
    flex:1,
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems:"center"
  },
  otherSectionLeft:{
    flex:0.7,
  },
  dopText:{
    fontSize:12,
    fontFamily:"Roboto-LightItalic",
    color:"grey"
  },
  otherSectionRight:{
    flex:0.3
  },
  productDetailsRight:{
    flex:0.4,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "flex-end",
  },
  top:{
    flex:0.33
  },
  priceText:{
    fontSize: 16,
    fontFamily : 'Iowan Old Style'
  },
  middle:{
    flex:0.33,
    margin:5,
    flexDirection: 'row',
    alignItems:"center",
    justifyContent: "center"
  },
  buttonStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: "silver",
    borderWidth:1,
    margin:8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    textAlign: 'center',
    color:'silver',
    fontSize:10,
  },
  bottom:{
    flex:0.33,
    marginTop:5,
  },
  buyButton:{
    padding:5,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:"rgba(0,120,60,0.7)",
    borderRadius: 2,
  },
  buyButtonText:{
    color:"white"
  },

  itemPill : {
    borderWidth: 5,
    borderRadius: 15,
    width:60,
    marginRight: 5,
    backgroundColor: 'blue'

  },
  productPrice:{
    color:'#fff',
    fontWeight: '600',
    fontSize: 13
  },
  carouselImage:{
    height:220,
    width: width,
  },
  wrapper: {
  },
  relatedProductsHeadingText:{
    fontSize:18,
    fontStyle :'italic',
    fontFamily : 'Iowan Old Style'
  }
});
