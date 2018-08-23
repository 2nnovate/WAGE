import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LowerMenuBar, Header } from '../components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication';

const propTypes = {
};
const defaultProps = {
};

class App extends Component {
    state = {
    }
    // 세션확인 메소드
    checkSessions = () => {
      return this.props.getStatusRequest().then(
        () => {
          if(this.props.isLoggedIn){
            return
          }else{
            let $toastContent = $('<span style="color: #FFB4BA">세션이 유효하지 않습니다. 다시 로그인 해주세요.</span>');
            M.toast({html:$toastContent});
            return this.props.history.push('/login');
          }
        }
      );
    }
    handleLogout = () => {
      return this.props.logoutRequest().then(
        () => {
          if(!this.props.isLoggedIn){
            let $toastContent = $('<span style="color: #FFB4BA">로그아웃 되었습니다.</span>');
            M.toast({html:$toastContent});
            return
          }else{
            return
          }
        }
      );
    }
    componentDidMount(){
      this.checkSessions();
    }
    render() {
      // console.log(this.props.isLoggedIn);
      // console.log(this.props.location.pathname);
      const smartPhoneMenu = (
        <div className="media-320 media-768">
          <LowerMenuBar currentUser_id={this.props.isLoggedIn?this.props.currentUser_id:undefined}
                        pathName={this.props.location.pathname}/>
        </div>
      )
      const tabletPcMenu = (
        <div className="media-1024 media-1025">
          <Header currentUser_id={this.props.isLoggedIn?this.props.currentUser_id:undefined}
                  onLogout={this.handleLogout}
                  pathName={this.props.location.pathname}/>
        </div>
      )
      return(
          <div className="header-menu-bar">
            {tabletPcMenu}
            {smartPhoneMenu}
          </div>
      );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.authentication.status.isLoggedIn,
      currentUser_id: state.authentication.status.currentUser_id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
