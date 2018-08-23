import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StoreForm } from '../components';

const propTypes = {
};
const defaultProps = {
};

class AddStore extends Component {
    state = {
    }
    render() {
      const form =(
        <StoreForm mode="register"/>
      )
      const smartPhoneMenu = (
        <div className="media-320 media-768">
          관리자 페이지 - 가게등록
          {form}
        </div>
      )
      const tabletPcMenu = (
        <div className="media-1024 media-1025">
          관리자 페이지 - 가게등록
          {form}
        </div>
      )
        return(
            <div className="section">
              {tabletPcMenu}
              {smartPhoneMenu}
            </div>
        );
    }
}

AddStore.propTypes = propTypes;
AddStore.defaultProps = defaultProps;

export default AddStore;
