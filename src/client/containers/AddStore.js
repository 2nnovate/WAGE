import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StoreForm } from '../components';
import { connect } from 'react-redux';
import { registerStoreRequest } from '../actions/store';

const propTypes = {
};
const defaultProps = {
};

class AddStore extends Component {
    state = {
    }
    handleAddStore = (obj) => {
      return this.props.registerStoreRequest(obj).then(
        () => {
          if(this.props.postStatus === "SUCCESS"){
            M.toast({html:'가게등록에 성공했습니다!'});
            this.props.history.push('/admin');
            return true;
          }else{
            let $toastContent;
            switch(this.props.postErrorCode) {
                case 1:
                    // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                    $toastContent = $('<span style="color: #FFB4BA">가게를 등록할 권한이 없습니다.</span>');
                    M.toast({html:$toastContent});
                    setTimeout(()=> {location.reload(false);}, 2000);
                    break;
                case 2:
                    $toastContent = $('<span style="color: #FFB4BA">입력한 데이터의 형식 중 잘못된 것이 있습니다.</span>');
                    M.toast({html:$toastContent});
                    break;
                default:
                    $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                    M.toast({html:$toastContent});
                    break;
              }
              return false;
          }
        }
      )
    }
    render() {
      const form =(
        <StoreForm mode="register" onAddStore={this.handleAddStore}/>
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

const mapStateToProps = (state) => {
    return {
      postStatus: state.store.post.status,
      postErrorCode: state.store.post.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerStoreRequest: (obj) => {
            return dispatch(registerStoreRequest(obj));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddStore);
