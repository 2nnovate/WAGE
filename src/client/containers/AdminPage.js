import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllStores } from '../actions/store';
import { StoreList } from '../components';

const propTypes = {
};
const defaultProps = {
};

class AdminPage extends Component {
    state = {
      storeLists: []
    }
    handleGetAllStore = () => {
      return this.props.getAllStores();
    }
    componentDidMount(){
      this.handleGetAllStore().then(
        ()=>{
          this.setState({
            storeLists: this.props.lists
          })
      });
    }
    render() {
      const goToAddStoreButton = (
        <Link to="/admin/add-store" className="waves-effect waves-light btn">
          가게 등록
        </Link>
      )
      const adminHeader = (
        <div className="go-to-add-store-button-container">
          <div>
            <div>아래는 현재 등록되어 있는 가게 목록 입니다.</div>
            {goToAddStoreButton}
          </div>
        </div>
      )
      const smartPhoneMenu = (
        <div className="media-320 media-768">
          {adminHeader}
          <StoreList data={this.state.storeLists}
                      admin={this.props.admin}/>
        </div>
      )
      const tabletPcMenu = (
        <div className="media-1024 media-1025">
          {adminHeader}
          <StoreList data={this.state.storeLists}
                      admin={this.props.admin}/>
        </div>
      )
      // console.log(this.props.getListStatus);
      // console.log(this.props.lists);
      // console.log(this.props.admin)
        return(
            <div className="section">
              {tabletPcMenu}
              {smartPhoneMenu}
            </div>
        );
    }
}

AdminPage.propTypes = propTypes;
AdminPage.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
      getListStatus: state.store.list.status,
      lists: state.store.list.data,
      admin: state.authentication.status.admin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllStores: () => {
            return dispatch(getAllStores());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
