import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LowerMenuBar, StoreList, Header, MapComponent } from '../components';
import { connect } from 'react-redux';
import { getStatusRequest } from '../actions/authentication';
import { getStoreFromDistance } from '../actions/store';

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
        toDistanceKm: '3',
        storeLists: []
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
            this.handleGetStoreFromDistance(longitude, latitude, this.state.toDistanceKm);
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
    // console.log($('option.default-option'));
    let willListFilterArr = $(e.target).val();
    if(willListFilterArr===null){
      willListFilterArr = ['수요미식회'];
    }
    this.setState({
      listFilter: willListFilterArr
    });
  }
  // 맛집 검색 필터선택창 온체인지 이벤트
  distanceSelectChange = (e) => {
    // console.log($('option.default-option'));
    let willDistance = $(e.target).val();
    if(willDistance===null){
      willDistance = '3';
    }
    this.setState({
      toDistanceKm : willDistance
    });
    this.handleGetStoreFromDistance(this.state.lng, this.state.lat, willDistance);
  }
  // **select 태그에서 포커스가 아웃됐을때 메소드 - onBlur 라던지 onFocusout 이벤트가 동작하지 않는다
  filterSelectOutFocus = (e) => {
    // console.log('onblur!')
    let willListFilterArr = $(e.target).val();
    if(willListFilterArr===null){
      willListFilterArr = ['수요미식회'];
    }
    this.setState({
      listFilter: willListFilterArr
    });
  }

  handleGetStoreFromDistance = (lng, lat, km) => {
    // 현재 위치가 state로 지정된 이후에 실행되야 함
    return this.props.getStoreFromDistance(lng, lat, km).then(
      () => {
        this.setState({
          storeLists: this.props.getStoreFromDistanceLists
        });
      }
    );
  }

  componentWillMount(){
    // 컴포넌트가 렌더링되기 이전에 브라우저의 geolocation으로 주소, 위/경도값변경
    this.changeAddress();
  }
  componentWillReceiveProps(){
    // this.mapRender(this.state.storeLists);
  }
  componentDidMount(){
    $(document).ready(function() {
      // materializecss input 태그 초기화 (맨처음 렌더링 된 이후)
      $('input#input_text, textarea#textarea2').characterCounter();
      // materializecss select 폼 초기화
      $('select').formSelect();
    });
  }
  componentDidUpdate(){
  }
    render() {

      const distanceSelectOption = (
        <div>
          반경
          <select value={this.state.toDistanceKm} onChange={this.distanceSelectChange}>
            <option value="0.5">500m</option>
            <option value="1">1km</option>
            <option value="3">3km</option>
            <option value="10">10km</option>
            <option value="30">30km</option>
            <option value="50">50km</option>
            <option value="no-matter">무관</option>
          </select>
        </div>
      )
      // 현재 위치의 주소 표시창 및 위치 변경버튼
      const nowLocationBar = (
        <div className="now-location-address-bar">
          <div>현재 위치 :</div>
          <div>{this.state.nowLocation}</div>
          <div className="waves-effect waves-light btn-small" onClick={this.toggleChangeLocation}>
            <i className="material-icons left">navigation</i>
            위치변경
          </div>
          {distanceSelectOption}
        </div>
      );
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
      );
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
      );
      const header =(
        <div className="header media-768 media-1024">
          <h1>뭐 할끼니?</h1>
        </div>
      );

      console.log(this.state);
        return(
          <div className="section">
            {this.state.searchAddrState? changeAdressView:undefined}
            {categoriesSelect}
            {nowLocationBar}
            <MapComponent lat={this.state.lat} lng={this.state.lng}
                nowLocation={this.state.nowLocation} storeLists={this.state.storeLists}/>
            <div className="media-320">
              media-320 이하(스마트폰)
              <StoreList data={this.state.storeLists}/>
            </div>
            <div className="media-768">
              media-321 이상 media-767 이하(스마트폰)
              <StoreList data={this.state.storeLists}/>
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

const mapStateToProps = (state) => {
    return {
      sessionValidity: state.authentication.status.valid,
      currentUser_id: state.authentication.status.currentUser_id,
      getStoreFromDistanceStatus: state.store.list.status,
      getStoreFromDistanceLists: state.store.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        getStoreFromDistance: (lng, lat, km) => {
            return dispatch(getStoreFromDistance(lng, lat, km));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Region);
