import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FCFCFC',
   // paddingBottom: 5,
  },
  topbar:{
    flex:0.1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  leftTopbar:{
    flex:0.15,
    alignSelf:'center',
  },
  menuIcon:{
    textAlign: 'center',
    color: '#757575',
  },
  midTopbar:{
    flex:0.7,
    alignItems:'center',
    flexDirection: 'row',
  },
  locationText:{
    flex:0.8,
    color:'grey',
    fontSize:14,
    padding: 5,
    fontFamily : 'Helvetica',
    textAlign:'center'
  },
  chevronIcon:{
    flex:0.2,
    textAlign: 'center',
    color: '#757575',
    fontSize: 18,
    paddingTop:3,
  },
  rightTopbar:{
    flex: 0.15,
    alignSelf:'center',
    // justifyContent: "center",
    //flexDirection:"row",
  },
  scrollbar:{
    flex:0.9,
  },
  searchBox: {
    flexDirection: 'row',
    width:width,
    height:55,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchBoxText:{
    lineHeight: 20,
    paddingBottom:10,
    paddingLeft:5,
    color:'#757575',
    fontSize:16,
  },
  offersCarousel:{
    height:220,
    width: width,
    marginTop:5,
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
  wrapper: {

  },
  slides: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  offerImage:{
    height:220,
    width: width,
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  CardView: {
    height: 150,
    backgroundColor: '#fff',
    width:width/1.55,
    padding: 5,
    marginRight:5,
    alignSelf: 'center',
  },
  cards2:{
    width:width/1.67,
    height:130,
    justifyContent:'center',
  },
  cardsHeader:{

  },
  cardsHeaderText:{
    fontFamily: 'Gill Sans',
    paddingLeft: 16,
    fontSize:16,
    padding:10,
    paddingBottom: 0,
    paddingTop: 20,
    color:"#393939",

  },
  cards:{
    margin:0.5,
    width:width/2,
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
    // fontStyle :'italic',
    //fontFamily : 'Roboto-ThinItalic'
  },
  restnameBlock:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingRight: 20,
    paddingLeft: 25,
    paddingTop: 25,
  },
  restName:{
    color: '#fff',
    fontSize: 16,
    flex: .5,
    textAlign: 'right'
  },
  restaurantName:{
    flex:0.5,
    paddingTop: 50,
    textAlign: 'center',
    backgroundColor:'transparent',
    color: 'white',
    fontSize: 16,
  },
  restaurantBrief:{
    flex:0.5,
    flexDirection: 'row',
    justifyContent : 'space-between'
  },
  restaurantDistance:{
    marginLeft:15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantRating:{
    width:32,
    height:28,
    borderRadius: 8,
    // alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:8,
    backgroundColor: '#4BD44E',
  },
  smallCards:{
    margin:5,
    width:width/3.8,
    height:70,
    justifyContent:'center',
  },
});
