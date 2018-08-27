import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneStore, deleteStore } from '../actions/store';

const propTypes = {
};
const defaultProps = {
};

class RemoveStore extends Component {
    state = {
    }
    handleGetOneStore = () => {
      return this.props.getOneStore(this.props.match.params.store_id);
    }
    handleRemoveStore = () => {
      return this.props.deleteStore(this.props.match.params.store_id).then(
        () => {
          if(this.props.deleteStoreStatus === 'SUCCESS'){
            M.toast({html:'가게를 삭제했습니다!'});
            this.props.history.push('/admin');
            return true;
          }else{
            let $toastContent;
            switch(this.props.postErrorCode) {
                case 1:
                    // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                    $toastContent = $('<span style="color: #FFB4BA">_id 형식이 잘못 되었습니다.</span>');
                    M.toast({html:$toastContent});
                    setTimeout(()=> {location.reload(false);}, 2000);
                    break;
                case 2:
                    $toastContent = $('<span style="color: #FFB4BA">가게를 삭제할 권한이 없습니다.</span>');
                    M.toast({html:$toastContent});
                    break;
                case 2:
                    $toastContent = $('<span style="color: #FFB4BA">해당 가게가 존재하지 않습니다.</span>');
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
    handleCancelRemove = () =>{
      M.toast({html:'삭제를 취소하셨습니다. 관리자 화면으로 이동합니다.'});
      this.props.history.push('/admin');
    }
    componentDidMount(){
      this.handleGetOneStore();
    }
    render() {
      const buttons =(
        <div className="delete-buttons">
          <div className="btn-large waves-effect waves-light blue"
                onClick={this.handleCancelRemove}>
            NO
          </div>
          <div className="btn-large waves-effect waves-light red"
                onClick={this.handleRemoveStore}>
            DELETE
          </div>
        </div>
      )
      const confirmView = (
        <div className="delete-confirm-view center">
          가게명
          <h1>{"'"+this.props.oneStoreData.name+"'"}</h1>
          data를 삭제 하시겠습니까?
          {buttons}
        </div>
      )
      const smartPhoneMenu = (
        <div className="media-320 media-768">
          {confirmView}
        </div>
      )
      const tabletPcMenu = (
        <div className="media-1024 media-1025">
          {confirmView}
        </div>
      )
      console.log(this.props.oneStoreData)
        return(
            <div className="section">
              {tabletPcMenu}
              {smartPhoneMenu}
            </div>
        );
    }
}

RemoveStore.propTypes = propTypes;
RemoveStore.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
      getOneStoreStatus: state.store.oneStore.status,
      oneStoreData: state.store.oneStore.data,
      deleteStoreStatus: state.store.remove.status,
      deleteStoreError: state.store.remove.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOneStore: (store_id) => {
            return dispatch(getOneStore(store_id));
        },
        deleteStore: (store_id) => {
            return dispatch(deleteStore(store_id));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RemoveStore);
