import { StyleSheet, Platform, Dimensions } from 'react-native';

const extraTopMargin = Platform.OS === 'ios' ? 20 : 0;
const { width, height } = Dimensions.get('window');
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: extraTopMargin,
    backgroundColor: '#FCFCFC',
  },
  topbar: {
    flex: 0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 0.9,
    padding: 5,
  },
  headers: {
    fontFamily: 'Roboto-Regular',
    color: 'grey',
    fontSize: 18,
  },
  savedaddress: {
    marginTop: 15,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSavedAddress: {
    flex: 0.7,
  },
  addressHeader: {
    // marginLeft:10,
    fontSize: 16,
    color: 'grey',
    fontFamily: 'Roboto-Regular',
  },
  addressBody: {
    marginTop: 10,
    // marginLeft:10,
  },
  addressText: {
    color: 'grey',
  },
  rightSavedAddress: {
    flex: 0.3,
    alignSelf: 'center',
  },
  deliverButton: {
    alignSelf: 'center',
    backgroundColor: 'silver',
  },
  deliverButtonText: {
    fontSize: 16,
    color: 'grey',
    padding: 10,
  },
  divider: {
    width: width - 30,
    height: 1,
    backgroundColor: 'rgba(211,211,211,1)',
    marginTop: 35,
    marginBottom: 30,
  },
  addnewAddress: {
    marginTop: 0,
    backgroundColor: '#fff',
    padding: 0,
    alignItems: 'center',
    // shadowColor: 'rgba(0,120,60,0.5)',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 1,
    // shadowOpacity: 0.3,
    paddingBottom: 20,
  },
  textInput: {
    height: 40,
    backgroundColor: 'transparent',
    width: width - 30,
    color: 'grey',
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: 'Roboto-Light',
  },
  divider2: {
    width: width - 40,
    height: 1,
    backgroundColor: 'silver',
  },
  addressline3: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textInput2: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    flex: 0.3,
    color: 'grey',
    fontSize: 14,
    paddingLeft: 5,
    fontFamily: 'Roboto-Regular',
  },
  divider3: {
    width: 114,
    marginLeft: 5,
    height: 1,
    backgroundColor: 'silver',
  },
  addAddressButtons: {
    flexDirection: 'row',
  },
  addAddressLeftButton: {
    flex: 0.65,
    alignItems: 'center',
    backgroundColor: 'rgba(0,120,60,0.8)',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
    padding: 10,
    fontFamily: 'Roboto-Regular',
  },
  addAddressRightButton: {
    flex: 0.35,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  headingBlock: {
    borderBottomColor: '#757575',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    width: width

  },
  headingText: {
    color: '#393939',
    fontSize: 16,
    fontFamily: 'Helvetica',
  },
});
