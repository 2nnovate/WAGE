import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneStore } from '../actions/store';

const propTypes = {
};
const defaultProps = {
};

class DetailedStore extends Component {
    state = {
      store: {

      }
    }
    handleGetOneStore = () => {
      return this.props.getOneStore(this.props.match.params.store_id);
    }
    componentWillMount(){
      this.handleGetOneStore().then(
        () => {
          this.setState({
            store: this.props.oneStoreData
          });
        }
      )
    }
    componentDidMount(){
      $('.carousel.carousel-slider').carousel({
        fullWidth: true
      });
      setTimeout(() => {
        const imgHeight = $('.carousel-item img').height();
        console.log(imgHeight)
        $('.carousel.carousel-slider').carousel({
          fullWidth: true
        }).height(imgHeight);
      }, 3000)
    }
    render() {
      const store = this.state.store
      const header = (
        <div className="center name">
          {store.name}
        </div>
      )
      const imageSlider = (
        <div className="carousel carousel-slider">
          <div className="carousel-item"><img src="https://lorempixel.com/800/400/food/1" /></div>
          <div className="carousel-item"><img src="https://lorempixel.com/800/400/food/2" /></div>
          <div className="carousel-item"><img src="https://lorempixel.com/800/400/food/3" /></div>
          <div className="carousel-item"><img src="https://lorempixel.com/800/400/food/4" /></div>
        </div>
      )
      const smartPhoneMenu = (
        <div className="media-320 media-768">
          {imageSlider}
          {header}
        </div>
      )
      const tabletPcMenu = (
        <div className="media-1024 media-1025">
          {imageSlider}
          {header}
        </div>
      )
      console.log(this.state)
      return(
        <div className="section detailed-view">
          {tabletPcMenu}
          {smartPhoneMenu}
        </div>
      );
    }
}

DetailedStore.propTypes = propTypes;
DetailedStore.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
      getOneStoreStatus: state.store.oneStore.status,
      oneStoreData: state.store.oneStore.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOneStore: (store_id) => {
            return dispatch(getOneStore(store_id));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DetailedStore);
