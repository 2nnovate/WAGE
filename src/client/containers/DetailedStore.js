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
        name: "test store",
        thumbnail: "http://news.kbs.co.kr/data/news/2017/01/04/3405677_bH6.jpg",
        reviews: [
          {
            img: "https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2fG8/image/Ri0iEbTftbOLaX0oHxinbMVIGtk.jpg"
          },
          {
            img: "https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/6xp/image/luXUXQoXP7u7xFCIMOGk0Pf9ixc.jpg"
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
      }, 3000)
    }
    render() {
      const store = this.state.store
      const header = (
        <div className="center name">
          {store.name}
        </div>
      )
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
      // console.log(this.state.store);
      // console.log(imgArr(this.state.store));
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
