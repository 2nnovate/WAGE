import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  mode: PropTypes.string,
  onAddStore: PropTypes.func
};
const defaultProps = {
  mode: 'register',
  onAddStore: () => {console.log('add store function is undefined')}
};

class StoreForm extends Component {
    state = {
      name: '',
      thumbnail: 'https://ucarecdn.com/a8ec976d-7b08-456e-8049-2656f409f816/defaultthumbnail.jpg',
      tell: '',
      address: '',
      lat: '',
      lng:'',
      openingHours: '',
      offDay: '',
      categories: ['한식'],
      tvShow: [{name: '', time: ''}],
      menus: [{name: '', price: ''}]
    }
    handleInputChange = (e) => {
      let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    offDaySelectChange = (e) => {
      let willoffDay = $(e.target).val();
      switch(willoffDay){
        case 'mon':
          this.setState({
            offDay: 'mon'
          });
          break;
        case 'tue':
          this.setState({
            offDay: 'tue'
          });
          break;
        case 'wed':
          this.setState({
            offDay: 'wed'
          });
          break;
        case 'thur':
          this.setState({
            offDay: 'thur'
          });
          break;
        case 'fri':
          this.setState({
            offDay: 'fri'
          });
          break;
        case 'sat':
          this.setState({
            offDay: 'sat'
          });
          break;
        case 'sun':
          this.setState({
            offDay: 'sun'
          });
          break;
      }
    }
    categoriesChange = (e) => {
      let willListFilterArr = $(e.target).val();
      // console.log(willListFilterArr);
      if(willListFilterArr===null){
        willListFilterArr = ['한식'];
      }
      this.setState({
        categories: willListFilterArr
      })
    }
    addressToPoint = () => {
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new daum.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(this.state.address, (result, status) => {
          // 정상적으로 검색이 완료됐으면
           if (status === daum.maps.services.Status.OK) {
              var coords = new daum.maps.LatLng(result[0].y, result[0].x);
              this.setState({
                lat: result[0].y,
                lng: result[0].x
              });
              alert('주소가 확인되었습니다.')
          } else {
            alert('정확한 주소를 입력해 주세요.');
          }
      });
    }
    // 방송 출연 정보 추가 버튼을 누르면 tvShow 배열에 빈 객체를 추가하는 메소드
    createNewTvShow = () => {
      this.state.tvShow.push({
        name: '',
        time: ''
      });
      this.forceUpdate();
    }
    // 방송 출연 정보를 편집하는 화면 (div의 id 값으로 요소를 보이게 한다 / 기본값은 감춰둠)
    turnOnTvShowView = (e) => {
      let nthId = $(e.target).parents().attr('id');
      if(nthId===undefined){
        // nthId 는 부모의 id 값을 호출 => 글자나 아이콘을 클릭하면 부모요소의 id를 잘 찾는다
        // div 요소 자체를 클릭할 시 부모가 아닌 자신의 id 를 담아야한다
        nthId = $(e.target).attr('id')
      }
      let nth = nthId.slice(0, 1);
      $(`div#${nth}th-option`).css('display', 'block');
    }
    // 편집 화면에서 input 태그에 onChange 이벤트 등록 (div id로 tvShow 배열의 n 번째 원소를 수정)
    handleChangeOption = (e) => {
      let nthId = $(e.target).parents('div.edit-option-view').attr('id');
      let nth = nthId.slice(0, 1);
      let willField = e.target.name
      this.state.tvShow[nth][willField] = e.target.value;
      this.forceUpdate()
    }
    // 완료 버튼을 눌러 편집화면을 다시 감춘다
    closeTvShowView = (e) => {
      $(e.target).parents('div.edit-option-view').css('display', 'none');
    }
    // 삭제 버튼을 누르면 tvShow 배열에서 원소를 삭제한다
    deleteTvShow = (e) => {
      // 이벤트 타깃으로부터 부모 div 의 id 값의 맨 앞글자(배열의 index)를 얻는다
      let nthId = $(e.target).parents('div.edit-option-view').attr('id');
      let nth = nthId.slice(0, 1);
      // this.state.tvShow 배열에서 해당 index 를 삭제한다
      if(nth==='0' && this.state.tvShow.length <= 1){
        alert('방송 출연은 적어도 한 번 이상은 있어야 합니다.');
        return;
      } else {
        let nowTvShowArr = this.state.tvShow;
        nowTvShowArr.splice(nth, 1);
        this.setState({
          tvShow: nowTvShowArr
        });
      }
    }

    // 메뉴 추가 버튼을 누르면 tvShow 배열에 빈 객체를 추가하는 메소드
    createNewMenu = () => {
      this.state.menus.push({
        name: '',
        price: ''
      });
      this.forceUpdate();
    }
    // 메뉴를 편집하는 화면 (div의 id 값으로 요소를 보이게 한다 / 기본값은 감춰둠)
    turnOnMenuView = (e) => {
      let nthId = $(e.target).parents().attr('id');
      if(nthId===undefined){
        // nthId 는 부모의 id 값을 호출 => 글자나 아이콘을 클릭하면 부모요소의 id를 잘 찾는다
        // div 요소 자체를 클릭할 시 부모가 아닌 자신의 id 를 담아야한다
        nthId = $(e.target).attr('id')
      }
      let nth = nthId.slice(0, 1);
      $(`div#${nth}th-menu`).css('display', 'block');
    }
    // 편집 화면에서 input 태그에 onChange 이벤트 등록 (div id로 menu 배열의 n 번째 원소를 수정)
    handleChangeMenu = (e) => {
      let nthId = $(e.target).parents('div.edit-menu-view').attr('id');
      let nth = nthId.slice(0, 1);
      let willField = e.target.name
      this.state.menus[nth][willField] = e.target.value;
      this.forceUpdate()
    }
    // 완료 버튼을 눌러 편집화면을 다시 감춘다
    closeMenuView = (e) => {
      $(e.target).parents('div.edit-menu-view').css('display', 'none');
    }
    // 삭제 버튼을 누르면 menu 배열에서 원소를 삭제한다
    deleteMenu = (e) => {
      // 이벤트 타깃으로부터 부모 div 의 id 값의 맨 앞글자(배열의 index)를 얻는다
      let nthId = $(e.target).parents('div.edit-menu-view').attr('id');
      let nth = nthId.slice(0, 1);
      // this.state.menus 배열에서 해당 index 를 삭제한다
      if(nth==='0' && this.state.menus.length <= 1){
        alert('메뉴는 적어도 한 개 이상이어야 합니다.');
        return;
      } else {
        let nowMenuArr = this.state.menus;
        nowMenuArr.splice(nth, 1);
        this.setState({
          menus: nowMenuArr
        });
      }
    }

    handleRegister = () => {
      //주어진 state의 필드값들이 비어있는지 확인하고, 비어있다면 해당필드를 채워달라고 메시지 띄울것
      let check = this.state;
      if(check.thumbnail === 'https://ucarecdn.com/a8ec976d-7b08-456e-8049-2656f409f816/defaultthumbnail.jpg'){
        alert('썸네일을 등록해주세요');
        return;
      }
      switch(''){
        case check.name:
          alert('가게명을 입력해주세요');
          return;
          break;
        case check.tell:
          alert('전화번호를 입력해주세요');
          return;
          break;
        case check.address:
          alert('주소를 입력해주세요');
          return;
          break;
        case check.lat:
          alert('주소확인 버튼을 통해 주소를 확인하세요');
          return;
          break;
        case check.lng:
          alert('주소확인 버튼을 통해 주소를 확인하세요');
          return;
          break;
        case check.openingHours:
          alert('영업시간을 입력해주세요');
          return;
          break;
        case check.offDays:
          alert('휴무일을 입력해주세요');
          return;
          break;
      }
      if(check.categories.length === 0){
        alert('식당의 카테고리를 설정해주세요');
        return;
      }
      for(var i = 0; i<check.tvShow.length; i++){
        let item = check.tvShow[i];
        if(item.name === '' || item.time === ''){
          alert('방송 출연 정보 중 비어있는 칸이 있는지 확인해 주세요');
          return;
        }
      }
      for(var i = 0; i<check.menus.length; i++){
        let item = check.menus[i];
        if(item.name === '' || item.price === ''){
          alert('메뉴 정보 중 비어있는 칸이 있는지 확인해 주세요');
          return;
        }
      }
      return this.props.onAddStore(this.state);
    }

    componentDidMount(){
      $(document).ready(function() {
        // materializecss input 태그 초기화 (맨처음 렌더링 된 이후)
        M.updateTextFields();
        // materializecss select 폼 초기화
        $('select').formSelect();
      });
      let singleWidget = uploadcare.SingleWidget('[role=uploadcare-uploader]');
      singleWidget.onUploadComplete((info)=>{
        // console.log(info.cdnUrl);
        $('div.upload-thumnail-continer>img.circle').attr('src', info.cdnUrl);
        this.setState({
          thumbnail: info.cdnUrl
        });
      });
    }
    render() {
      const invisible = {
        display: "none"
      }
      const editTvShowView = (arr) => {
       return arr.map((item, i)=>{
         return (
           <div className="edit-option-view" id={i+"th-option"} key={i} style={invisible}>
             <input name="name" type="text" placeholder="tv쇼 이름 (ex-수요미식회)" value={item.name} onChange={this.handleChangeOption}/>
             <input name="time" type="number" placeholder="방송 회차 (ex-181)"
               value={item.time} onChange={this.handleChangeOption}/>
             <div className="edit-option-delete-button" onClick={this.deleteTvShow}>
               삭제
             </div>
             <div className="edit-option-done-button" onClick={this.closeTvShowView}>
               완료
             </div>
           </div>
         )
       })
     }
     const editTvShowButtons = (arr) => {
        return arr.map((item, i) => {
          return (
            <div className="create-new-option-button" id={i+'onButton'} onClick={this.turnOnTvShowView}
              key={i}>
              <i className="material-icons">add_circle</i>
              <div>{item.name===""?"클릭해서 편집":item.name}</div>
            </div>
          )
        })
      }
      const editMenuView = (arr) => {
       return arr.map((item, i)=>{
         return (
           <div className="edit-menu-view" id={i+"th-menu"} key={i} style={invisible}>
             <input name="name" type="text" placeholder="메뉴명" value={item.name} onChange={this.handleChangeMenu}/>
             <input name="price" type="number" placeholder="가격"
               value={item.time} onChange={this.handleChangeMenu}/>
             <div className="edit-menu-delete-button" onClick={this.deleteMenu}>
               삭제
             </div>
             <div className="edit-menu-done-button" onClick={this.closeMenuView}>
               완료
             </div>
           </div>
         )
       })
     }
     const editMenuButtons = (arr) => {
        return arr.map((item, i) => {
          return (
            <div className="create-new-menu-button" id={i+'onButton'} onClick={this.turnOnMenuView}
              key={i}>
              <i className="material-icons">add_circle</i>
              <div>{item.name===""?"클릭해서 편집":item.name}</div>
            </div>
          )
        })
      }
      const uploadTumbnail = (
        <div className="upload-thumnail-continer">
          <img src={this.state.thumbnail}
               alt="store's thumbnail"
               className="circle responsive-img"/>
          <input type="hidden" role="uploadcare-uploader" name="content" data-public-key="afe228afdc4b282ae7cc" data-images-only />
        </div>
      )
      const registerButton = (
        <div className="button-container" onClick={this.handleRegister}>
          <button className="btn waves-effect waves-light btn-large" type="submit" name="action">
            등록
            <i className="material-icons right">send</i>
          </button>
        </div>
      )
      const RegisterForm = (
        <div className="store-form">
          {uploadTumbnail}
          <div className="row">
            <div className="input-field col s12">
              <select multiple value={this.state.categories}
                      onChange={this.categoriesChange}>
                <option value="한식">한식</option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="양식">양식</option>
              </select>
              <label>카테고리</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input name="name"
                      type="text"
                      id="name"
                      className="validate"
                      value={this.state.name}
                      onChange={this.handleInputChange}/>
              <label htmlFor="name">가게명</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input name="tell"
                      type="text"
                      id="tell"
                      className="validate"
                      value={this.state.tell}
                      onChange={this.handleInputChange}/>
              <label htmlFor="tell">전화번호</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input name="address"
                      type="text"
                      id="address"
                      className="validate"
                      placeholder="주소를 입력하고 '주소확인' 버튼을 눌러주세요."
                      value={this.state.address}
                      onChange={this.handleInputChange}/>
              <label htmlFor="address">주소</label>
            </div>
          </div>
          <div className="lat-lng-field row">
            <div className="col s12">
              <div className="input-field inline">
                <input value={this.state.lat} id="lat" className="validate" type="text" placeholder="위도" disabled/>
                <label htmlFor="lat">위도</label>
              </div>
              <div className="input-field inline">
                <input value={this.state.lng} id="lng" className="validate" type="text" placeholder="경도" disabled/>
                <label htmlFor="lng">경도</label>
              </div>
              <div className="waves-effect waves-light btn" onClick={this.addressToPoint}>
                주소확인(위도, 경도값 호출)
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input name="openingHours"
                      type="text"
                      id="openingHours"
                      className="validate"
                      value={this.state.openingHours}
                      onChange={this.handleInputChange}/>
              <label htmlFor="openingHours">영업시간</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <select value={this.state.offDay}
                      onChange={this.offDaySelectChange}>
                <option value=''>휴무일을 선택해 주세요</option>
                <option value="mon">월요일</option>
                <option value="tue">화요일</option>
                <option value="wed">수요일</option>
                <option value="thur">목요일</option>
                <option value="fri">금요일</option>
                <option value="sat">토요일</option>
                <option value="sun">일요일</option>
              </select>
              <label>휴무일</label>
            </div>
          </div>
          <div className="title">메뉴 정보</div>
          <div className="current-menu-lists">
            {editMenuButtons(this.state.menus)}
            <div className="create-new-menu-button" id="create-new-menu" onClick={this.createNewMenu}>
              <i className="material-icons">add_circle</i>
              <div>메뉴 정보 추가</div>
            </div>
          </div>
          <div>
            {editMenuView(this.state.menus)}
          </div>
          <div className="title">방송 출연 정보</div>
          <div className="current-option-lists">
            {editTvShowButtons(this.state.tvShow)}
            <div className="create-new-option-button" id="create-new-menu" onClick={this.createNewTvShow}>
              <i className="material-icons">add_circle</i>
              <div>방송 출연 정보 추가</div>
            </div>
          </div>
          <div>
            {editTvShowView(this.state.tvShow)}
          </div>
        </div>
      )
      console.log(this.state)
        return(
            <div>
              {this.props.mode==='register'?RegisterForm:undefined}
              {this.props.mode==='register'?registerButton:undefined}
            </div>
        );
    }
}

StoreForm.propTypes = propTypes;
StoreForm.defaultProps = defaultProps;

export default StoreForm;
