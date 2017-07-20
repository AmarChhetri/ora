import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { clearLoginRedux, checkAvailability, loginUser, registerUser , submitOtpAndPassword, forgotPasswordAsync } from '../../actions/login';
import EmailValidator from "../../utility/validate_email";
import { Spinner } from "../common/";
import PhoneValidator from "../../utility/validate_phone";
import DropdownAlert from 'react-native-dropdownalert';
import Header from '../Header/';
import ForgotPasswordView from './ForgotPassword';
import styles from './styles';

const width = Dimensions.get("window").width;
class LoginView extends Component {
  constructor(props){
    super(props)
    this.state={
      number:'',
      password:'',
      name:'',
      notRegistered: false,
      user: null,
      enterPasswordView:false,
      showSpinner:false,
      showEnterOtpView: false,
      error: false,
      errorMessage: ""
    }
  }
  componentWillReceiveProps(nextProps){
    const loginObject = nextProps.login;
    // console.log("the loginObject is", loginObject);
    const registerObject = nextProps.register;
    if (loginObject.requestingAvailabilty) {
      this.setState({
        showSpinner:true,
      })
    }else if (loginObject.notRegistered && !registerObject.trying && !registerObject.otp && registerObject.init) {
      this.setState({
        notRegistered: true,
        showSpinner:false
      })
    }
    else if (loginObject.requestingLogin) {
      this.setState({
         showSpinner:true,
       })
    }
    else if (loginObject.invalidCredentials) {
      this.setState({
         error: true,
         showSpinner: false,
         errorMessage: "Invalid credentials"
       })
       this.dropdown.alertWithType('error', 'Error', "Invalid credentials")
       loginObject.invalidCredentials = false;
    }
    else if (loginObject.number !== null && !loginObject.notRegistered) {
        this.setState({
          enterPasswordView: true,
          showSpinner:false,
        })
    }
    else if (registerObject.trying) {
      this.setState({
        showSpinner: true,
      })
    }else if (registerObject.otp && !registerObject.init && !loginObject.requestingOtpValidation && !loginObject.otpFailed) {
      this.setState({
        notRegistered: false,
        showEnterOtpView: true,
        showSpinner:false
      })
    }
    else if (!registerObject.otp && !registerObject.init && !registerObject.trying) {
      this.setState({
        showEnterOtpView: true,
        showSpinner:false,
        error: true,
        errorMessage: "Registration failed"
      })
      this.dropdown.alertWithType('error', 'Error', "Registration failed")
    }
    else if (loginObject.requestingOtpValidation && !loginObject.otpFailed) {
      this.setState({
         showSpinner: true,
       })
    }else if (!loginObject.requestingOtpValidation && loginObject.otpFailed) {
      this.setState({
         error: true,
         showSpinner: false,
         errorMessage: "Invalid OTP"
       })
       this.dropdown.alertWithType('error', 'Error', "Invalid OTP")
    }else if (nextProps.forgotPassword.success) {
      this.setState({
        showForgotPasswordView:true
      })
    }
    else if (nextProps.forgotPassword.error) {
      this.setState({
        showForgotPasswordView:false
      })
    }
  }

  //
  //
  //
  exitLogin(){
    this.props.clearLoginRedux();
    this.props.hideLoginView();
  }

  render(){
    return(
      <View style={styles.container}>
        <Header
          style={styles.topbar}
          title={"Enter Details"}
          onBack={()=>this.exitLogin()}
          />
         {this.renderLogin()}
         <DropdownAlert
        ref={(ref) => this.dropdown = ref} 
        />
      </View>
    );
  }

  //
  // Check that the phone looks valid.
  //
  validatePhone(phone) {
    const validate = PhoneValidator.validate(phone);
    if (validate.error) {
      this.setState({ error: validate.error, errorMessage: validate.errorMessage });
      this.dropdown.alertWithType('error', 'Error', validate.errorMessage)
      return ;
    }
    this.submitNumber(phone);
  }


  //
  // Check that the email and name looks valid.
  //
  validateEmail(name,email) {
    const validate = EmailValidator.validate(email);
    if (name === "") {
      this.setState({ error: validate.error, errorMessage: "Name cannot be blank" });
      this.dropdown.alertWithType('error', 'Error', "Name cannot be blank")
      return ;
    }else if (validate.error) {
      this.setState({ error: validate.error, errorMessage: validate.errorMessage });
      this.dropdown.alertWithType('error', 'Error', validate.errorMessage);
      return ;
    }
    this.submitRegisterDetails(name, email);
  }

  //
  // Go to login View
  //

  submitNumber(phone){
    this.props.checkAvailability(phone);
  }

  submitPass(){
    if(this.state.password.length <= 0 ){
      this.dropdown.alertWithType('error', 'Error', 'Password cannot be blank')
      return;
    }
    this.props.loginUser(this.state.password);
  }


  submitOtp(){
    if (this.state.otp === "" || this.state.otp === undefined) {
      this.setState({ error: true, errorMessage: "OTP cannot be blank" });
      this.dropdown.alertWithType('error', 'Error', 'OTP cannot be blank')
      return ;
    }else if (this.state.password1 !== this.state.password2) {
      this.setState({ error: true, errorMessage: "Entered password doesn't match" });
      this.dropdown.alertWithType('error', 'Error', "Entered password doesn't match")
      return ;
    }else if (this.state.password1 === "" || this.state.password2 === undefined) {
      this.setState({ error: true, errorMessage: "Password cannot be blank " });
      this.dropdown.alertWithType('error', 'Error', "Password cannot be blank ")
      return ;
    }
    this.props.submitOtpAndPassword(this.state.otp, this.state.password1)
  }
  //
  // Submit details to register
  //

  submitRegisterDetails(name, email){
    this.props.registerUser(name, email);
  }

  //
  // Goto forgot password
  //

  gotoForgotPassword(){
    this.props.forgotPasswordAsync();
    this.setState({
      disableBtn:true,
      showForgotPasswordView:true
    })
  }
  //
  // Render Profile
  //
  renderLogin(){
    if (this.state.showForgotPasswordView) {
      return <ForgotPasswordView alertMessage={this.dropdown} />
    }
    if (this.state.notRegistered) {
      return(
        <View style={[styles.mainBlock,{alignItems: 'center', alignSelf: 'center', marginTop:25 }]}>
          <Text style={styles.suggestText}>This phone number is not registered with us.</Text>
          <View style={{borderBottomColor: '#757575', borderBottomWidth: 1, marginTop: 10,}}>
            <TextInput
              style={{ height: 40, width: width * 0.75, marginTop: 3, paddingLeft:5, fontSize: 18, }}
              textInputStyle={styles.textInputTextStyle}
              tintColor={"#7f8c8d"}
              maxLength={35}
              underlineColorAndroid={"transparent"}
              placeholderTextColor ={"#7f8c8d"}
              placeholder="Enter your name"
              value={this.state.name}
              onChangeText={(name) => this.setState({name:name, error:false})}
            />
          </View>
          <View style={{borderBottomColor: '#757575', borderBottomWidth: 1,}}>
            <TextInput
              style={{ height: 40, width: width * 0.75, marginTop: 3, paddingLeft:5, fontSize: 18, }}
              textInputStyle={styles.textInputTextStyle}
              tintColor={"#7f8c8d"}
              underlineColorAndroid={"transparent"}
              placeholderTextColor ={"#7f8c8d"}
              placeholder="Enter your email"
              keyboardType={'email-address'}
              autoCapitalize={"none"}
              value={this.state.email}
              onChangeText={(email) => this.setState({email:email, error:false})}
              onSubmitEditing={() => this.validateEmail(this.state.name, this.state.email)}
            />
          </View>

          <TouchableOpacity
            onPress={()=>this.validateEmail(this.state.name, this.state.email)}
            style={[styles.guestButton,{marginTop:25, backgroundColor: '#fff'}]}
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
      )
    }
    if (this.state.showEnterOtpView) {
      return (
        <View style={[styles.mainBlock,{alignItems: 'center', alignSelf: 'center'}]}>
          <View style={{borderBottomColor: '#757575', borderBottomWidth: 1,}}>
            <TextInput
              style={{ height: 40, width: width * 0.75, marginTop: 3, paddingLeft:5, fontSize: 18 }}
              textInputStyle={styles.textInputTextStyle}
              tintColor={"#7f8c8d"}
              underlineColorAndroid={"transparent"}
              placeholderTextColor ={"#7f8c8d"}
              placeholder="Enter OTP"
              keyboardType={"numeric"}
              value={this.state.otp}
              onChangeText={(otp) => this.setState({otp:otp, error:false})}
              onFocus={()=>this.setState({otp:''})}
            />
          </View>
          <View style={{borderBottomColor: '#757575', borderBottomWidth: 1,}}>
            <TextInput
              style={{ height: 40, width: width * 0.75, marginTop: 3, paddingLeft:5, fontSize: 18 }}
              textInputStyle={styles.textInputTextStyle}
              tintColor={"#7f8c8d"}
              maxLength={35}
              underlineColorAndroid={"transparent"}
              placeholderTextColor ={"#7f8c8d"}
              placeholder="Enter password"
              secureTextEntry={true}
              value={this.state.password1}
              onChangeText={(pass) => this.setState({password1:pass, error:false})}
              onFocus={()=>this.setState({password1:''})}
            />
          </View>
          <View style={{borderBottomColor: '#757575', borderBottomWidth: 1,}}>
            <TextInput
              style={{ height: 40, width: width * 0.75, marginTop: 3, paddingLeft:5, fontSize: 18 }}
              textInputStyle={styles.textInputTextStyle}
              tintColor={"#7f8c8d"}
              maxLength={35}
              underlineColorAndroid={"transparent"}
              placeholderTextColor ={"#7f8c8d"}
              placeholder="Confirm password"
              secureTextEntry={true}
              value={this.state.password2}
              onChangeText={(pass) => this.setState({password2:pass, error:false})}
              onFocus={()=>this.setState({password2:''})}
            />
          </View>
          <TouchableOpacity
            onPress={()=>this.submitOtp()}
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
    if (this.state.enterPasswordView) {
      return(
        <View style={[styles.mainBlock,{alignItems: 'center', alignSelf: 'center'}]}>
          <View style={{height:30}}>
          </View>
          <View style={{borderBottomColor: '#757575', borderBottomWidth: 1,}}>
            <TextInput
              style={{ height: 40, width: width * 0.75, marginTop: 3, paddingLeft:5, fontSize: 18 }}
              textInputStyle={[styles.textInputTextStyle]}
              tintColor={"#7f8c8d"}
              underlineColorAndroid={"transparent"}
              placeholderTextColor ={"#7f8c8d"}
              placeholder="Enter password"
              secureTextEntry={true}
              maxLength={35}
              placeholderTextColor ={"#7f8c8d"}
              value={this.state.password}
              onChangeText={(pass) => this.setState({password:pass, error:false})}
              onFocus={()=>this.setState({password:''})}
              onSubmitEditing={() => this.submitPass()}
            />
          </View>
          <TouchableOpacity
              disabled={this.state.disableBtn}
              onPress={()=>this.gotoForgotPassword()}
          >
            <Text style={styles.forgotPassword} >Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>this.submitPass()}
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
    return(
      <View style={[styles.mainBlock,{alignItems: 'center', alignSelf: 'center'}]}>
      <View style={{height:30}}>
        {/*{
          this.state.error
          &&
          <Text style={[{color:"#e74c3c", marginTop:15}]}>{this.state.errorMessage}</Text>
        }*/}
      </View>
        <View style={{flexDirection: 'row', alignItems:'center',justifyContent: "center"}}>
          <Text style={styles.phoneCountryCode}>+91</Text>
          <View style={{borderBottomColor: '#757575', borderBottomWidth: 1,}}>
            <TextInput
            style={{ height: 40, width: width * 0.75, paddingLeft:5, marginTop: 3, color: '#757575', fontSize: 18 }}
            textInputStyle={styles.textInputTextStyle}
            tintColor={"#7f8c8d"}
            underlineColorAndroid={"transparent"}
            placeholderTextColor ={"#7f8c8d"}
            placeholder="Enter mobile number"
            keyboardType={"phone-pad"}
            value={this.state.number}
            onChangeText={(num) => this.setState({number:num, error:false})}
            // onFocus={()=>this.setState({number:''})}
            onSubmitEditing={() => this.validatePhone(this.state.number)}
          />
          </View>
        </View>

        <TouchableOpacity
          onPress={()=>this.validatePhone(this.state.number)}
          disabled={this.state.disableBtn}
          style={[styles.guestButton,{marginTop:25}, { borderColor: 'transparent'}]}>
          {
            this.state.showSpinner
            &&
            <Spinner style={[styles.guestButtonText]} size={"small"}/>
          }
          {
            !this.state.showSpinner
            &&
            <Text 
            style={[styles.guestButtonText,{color: '#fff', borderRadius: 5, backgroundColor:'rgba(0,120,60,0.7)', fontWeight: 'bold' }]}
            >
              SUBMIT
            </Text>
          }
        </TouchableOpacity>
      </View>
    );
  }

}
function mapStateToProps (state) {
  return {
    login: state.login,
    register: state.login.register,
    forgotPassword: state.login.forgotPassword,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    clearLoginRedux:()=>dispatch(clearLoginRedux()),
    checkAvailability:(phoneNumber)=>dispatch(checkAvailability(phoneNumber)),
    loginUser:(pass)=>dispatch(loginUser(pass)),
    forgotPasswordAsync:()=>dispatch(forgotPasswordAsync()),
    registerUser:(name,email)=>dispatch(registerUser(name,email)),
    submitOtpAndPassword:(otp,password)=>dispatch(submitOtpAndPassword(otp,password)),
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginView);
