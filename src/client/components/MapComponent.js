import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};
const defaultProps = {
};

class MapComponent extends Component {
    state = {
      lat: '',
      lng: '',
      nowLocation: '검색중...',
      storeLists: []
    }
    nowLocationMarker = () => {
      /* 1. 기본 지도 렌더링 */
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(this.state.lat===''?'33.450701':this.state.lat, this.state.lng===''?'126.570667':this.state.lng), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };

      var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

      /* 2. 지도 우측 하단 행정동 주소 표시 */
      var geocoder = new daum.maps.services.Geocoder();
      // 현재 지도 중심좌표로 주소를 검색해서 지도 우측 하단에 표시합니다
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);

      function searchAddrFromCoords(coords, callback) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      }

      // 지도 우측하단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      function displayCenterInfo(result, status) {
          if (status === daum.maps.services.Status.OK) {
              var infoDiv = document.getElementById('centerAddr');

              for(var i = 0; i < result.length; i++) {
                  // 행정동의 region_type 값은 'H' 이므로
                  if (result[i].region_type === 'H') {
                      infoDiv.innerHTML = result[i].address_name;
                      break;
                  }
              }
          }
      }

      /* 3. 현재 위치 기준으로 마커와 인포창 표시 */
      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      if (navigator.geolocation) {
        // geocoder를 이용해 좌표를 주소로 변경
        var locPosition = new daum.maps.LatLng(this.state.lat===''?'33.450701':this.state.lat, this.state.lng===''?'126.570667':this.state.lng), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = `<div class="info-window" style="padding:10px;font-size:.9rem;">
                        <div style="text-align:center;">현재 위치입니다</div>
                        <div style="color:gray;">아니라면 변경하세요</div>
                      </div>`; // 인포윈도우에 표시될 내용입니다
        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);

      } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        var locPosition = new daum.maps.LatLng(33.450701, 126.570667),
            message = 'geolocation을 통해 현재위치를 파악할 수 없습니다..'

        displayMarker(locPosition, message);
      }

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
      /*DB를 통해 검색된 가게를 지도에 마커로 표시 (지도 레벨 재설정 및 마커 이벤트 등록)*/
      if(this.state.nowLocation!=='검색중...' && this.state.storeLists.length !== 0){
        // console.log(this.state.storeLists)
        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        var bounds = new daum.maps.LatLngBounds();
        for(var i=0; i < this.state.storeLists.length; i++){
          let nthStoreLat = this.state.storeLists[i].location.coordinates[1];
          let nthStoreLng = this.state.storeLists[i].location.coordinates[0];
          let mapPoint = new daum.maps.LatLng(nthStoreLat, nthStoreLng);
          var marker = new daum.maps.Marker({
              position: mapPoint
          });
          marker.setMap(map);
          marker.setTitle(i);
          var infowindow = new daum.maps.InfoWindow({
            content: '<div style="text-align: center;">'+this.state.storeLists[i].name+'</div>' // 인포윈도우에 표시할 내용
          });
          // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
         // 이벤트 리스너로는 클로저를 만들어 등록합니다
         // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
          daum.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          daum.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
          daum.maps.event.addListener(marker, 'click', clickListener(this.state.storeLists[i]._id).bind(this)); //this 바인딩을 실행하는 단계에서 수행
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(mapPoint);
        }
        bounds.extend(new daum.maps.LatLng(this.state.lat, this.state.lng));
        // setTimeout 안하고 바로 setBounds 하면 지도 중심이 현재위치로 표현됨
        setTimeout(()=>{
          map.setBounds(bounds);
        }, 200);
        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }
        // 인포윈도우를 닫는 클로저를 만드는 함수입니다
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }
        // 마커를 클릭 이벤트 클로저
        function clickListener(_id) {
            return function() {
              //this.props.history doesn't work... 아마 this 바인딩이 안돼서 그러는 듯 => 실행 할 때 .bind 메소드 실행
              this.props.history.push('/'+_id);
            };
        }
      }
    }
    componentDidMount(){
      // this.nowLocationMarker();
    }
    componentWillReceiveProps(nextProps){
      this.setState({
        lat: nextProps.lat,
        lng: nextProps.lng,
        nowLocation: nextProps.nowLocation,
        storeLists: nextProps.storeLists
      });
      // console.log(nextProps.storeLists)
      if(nextProps.storeLists.length !== 0){
        // console.log('gogo')
        setTimeout(() => {
          this.nowLocationMarker();
        }, 100)
      }
    }
    render() {
      const map = (
        <div id="map-container">
          <div id="map"></div>
          <div className="hAddr">
              <span className="title">현재위치기준 행정동 주소정보</span>
              <span id="centerAddr"></span>
          </div>
        </div>
      );
      return(
        <div>
          {map}
        </div>
      );
    }
}

MapComponent.propTypes = propTypes;
MapComponent.defaultProps = defaultProps;

export default MapComponent;
