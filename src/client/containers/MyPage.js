import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LowerMenuBar, Header } from '../components';

const propTypes = {
};
const defaultProps = {
};

class MyPage extends Component {
    state = {
    }
    render() {
      const logoutButton = {

      }
      const smartPhoneView1 = (
        <div className="media-320">
          media-320 이하(스마트폰)
          {this.props.match.params.user_id}
          <div>My Page</div>
        </div>
      )
      const smartPhoneView2 = (
        <div className="media-768">
          media-321 이상 media-767 이하(스마트폰)
          <div>My Page</div>
          {this.props.match.params.user_id}
        </div>
      )
      const tabletView = (
        <div className="media-1024">
          media-768 이상 media-1024 이하(태블릿)
          <div>My Page</div>
          {this.props.match.params.user_id}
        </div>
      )
      const pcView = (
        <div className="media-1025">
          media-1025 이상(pc)
          <div>My Page</div>
          {this.props.match.params.user_id}
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

MyPage.propTypes = propTypes;
MyPage.defaultProps = defaultProps;

export default MyPage;
