import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LowerMenuBar, StoreList, Header } from '../components'

const propTypes = {
};
const defaultProps = {
};

class Region extends Component {
  constructor(props) {
      super(props);

      this.state={
        loading: true, //로딩 view를 띄울지 말지 결정
        nowLocation:'검색중...', //현재위치(주소)
        lat:'', //현재위히의 위도
        lng:'', //현재위치 경도
        searchAddr: '', //주소 검색어
        searchAddrState: false, //주소 검색창 표시하는 스테이트(true면 검색창을 띄운다)
        listFilter: ['수요미식회'], //어떤 종류의 맛집을 검색할지 결정
        coverage: 1000, //현재 위치에서의 맛집검색 반경
        storeLists: [
          {
            _id:'01',
            name: '한씨옥',
            thumbnail: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA4MDdfMTM1%2FMDAxNTMzNjQxMDY5OTQz.bXHhO_B39nznQK3y7UNif9QpL7m3PBcr_GIkPgzLHRgg.rvu_YMAVwYrvwruepfA2CSatBI9no84435Ddp24Yp7Ig.JPEG.zephyr122059%2F20180807_132015.jpg%23800x600&type=m862_636',
            starRate: 4.2,
            tell: '02-305-4892',
            address: '서울 서대문구 연희로25길 92',
            lat: '37.5697708152',
            lng:'126.9319833757',
            openingHours: '11:00 - 21:00',
            offDay: 'mon',
            tvShow: [{name: '수요미식회', time: '181'}],
            categories: ['한식']
          },
          {
            _id:'02',
            name: '수연산방',
            thumbnail: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzEwMjJfODkg%2FMDAxNTA4NjYwMDQyNTY3.V93-rJWa3j_p_6Msle6OO5wPMQDjzSBI8nM3zCkfrGQg.5_I8hiRxSguYUEqe97iZxShhuuhfAN7x1slOWSqHyXwg.JPEG.nadiatour%2FDSC02562.JPG&type=m862_636',
            starRate: 4.7,
            tell: '02-764-1736',
            address: '서울 성북구 성북로26길 8',
            lat: '37.5950541538',
            lng:'126.9948365608',
            openingHours: '평일 11:30 - 18:00 / 주말 11:30 - 22:00',
            offDay: 'mon',
            tvShow: [{name: '수요미식회', time: '180'}],
            categories: ['카페']
          },
          {
            _id:'03',
            name: '신성',
            thumbnail: 'https://postfiles.pstatic.net/MjAxODA4MDZfNzUg/MDAxNTMzNTYwMDYzMzE4.aNydDvSzG67nYB_SxizGQ77e2X5nnPFNC_toJ4MlqVUg.2SBLm6vEQfX4Quo222EjkR_vUQuSPHcIsauql_ZiNXQg.JPEG.zephyr122059/20180806_184156.jpg?type=w966',
            starRate: 4.1,
            tell: '02-733-6671',
            address: '서울 종로구 무교로 42',
            lat: '37.5696660922',
            lng:'126.9794936176',
            openingHours: '11:00 - 22:00',
            offDay: 'sun',
            tvShow: [{name: '수요미식회', time: '181'}],
            categories: ['일식']
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
  // 현재위치를 지도 가운데에 표시하고 마커와 인포창, 행정구 표시하는 메소드
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
                            <div style="text-align:center;">현재 위치입니다</div>
                            <div style="color:gray;">아니라면 변경하세요</div>
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
    /*DB를 통해 검색된 가게를 지도에 마커로 표시 (지도 레벨 재설정 및 마커 이벤트 등록)*/
    if(this.state.nowLocation!=='검색중...'){
      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      var bounds = new daum.maps.LatLngBounds();
      for(var i=0; i < this.state.storeLists.length; i++){
        let nthStoreLat = this.state.storeLists[i].lat;
        let nthStoreLng = this.state.storeLists[i].lng;
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
      }, 100);
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
  //위도 경도를 통해 주소를 검색해 state의 주소를 변경하는 메소드
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
  // 주소 검색창을 띄우는 메소드
  toggleChangeLocation = () => {
    this.setState({
      searchAddrState: !this.state.searchAddrState
    });
  }
  // 주소 검색창에서 input 에 onchange 이벤트가 발생할 때 마다 state에 기록하는 메소드
  handleChange = (e) => {
    this.setState({
      searchAddr: e.target.value
    });
  }
  // 주소 검색창에서 엔터를 누르면 검색하도록 하는 메소드
  handleKeyDown = (e) => {
    if(e.keyCode === 13) {
        if(this.state.searchAddr.length > 0) {
            this.onSearchAdress();
        }
    }
  }
  // input 태그에 입력된 주소로 좌표를 검색, 해당 좌표로 주소를 다시 검색해 state에 저장
  onSearchAdress = () => {
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new daum.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(this.state.searchAddr, (result, status) => {

        // 정상적으로 검색이 완료됐으면
         if (status === daum.maps.services.Status.OK) {
            var geocoder = new daum.maps.services.Geocoder();
            geocoder.coord2Address(result[0].x, result[0].y, (resultAddr, status1) => {
              if (status1 === daum.maps.services.Status.OK) {
                var nowAddr = resultAddr[0].address.address_name;
                this.setState({
                  lat: result[0].y,
                  lng: result[0].x,
                  nowLocation: nowAddr,
                  searchAddr: '' //input 태그 초기화
                });
              }
            });
            this.toggleChangeLocation(); //검색창 끄기
        } else {
          // 입력한 주소가 정확하지 않은경우
          alert('정확한 주소를 입력해 주세요');
          this.setState({
            searchAddr: '' //input 태그 초기화
          })
        }
    });
  }
  // 맛집 검색 필터선택창 온체인지 이벤트
  filterSelectChange = (e) => {
    let willListFilterArr = $(e.target).val();
    if(willListFilterArr===null){
      willListFilterArr = ['수요미식회'];
    }
    this.setState({
      listFilter: willListFilterArr
    })
  }
  handleTestHistory = (_id) => {
    this.props.history.push('/'+_id);
  }

  componentWillMount(){
    // 컴포넌트가 렌더링되기 이전에 브라우저의 geolocation으로 주소, 위/경도값변경
    this.changeAddress();
  }
  componentDidMount(){
    //컴포넌트가 렌더링 된 이후에 state의 위/경도 값을 통해 지도위치 변경
    this.nowLocationMarker();
    $(document).ready(function() {
      // materializecss input 태그 초기화 (맨처음 렌더링 된 이후)
      $('input#input_text, textarea#textarea2').characterCounter();
      // materializecss select 폼 초기화
      $('select').formSelect();
    });
  }
  componentDidUpdate(){
    // 컴포넌트 state에 현재 좌표값이 업데이트 된 이후에 다시 지도에 마커표시
    this.nowLocationMarker();
  }
    render() {
      // 지도 DOM 렌더링 요소
      const map = (
        <div id="map-container">
          <div id="map"></div>
          <div className="hAddr">
              <span className="title">현재위치기준 행정동 주소정보</span>
              <span id="centerAddr"></span>
          </div>
        </div>
      );
      // 현재 위치의 주소 표시창 및 위치 변경버튼
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
      // 주소 검색창
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
      // 맛집 범주 선택
      const categoriesSelect = (
        <div className="list-filter-tv-show">
          <div>내주변</div>
          <select multiple value={this.state.listFilter} onChange={this.filterSelectChange}>
            <option value="수요미식회">수요미식회</option>
            <option value="이영자 list">이영자 list (준비중)</option>
            <option value="삼대천왕" disabled>삼대천왕 (준비중)</option>
          </select>
          <div>맛집</div>
        </div>
      )
      const header =(
        <div className="header media-768 media-1024">
          <h1>뭐 할끼니?</h1>
        </div>
      )
        return(
          <div className="section">
            {this.state.searchAddrState? changeAdressView:undefined}
            <Header />
            {categoriesSelect}
            {nowLocationBar}
            {map}
            <div className="media-320">
              media-320 이하(스마트폰)
              <StoreList data={this.state.storeLists}/>
              <LowerMenuBar />
            </div>
            <div className="media-768">
              media-321 이상 media-767 이하(스마트폰)
              <StoreList data={this.state.storeLists}/>
              <LowerMenuBar />
            </div>
            <div className="media-1024">
              media-768 이상 media-1024 이하(태블릿)
              <StoreList data={this.state.storeLists}/>
            </div>
            <div className="media-1025">
              media-1025 이상(pc)
              <StoreList data={this.state.storeLists}/>
            </div>
          </div>
        );
    }
}

Region.propTypes = propTypes;
Region.defaultProps = defaultProps;

export default Region;
