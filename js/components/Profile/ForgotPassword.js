import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { resetPassword } from '../../actions/login';
import { Spinner } from "../common/";
import styles from './styles';

const { width } = Dimensions.get("window");
class EditDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      showSpinner:false,
      error:false,
      errorMessage:"",
      disableBtn:false,
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.resetPasswordObj.trying) {
      this.setState({
        showSpinner:true
      })
    }
    else if (nextProps.resetPasswordObj.error) {
      this.setState({
        showSpinner:false,
        error:true,
        disableBtn:false,
        errorMessage:"OTP is not valid",
      })
      this.props.alertMessage.alertWithType('error', 'Error', "Invalid OTP")
    }
  }
  submitOtp(){
    if (this.state.otp === "" || this.state.otp === undefined) {
      this.setState({ error: true, errorMessage: "OTP cannot be blank" });
      this.props.alertMessage.alertWithType('error', 'Error', "OTP cannot be blank");
      return ;
    }else if ((this.state.password1.length <= 0) || (this.state.password2.length <= 0)) {
      this.setState({ error: true, errorMessage: "Password cannot be blank" });
      this.props.alertMessage.alertWithType('error', 'Error', "Password cannot be blank");
      return ;
    }else if (this.state.password1 !== this.state.password2) {
      this.setState({ error: true, errorMessage: "Entered password doesn't match" });
      this.props.alertMessage.alertWithType('error', 'Error', "Entered password doesn't match");
      return ;
    }
    this.setState({
      disableBtn:true
    })
    this.props.resetPassword(this.state.otp, this.state.password1)
  }
  render() {
    return (
      <View style={[styles.mainBlock,{alignItems: 'center', alignSelf: 'center'}]}>
        {/*<View style={{height:30}}>
          {
            this.state.error
            &&
            <Text style={[{color:"red", marginTop:15}]}>{this.state.errorMessage}</Text>
          }
        </View>*/}
        <View style={{borderBottomColor: '#757575', borderBottomWidth: 1,}}>
          <TextInput
            style={{ height: 42, width: width * 0.75, marginTop: 3, paddingLeft:5, fontSize: 18, color: '#757575' }}
            textInputStyle={styles.textInputTextStyle}
            tintColor={"rgba(0,120,60,0.5)"}
            underlineColorAndroid={"transparent"}
            placeholderTextColor ={"grey"}
            placeholder="Enter OTP"
            keyboardType={"numeric"}
            value={this.state.otp}
            onChangeText={(otp) => this.setState({otp:otp, error:false})}
            onFocus={()=>this.setState({otp:''})}
          />
        </View>
        <View style={{borderBottomColor: '#757575', borderBottomWidth: 1,}}>
          <TextInput
            style={{ height: 42, width: width * 0.75, marginTop: 3, paddingLeft:5, fontSize: 18, color: '#757575' }}
            textInputStyle={styles.textInputTextStyle}
            underlineColorAndroid={"transparent"}
            tintColor={"rgba(0,120,60,0.5)"}
            placeholderTextColor ={"grey"}
            placeholder="Enter password"
            secureTextEntry={true}
            value={this.state.password1}
            onChangeText={(pass) => this.setState({password1:pass, error:false})}
            onFocus={()=>this.setState({password1:''})}
          />
        </View>
        <View style={{borderBottomColor: '#757575', borderBottomWidth: 1,}}>
          <TextInput
            style={{ height: 42, width: width * 0.75, marginTop: 3, paddingLeft:5, fontSize: 18, color: '#757575' }}
            textInputStyle={styles.textInputTextStyle}
            underlineColorAndroid={"transparent"}
            tintColor={"rgba(0,120,60,0.5)"}
            placeholderTextColor ={"grey"}
            placeholder="Confirm password"
            secureTextEntry={true}
            value={this.state.password2}
            onChangeText={(pass) => this.setState({password2:pass, error:false})}
            onFocus={()=>this.setState({password2:''})}
          />
        </View>
        <TouchableOpacity
          onPress={()=>this.submitOtp()}
          disabled={this.state.disableBtn}
          style={[styles.guestButton,{marginTop:25}]}
          >
          {
            this.state.showSpinner
            &&
            <Spinner style={[styles.guestButtonText]} size={"small"}/>
          }
          {
            !this.state.showSpinner
            &&
            <Text style={[styles.guestButtonText,{color: '#fff', borderRadius: 5, backgroundColor:'rgba(0,120,60,0.7)', fontWeight: 'bold'}]}>SUBMIT</Text>
          }
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    resetPasswordObj: state.login.resetPassword
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetPassword:(otp,password)=>dispatch(resetPassword(otp,password)),
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(EditDetails);
