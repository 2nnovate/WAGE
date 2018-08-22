import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/authentication';

const propTypes = {
};
const defaultProps = {
};

class Register extends Component {
    state = {
    }
    handleRegister = (email, pw) => {
      return this.props.registerRequest(email, pw).then(
          () => {
              if(this.props.registerStatus === "SUCCESS") {
                  M.toast({html:'Success! Please log in'});
                  this.props.history.push('/login');
                  return true;
              } else {
                  /*
                      ERROR CODES:
                          1: BAD EMAIL
                          2: BAD PASSWORD
                          3: USERNAME EXISTS
                  */
                  let errorMessage = [
                      'Email 형식이 올바르지 않습니다.',
                      '비밀번호가 너무 짧습니다, 4글자 이상 입력해 주세요.',
                      '입력하신 Email은 이미 등록되어 있습니다.'
                  ];

                  let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                  M.toast({html:$toastContent});
                  return false;
              }
          }
      );
    }
    render() {
      const AuthComponent = (
        <Auth mode="register" onRegister={this.handleRegister}/>
      )
      const smartPhoneView1 = (
        <div className="media-320">
          media-320 이하(스마트폰)
          <div>회원가입</div>
          {AuthComponent}
        </div>
      )
      const smartPhoneView2 = (
        <div className="media-768">
          media-321 이상 media-767 이하(스마트폰)
          <div>회원가입</div>
          {AuthComponent}
        </div>
      )
      const tabletView = (
        <div className="media-1024">
          media-768 이상 media-1024 이하(태블릿)
          <div>회원가입</div>
          {AuthComponent}
        </div>
      )
      const pcView = (
        <div className="media-1025">
          media-1025 이상(pc)
          <div>회원가입</div>
          {AuthComponent}
        </div>
      )
        return(
            <div className="section">
              {smartPhoneView1}
              {smartPhoneView2}
              {tabletView}
              {pcView}
            </div>
        );
    }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        registerStatus: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (email, pw) => {
            return dispatch(registerRequest(email, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
