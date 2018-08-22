import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  mode: PropTypes.string,
  onLogin: PropTypes.func,
  onRegister: PropTypes.func
};
const defaultProps = {
  mode: "login",
  onLogin: () => {console.log('login functions is undefined')},
  onRegister: () => {console.log('register functions is undefined')}
};
// mode props 가 login 이면 로그인, register 면 회원가입
class Auth extends Component {
    state = {
      email: "",
      password: ""
    }
    //인풋창과 컴포넌트 state 를 실시간으로 매칭
    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    //엔터키가 눌렸을 때 실행하도록
    handleKeyPress = (e) => {
        if(e.charCode==13) {
            if(this.props.mode==="login") {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }
    //로그인실행 (Auth 컴포넌트의 state를 이용하여)
    handleLogin = () => {
        let email = this.state.email;
        let pw = this.state.password;
        // 상위 컴포넌트(Login)에서 onLogin props로 전달받은 함수의 리턴값이 true/false 냐에 따라 password state/input 창 초기화
        this.props.onLogin(email, pw).then(
          // returnValue 는 리턴값을 의미함
            (returnValue) => {
                if(!returnValue) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }
    handleRegister = () => {
        let id = this.state.email;
        let pw = this.state.password;

        this.props.onRegister(id, pw).then(
            (returnValue) => {
                if(!returnValue) {
                    this.setState({
                        email: '',
                        password: ''
                    });
                }
            }
        );
    }
    render() {
      const button = (
        <div className="login-register-button waves-effect waves-light btn" onClick={this.props.mode==="login"?this.handleLogin:this.handleRegister}>
          {this.props.mode==="login"?"로그인":"회원가입"}
        </div>
      )
      const findAccounts = (
        <div className="button-find-account">
          <Link to="#">
            이메일/비밀번호 찾기
          </Link>
        </div>
      )
      const inputField = (
        <div className="row local-input-field">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input placeholder="이메일"
                        name="email"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.email} />
              </div>
              <div className="input-field col s12">
                <input placeholder="비밀번호"
                        name="password"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.password}
                        onKeyPress={this.handleKeyPress} />
              </div>
            </div>
          </form>
        </div>
      );
      // console.log(this.state)
        return(
            <div className="auth-container">
              {inputField}
              {button}
              {this.props.mode==="login"?findAccounts:undefined}
            </div>
        );
    }
}

Auth.propTypes = propTypes;
Auth.defaultProps = defaultProps;

export default Auth;
