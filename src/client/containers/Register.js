import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LowerMenuBar, Header, Auth } from '../components';

const propTypes = {
};
const defaultProps = {
};

class Register extends Component {
    state = {
    }
    render() {
      const smartPhoneView1 = (
        <div className="media-320">
          media-320 이하(스마트폰)
          <div>회원가입</div>
          <Auth mode="register"/>
          <LowerMenuBar />
        </div>
      )
      const smartPhoneView2 = (
        <div className="media-768">
          media-321 이상 media-767 이하(스마트폰)
          <div>회원가입</div>
          <Auth mode="register"/>
          <LowerMenuBar />
        </div>
      )
      const tabletView = (
        <div className="media-1024">
          media-768 이상 media-1024 이하(태블릿)
          <div>회원가입</div>
          <Auth mode="register"/>
        </div>
      )
      const pcView = (
        <div className="media-1025">
          media-1025 이상(pc)
          <div>회원가입</div>
          <Auth mode="register"/>
        </div>
      )
        return(
            <div className="section">
              <Header />
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

export default Register;
