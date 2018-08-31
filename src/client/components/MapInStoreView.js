import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  locName: PropTypes.string,
  locLat: PropTypes.string,
  loclng: PropTypes.string
};
const defaultProps = {
  locName: '',
  locLat: '',
  locLng: ''
};

class MapInStoreView extends Component {
    state = {
    }
    mapRender = () => {
      /* 1. 기본 지도 렌더링 */
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(this.props.locLat===''?'33.450701':this.props.locLat, this.props.locLng===''?'126.570667':this.props.locLng), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };

      var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

      var locPosition = new daum.maps.LatLng(this.props.locLat===''?'33.450701':this.props.locLat, this.props.locLng===''?'126.570667':this.props.locLng), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = `<div>
                      ${this.props.locName}
                    </div>`; // 인포윈도우에 표시될 내용입니다
      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition, message);

      // 지도에 마커와 인포윈도우를 표시하는 함수입니다
      function displayMarker(locPosition, message) {
          // 마커를 생성합니다
          var marker = new daum.maps.Marker({
              map: map,
              position: locPosition
          });
          var iwContent = message, // 인포윈도우에 표시할 내용
              iwRemoveable = true;
          // 인포윈도우를 생성합니다
          var infowindow = new daum.maps.InfoWindow({
              content : iwContent,
              removable : iwRemoveable
          });
          // 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);
          // 지도 중심좌표를 접속위치로 변경합니다
          map.setCenter(locPosition);
      }
    }
    componentDidMount(){
      this.mapRender()
    }
    render() {
        return(
            <div id="map-in-store-container">
              <div id="map"></div>
            </div>
        );
    }
}

MapInStoreView.propTypes = propTypes;
MapInStoreView.defaultProps = defaultProps;

export default MapInStoreView;
