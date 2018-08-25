import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EachStore } from './';

const propTypes = {
  data: PropTypes.array,
  admin: PropTypes.bool
};
const defaultProps = {
  data: [],
  admin: false
};

class StoreList extends Component {
    state = {
    }
    render() {
      const mapToStoreLists = (data) => {
        return data.map((item, i)=>{
          return (
            <EachStore inform={item} key={item._id}
                        admin={this.props.admin}/>
          )
        })
      }
        return(
            <div>
              {mapToStoreLists(this.props.data)}
            </div>
        );
    }
}

StoreList.propTypes = propTypes;
StoreList.defaultProps = defaultProps;

export default StoreList;
