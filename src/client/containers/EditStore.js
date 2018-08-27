import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StoreForm } from '../components';
import { connect } from 'react-redux';
import { getOneStore, editStore } from '../actions/store';

const propTypes = {
};
const defaultProps = {
};

class EditStore extends Component {
    state = {
    }
    handleGetOneStore = (_id) => {
      return this.props.getOneStore(_id);
    }
    handleEditStore = (store_id, storeInfromObj) => {
      return this.props.editStore(store_id, storeInfromObj).then(
        () => {
          if(this.props.editStoreStatus === 'SUCCESS'){
            M.toast({html:'가게정보를 수정했습니다!'});
            this.props.history.push('/admin');
            return true;
          }else{
            let $toastContent;
            switch(this.props.postErrorCode) {
                case 1:
                    // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                    $toastContent = $('<span style="color: #FFB4BA">가게를 수정할 권한이 없습니다.</span>');
                    M.toast({html:$toastContent});
                    setTimeout(()=> {location.reload(false);}, 2000);
                    break;
                case 2:
                    $toastContent = $('<span style="color: #FFB4BA">_id 형식이 잘못되었습니다.</span>');
                    M.toast({html:$toastContent});
                    break;
                case 2:
                    $toastContent = $('<span style="color: #FFB4BA">_id 에 해당하는 가게 정보가 없습니다.</span>');
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
    componentDidMount(){
      this.handleGetOneStore(this.props.match.params.store_id);
    }
    render() {
      // console.log(this.props.oneStoreData)
      const form =(
        <StoreForm mode="edit" data={this.props.oneStoreData}
                  onEdit={this.handleEditStore}/>
      )
      const smartPhoneMenu = (
        <div className="media-320 media-768">
          {this.props.match.params.store_id}
          {form}
        </div>
      )
      const tabletPcMenu = (
        <div className="media-1024 media-1025">
          {this.props.match.params.store_id}
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

EditStore.propTypes = propTypes;
EditStore.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
      getOneStoreStatus: state.store.oneStore.status,
      oneStoreData: state.store.oneStore.data,
      editStoreStatus: state.store.edit.status,
      editStoreError: state.store.edit.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOneStore: (store_id) => {
            return dispatch(getOneStore(store_id));
        },
        editStore: (store_id, storeInfromObj) => {
            return dispatch(editStore(store_id, storeInfromObj));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditStore);
