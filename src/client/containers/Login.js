import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

const propTypes = {
};
const defaultProps = {
};

class Login extends Component {
    state = {
    }
    handleLogin = (email, pw) => {
        return this.props.loginRequest(email, pw).then(
            () => {
                if(this.props.loginStatus === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        email: email
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    M.toast({html:'Welcome, ' + email + '!'});
                    this.props.history.push('/mypage/'+this.props.currentUser_id);
                    // 리턴 값에 따라 인풋창 비우기(auth 컴포넌트의 state 초기화)
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect email or password</span>');
                    M.toast({html:$toastContent});
                    // 리턴 값에 따라 인풋창 비우기(auth 컴포넌트의 state 초기화)
                    return false;
                }
            }
        );
    }
    render() {
      const loginButton = (
        <Auth mode="login" onLogin={this.handleLogin}/>
      )
      const smartPhoneView1 = (
        <div className="media-320">
          media-320 이하(스마트폰)
          {loginButton}
          <div>로그인</div>
        </div>
      )
      const smartPhoneView2 = (
        <div className="media-768">
          media-321 이상 media-767 이하(스마트폰)
          <div>로그인</div>
          {loginButton}
        </div>
      )
      const tabletView = (
        <div className="media-1024">
          media-768 이상 media-1024 이하(태블릿)
          <div>로그인</div>
          {loginButton}
        </div>
      )
      const pcView = (
        <div className="media-1025">
          media-1025 이상(pc)
          <div>로그인</div>
          {loginButton}
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

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
      loginStatus: state.authentication.login.status, //waiting, success, failure 중에 하나로 로그인 상태를 알려줌.
      currentUser: state.authentication.status.currentUser,
      currentUser_id: state.authentication.status.currentUser_id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (email, pw) => {
            return dispatch(loginRequest(email,pw)); //실제 로그인을 실행하는 thunk (백엔드와 통신) - 실행함수
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
