import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { RadioButton, Spinner } from '../common/';
import { orderViaCod, payViaCreditDebit } from '../../actions/placeorder';
import { removeAndClearShoppingBag } from '../../actions/shopping-bag';
import { setActiveTab } from '../../actions/tab';
import { clearPlaceOrder } from '../../actions/placeorder';
import { removeAndClear } from '../../actions/cart';
import Header from '../Header/';
import Payment from './paymentWebview';
import styles from './styles';


class Pay extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedMode:null,
      showWebView: false,
    }
  }


  componentWillMount(){
    this.setState({
      selectedMode:null,
      showWebView: false,
    })
  }

  componentWillUnmount(){
    this.props.clearPlaceOrder();
  }

  componentWillReceiveProps(nextProps){
    const codStatus = nextProps.codStatus;
    const debitCredit = nextProps.confirmOrderObject.debitCredit;
    if ( debitCredit.long_url !== null && !debitCredit.error )  {
      this.setState({
        showWebView:true,
      })
    }
    if (codStatus.isFetching) {
      this.setState({
        showSpinner:true,
      })
    }else if (codStatus.done) {
      this.setState({
        showSpinner: false,
      })
      this.props.setActiveTab('orders');
      this.removeRespectiveLewra();
      this.props.navigator.resetTo({
        id:'tabs',
      })
    }
    else if ((codStatus.error)) {
      this.setState({
        showSpinner: false,
        error:true,
        errorMessage: "Order could not be place !!"
      })
    }
  }
  removeRespectiveLewra(){
    const { from } = this.props;
    if (from === 'food') {
      this.props.removeAndClear();
      return ;
    }
    this.props.removeAndClearShoppingBag();
  }
  //selecCreditDebit(order_id, payable_price){
    selecCreditDebit(order_id, payable_price, from){
    this.setState({selectedMode : 0})
    this.props.payViaCreditDebit(order_id, payable_price, from);
  }
  selectCod(){
    this.setState({selectedMode : 1})
  }

  onFailure(){
    this.setState({
      showWebView:false,
      error:true,
      errorMessage: "Order could not be place !!"
    })
  }
  onSuccess(){
    this.setState({
      showWebView:false,
    })
    this.props.setActiveTab('orders');
    this.props.removeAndClear();
    this.props.navigator.resetTo({
      id:'tabs',
    })
  }

  renderButtonIcon(){
    if (this.state.showSpinner) {
      return <Spinner size="large" color={"#fff"}/>
    }
    return <Text style={styles.buttonText}>PAY & ORDER</Text>
  }
  render() {

    if (this.state.showSpinner2) {
      return <View style={{justifyContent:"center",flex:1,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <Spinner size="large" color={"#fff"} />
            </View>
    }

    if (this.state.showWebView) {
      return <Payment
        navigator={this.props.navigator}
        onSuccess={()=>this.onSuccess()}
        onFailure={()=>this.onFailure()}
        url={this.props.confirmOrderObject.debitCredit.long_url}/>
    }
    const { order_id, foodBagTotal, shoppingBagTotal, activeHomepage, from } = this.props;
    const payable_price = from === 'food' ? foodBagTotal : shoppingBagTotal;
    return (
      <View style={styles.container}>
      <Header
        onBack={()=>this.props.navigator.pop()}
        style={styles.topbar}
        title={"Pay"}/>
        <View style={styles.mainContainer}>
          <View style={{height:10}}>
            {
              this.state.error
              &&
              <Text style={[{color:"red"}]}>{this.state.errorMessage}</Text>
            }
          </View>
           <TouchableOpacity
              onPress={()=>this.selecCreditDebit(order_id, payable_price, from)}
              style={styles.radioButton}>
              <View style={styles.radioBlock}>
                <RadioButton selected={this.state.selectedMode === 0}/>
                <Text style={styles.radioText}>CREDIT/DEBIT</Text>
              </View>
           </TouchableOpacity>

          <TouchableOpacity
              onPress={()=>this.selectCod()}
              style={styles.radioButton}>
             <View style={styles.radioBlock}>
                <RadioButton selected={this.state.selectedMode === 1}/>
                <Text style={styles.radioText}>Cash on delivery</Text>
             </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottombar}>
          <View
            style={styles.addAddressLeftButton}
            // onPress={()=>this.gotoPay()}
            >
            <Text style={styles.totalPrice}>TOTAL ₹ {payable_price}</Text>
          </View>
          <TouchableOpacity
            style={styles.addAddressRightButton}
            onPress={()=>this.props.orderViaCod(order_id, from)}
            disabled={this.state.selectedMode === 0 || this.state.selectedMode === null}
            >
            { this.renderButtonIcon()}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    order_id:state.placeorder.order_id,
    shoppingBagTotal:state.shoppingBag.payable_price,
    activeHomepage:state.tab.activeHomepage,
    foodBagTotal: state.cart.payable_price,
    user:state.user.user,
    confirmOrderObject: state.confirmorder,
    codStatus: state.confirmorder.cod,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    orderViaCod:(order_id, from)=>dispatch(orderViaCod(order_id, from)),
    setActiveTab:(tab)=>dispatch(setActiveTab(tab)),
    removeAndClear:()=>dispatch(removeAndClear()),
    clearPlaceOrder:()=>dispatch(clearPlaceOrder()),
    removeAndClearShoppingBag:()=>dispatch(removeAndClearShoppingBag()),
    payViaCreditDebit:(order_id, amount, from)=>dispatch(payViaCreditDebit(order_id, amount, from)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pay)
