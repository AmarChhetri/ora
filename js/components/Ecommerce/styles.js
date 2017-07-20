import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FCFCFC',
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
    //justifyContent: 'center',
  },
   rightTopbar:{
    flex: 0.15,
    alignSelf:'center',
    // justifyContent: "center",
    //flexDirection:"row",
  },
  chevronIcon:{
    flex:0.2,
    textAlign: 'center',
    color: '#757575',
    fontSize: 18,
    paddingTop:3,
  },
  headerText:{
    flex:0.8,
    color:'grey',
    fontSize:18,
    padding: 5,
    textAlign: 'center',
    fontFamily : 'Roboto-Regular'
  },
  scrollbar:{
    flex:0.9,
    paddingBottom: 5,
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
  textInput:{
    height:60,
    textAlign:'center',
    color:'grey',
    width:width,
    // marginLeft:20,
  },
  offersCarousel:{
    height:220,
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
  bestinTownSection:{
    // flexDirection:'column',
  },
  cardsHeader:{
  },
  cardsHeaderText:{
    fontSize:16,
    fontWeight: '600',
    padding:10,
    paddingTop: 20,
    paddingBottom: 0,
    color:"#393939",

  },
  CardView: {
    height: 150,
    backgroundColor: '#fff',
    width:width/1.55,
    padding: 5,
    marginRight:5,
    alignSelf: 'center',
  },
  cards:{
    width:width/1.67,
    height:130,
    justifyContent:'center',
    // margin:.5,
    // width:width/2,
    // height:130,
    // justifyContent:'center',
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
    // fontStyle :'italic',
    // fontFamily : 'Iowan Old Style'
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
});
