import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LowerMenuBar, Header } from '../components';
import { connect } from 'react-redux';
import { getStatusRequest } from '../actions/authentication';

const propTypes = {
};
const defaultProps = {
};

class App extends Component {
    state = {
    }
    // 세션확인 메소드
    checkSessions = () => {
      this.props.getStatusRequest();
    }
    componentDidMount(){
      this.checkSessions();
    }
    render() {
      console.log(this.props.sessionValidity)
      const smartPhoneView1 = (
        <div className="media-320">
          <LowerMenuBar />
        </div>
      )
      const smartPhoneView2 = (
        <div className="media-768">
          <LowerMenuBar />
        </div>
      )
      return(
          <div className="header-menu-bar">
            <Header currentUser_id={this.props.sessionValidity?this.props.currentUser_id:undefined}/>
            {smartPhoneView1}
            {smartPhoneView2}
          </div>
      );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
      sessionValidity: state.authentication.status.valid,
      currentUser_id: state.authentication.status.currentUser_id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
