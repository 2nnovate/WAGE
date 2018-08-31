import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  locName: PropTypes.string,
  locLat: PropTypes.string,
  locLng: PropTypes.string
};
const defaultProps = {
  locName: '',
  locLat: '',
  locLng: ''
};

class WayButtons extends Component {
    state = {
    }
    render() {
      const findTheWayButton = (
        <a target="_blank" href={"http://map.daum.net/link/to/"+this.props.locName+','+this.props.locLat+','+this.props.locLng}>
          <i className="material-icons ">directions</i>
          <div>
            길찾기
          </div>
        </a>
      )
      const navigationButton = (
        <a>
          <i className="material-icons ">directions_car</i>
          <div>
            네비게이션
          </div>
        </a>
      )
      const callATexiButton = (
        <a>
          <i className="material-icons ">local_taxi</i>
          <div>
            택시부르기
          </div>
        </a>
      )
      const shareButton = (
        <a>
          <i className="material-icons ">share</i>
          <div>
            공유
          </div>
        </a>
      )
        return(
            <div className="way-buttons-container">
              {findTheWayButton}
              {navigationButton}
              {callATexiButton}
              {shareButton}
            </div>
        );
    }
}

WayButtons.propTypes = propTypes;
WayButtons.defaultProps = defaultProps;

export default WayButtons;
