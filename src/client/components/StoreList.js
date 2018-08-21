import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EachStore } from './';

const propTypes = {
  data: PropTypes.array
};
const defaultProps = {
  data: []
};

class StoreList extends Component {
    state = {
    }
    render() {
      const mapToStoreLists = (data) => {
        return data.map((item, i)=>{
          return (
            <EachStore inform={item} key={item._id}/>
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
