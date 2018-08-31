import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneStore } from '../actions/store';
import { WayButtons, MapInStoreView } from '../components';
import { Link } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};

class DetailedStore extends Component {
    state = {
      store: {
        name: "한씨옥",
        thumbnail: "http://news.kbs.co.kr/data/news/2017/01/04/3405677_bH6.jpg",
        tell: '02-1234-1234',
        address: "서울 서대문구 연희로25길 92",
        location: {
          type: 'Point',
          coordinates: ["126.93198337574925", "37.56977081517661"]
        },
        openingHours: '평일 11:00 - 23:00 | 주말 11:00 - 24:00',
        offDay: 'mon',
        categories: ["한식"],
        tvShow: [
          {
            name: "수요미식회",
            time: '111'
          },
          {
            name: "삼대천왕",
            time: '30'
          }
        ],
        menus: [
          {
            name: '돈가스 정식',
            price: '7000'
          },
          {
            name: '돈가스 김치나베',
            price: '6000'
          }
        ],
        reviews: [
          {
            author: '병삼이',
            contents: '오지게 맛있는 집',
            img: "https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2fG8/image/Ri0iEbTftbOLaX0oHxinbMVIGtk.jpg",
            starRate: 5,
            date: Date.now(),
            is_edited: false
          },
          {
            author: '오둘희',
            contents: '둘이먹다 하나죽으면 살짝 눈치 챌 정도',
            img: "https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/6xp/image/luXUXQoXP7u7xFCIMOGk0Pf9ixc.jpg",
            starRate: 4,
            date: Date.now(),
            is_edited: false
          }
        ]
      }
    }
    handleGetOneStore = () => {
      return this.props.getOneStore(this.props.match.params.store_id);
    }
    componentWillMount(){
      // this.handleGetOneStore().then(
      //   () => {
      //     this.setState({
      //       store: this.props.oneStoreData
      //     });
      //   }
      // )
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
      }, 2000)
    }
    render() {
      const store = this.state.store
      // thumbnail 이미지와 리뷰에 있는 사진들을 합쳐 배열로 만들기
      const imgArr = (storeInform) => {
        let thumbnail = storeInform.thumbnail;
        let reviews = storeInform.reviews;
        let output = [thumbnail];
        if(reviews.length > 0){
          for(var i = 0; i < reviews.length; i++){
            let reviewImg = reviews[i].img;
            output = [...output, reviewImg]
            if(i === reviews.length - 1){
              return output;
            }
          }
        }
        return output;
      }
      const mapToSliderImage = (arr) => {
        return arr.map((item, i) => {
          console.log(item)
          return (
            <div className="carousel-item" key={i}>
              <img src={item} />
            </div>
          )
        })
      }
      const imageSlider = (
        <div className="carousel carousel-slider">
          {mapToSliderImage(imgArr(this.state.store))}
        </div>
      )
      const header = (
        <div className="center name">
          {store.name}
        </div>
      )
      const starRateCal = (reviews) => {
        let output = 0;
        let sum = 0;
        for(var i =0 ; i < reviews.length ; i++){
          sum += reviews[i].starRate;
          if(i === reviews.length -1){
            output = sum / reviews.length;
            return output;
          }
        }
        return output
      }
      const starRateView = (
        <div>
          <i className="material-icons tiny">star</i>
          &nbsp;
          {starRateCal(this.state.store.reviews)}
        </div>
      )
      const tvShowToString = (tvShowArr) => {
        let output = '';
        for(var i =0 ; i < tvShowArr.length ; i++){
          if(i===0){
            output = tvShowArr[i].name+" "+tvShowArr[i].time+"회";
          }else{
            output += ", "+tvShowArr[i].name+" "+tvShowArr[i].time+"회";
          }
          if(i === tvShowArr.length -1) {
            return output;
          }
        }
        return "방송 출연 이력이 없습니다."
      }
      const dayToKorean = (day) => {
        switch(day){
          case 'mon':
            return '월요일 휴무';
            break;
          case 'tue':
            return '화요일 휴무';
            break;
          case 'wed':
            return '수요일 휴무';
            break;
          case 'thur':
            return '목요일 휴무';
            break;
          case 'fri':
            return '금요일 휴무';
            break;
          case 'sat':
            return '토요일 휴무';
            break;
          case 'sun':
            return '일요일 휴무';
            break;
        }
      }
      const informs = (
        <div className="store-informs center">
          <div>
            {starRateView}
            <div>
              {tvShowToString(this.state.store.tvShow)}
            </div>
          </div>
          <div>
            <div>
              {this.state.store.address}
            </div>
            <div>
              {this.state.store.tell}
            </div>
            <div>
              {this.state.store.openingHours}
            </div>
            <div>
              {dayToKorean(this.state.store.offDay)}
            </div>
          </div>
        </div>
      )
      const menuToComponent = (menus) => {
        return menus.map((item, i) => {
          return (
            <div key={i}>
              <div>{item.name}</div>
              <div>{item.price+'원'}</div>
            </div>
          )
        })
      }
      const smartPhoneMenu = (
        <div className="media-320 media-768">
          {imageSlider}
          {header}
          {informs}
          <div className="store-menu-container">
            <div>메뉴 정보</div>
            {menuToComponent(this.state.store.menus)}
          </div>
        </div>
      )
      const tabletPcMenu = (
        <div className="media-1024 media-1025">
          {imageSlider}
          {header}
          {informs}
          <div className="store-menu-container">
            <div>메뉴</div>
            {menuToComponent(this.state.store.menus)}
          </div>
        </div>
      )
      const mapAndButtons = (
        <div>
          <MapInStoreView locName={this.state.store.name}
                          locLat={this.state.store.location.coordinates[1]}
                          locLng={this.state.store.location.coordinates[0]}/>
          <WayButtons locName={this.state.store.name}
                      locLat={this.state.store.location.coordinates[1]}
                      locLng={this.state.store.location.coordinates[0]}/>
        </div>
      )
      const goToSeedButton = (
        <div className="go-to-seed-button-in-detailed-view">
          <div className="btn-floating btn-large waves-effect waves-light aqua">
            <i className="material-icons">add</i>
          </div>
          <div>
            Seed에 추가
          </div>
        </div>
      )
      // console.log(this.state.store);
      // console.log(imgArr(this.state.store));
      return(
        <div className="section detailed-view">
          {tabletPcMenu}
          {smartPhoneMenu}
          {mapAndButtons}
          {goToSeedButton}
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
