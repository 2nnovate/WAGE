import React, { Component } from 'react';
import { LowerMenuBar } from './components';

class App extends Component {
    constructor(props) {
        super(props);

        this.state={
          nowLocation:'검색중...',
          lat:'',
          lng:'',
          searchAddr: '',
          searchAddrState: false,
          storeLists: [
            {
              name: '한씨옥',
              starRate: 4.2,
              tell: '02-305-4892',
              address: '서울 서대문구 연희로25길 92',
              lat: '37.5697708152',
              lng:'126.9319833757',
              openingHours: '11:00 - 21:00',
              OffDay: 'mon',
              tvShow: [{name: '수요미식회', time: '181'}]
            }
          ]
        }

        // LISTEN ESC KEY, CLOSE IF PRESSED
        const listenEscKey = (evt) => {
            evt = evt || window.event;
            if(this.state.searchAddrState===true){
              if (evt.keyCode == 27) {
                  this.toggleChangeLocation();
              }
            }
        };

        document.onkeydown = listenEscKey;

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
        geocoder.coord2Address(this.state.lng, this.state.lat, (result, status) => {
          if (status === daum.maps.services.Status.OK) {

              var locPosition = new daum.maps.LatLng(this.state.lat===''?'33.450701':this.state.lat, this.state.lng===''?'126.570667':this.state.lng), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                  message = `<div class="info-window" style="padding:10px;font-size:.9rem;">
                              여기에 계신가요?
                            </div>`; // 인포윈도우에 표시될 내용입니다

              // 마커와 인포윈도우를 표시합니다
              displayMarker(locPosition, message);
          }
        });

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
    }
    changeAddress = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          var latitude = position.coords.latitude; // 위도
          var longitude = position.coords.longitude; // 경도
          var geocoder = new daum.maps.services.Geocoder();
          var nowAddr;

          geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === daum.maps.services.Status.OK) {
              nowAddr = result[0].address.address_name;
              this.setState({
                lat: latitude,
                lng: longitude,
                nowLocation: nowAddr
              });
            }
          });
        });
      }
    }
    toggleChangeLocation = () => {
      this.setState({
        searchAddrState: !this.state.searchAddrState
      });
    }
    handleChange = (e) => {
      this.setState({
        searchAddr: e.target.value
      });
    }
    handleKeyDown = (e) => {
      if(e.keyCode === 13) {
          if(this.state.searchAddr.length > 0) {
              this.onSearchAdress();
          }
      }
    }
    onSearchAdress = () => {
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new daum.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(this.state.searchAddr, (result, status) => {

          // 정상적으로 검색이 완료됐으면
           if (status === daum.maps.services.Status.OK) {
              //
              // this.setState({
              //   lat:result[0].y,
              //   lon:result[0].x
              // });
              var geocoder = new daum.maps.services.Geocoder();
              geocoder.coord2Address(result[0].x, result[0].y, (resultAddr, status) => {
                if (status === daum.maps.services.Status.OK) {
                  var nowAddr = resultAddr[0].address.address_name;
                  this.setState({
                    lat: result[0].y,
                    lng: result[0].x,
                    nowLocation: nowAddr,
                    searchAddr: ''
                  });
                }
              });
              this.toggleChangeLocation();
          } else {
            alert('정확한 주소를 입력해 주세요');
            this.setState({
              searchAddr: ''
            })
          }
      });
    }

    componentWillMount(){
      // geolocation을 통해 얻어온 좌표값을 컴포넌트 state로 지정
      this.changeAddress();
    }
    componentDidMount(){
      this.nowLocationMarker();
      // materializecss input 태그 초기화
      $(document).ready(function() {
        $('input#input_text, textarea#textarea2').characterCounter();
      });
    }
    componentDidUpdate(){
      // 컴포넌트 state에 현재 좌표값이 업데이트 된 이후에 다시 지도에 마커표시
      this.nowLocationMarker();
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
      const nowLocationBar = (
        <div className="now-location-address-bar">
          <div>현재 위치 :</div>
          <div>{this.state.nowLocation}</div>
          <div className="waves-effect waves-light btn" onClick={this.toggleChangeLocation}>
            <i className="material-icons left">navigation</i>
            위치변경
          </div>
        </div>
      )
      const changeAdressView = (
        <div className="search-screen white-text">
            <div className="right">
                <a className="waves-effect waves-light btn red lighten-1"
                    onClick={this.toggleChangeLocation}>CLOSE</a>
            </div>
            <div className="container">
                <input placeholder="현재 주소를 입력해 주세요"
                        value={this.state.searchAddr}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        autoFocus/>
                <div className="waves-effect waves-light btn center" onClick={this.onSearchAdress}>
                  <i className="material-icons left">search</i>
                  주소검색
                </div>
            </div>
        </div>
      )
        return(
            <div className="section">
              {this.state.searchAddrState? changeAdressView:undefined}
              {nowLocationBar}
              {map}
              <div id="media-320">
                media-320 이하(스마트폰)
                <LowerMenuBar />
              </div>
              <div id="media-768">
                media-321 이상 media-768 이하(스마트폰)
                <LowerMenuBar />
              </div>
              <div id="media-1024">
                media-769 이상 media-1024 이하(태블릿)
              </div>
              <div id="media-1025">
                media-1025 이상(pc)
              </div>
            </div>
        );
    }
}

export default App;
