import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  inform: PropTypes.object
};
const defaultProps = {
  inform: {
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
  }
};

class EachStore extends Component {
    state = {
    }
    render() {
      const tvShowExposeString = (data) =>{
        let output = '';
        for(var i=0; i<data.length; i++){
          let nthTvExpose = data[i];
          output += nthTvExpose.name+" "+nthTvExpose.time;
          if(i === data.length-1){
            return output
          }
        }
      }
      const dayToKorean = (day) => {
        switch(day){
          case 'mon':
          return '월요일';
          break;
          case 'tue':
          return '화요일';
          break;
          case 'wed':
          return '수요일';
          break;
          case 'thur':
          return '목요일';
          break;
          case 'fri':
          return '금요일';
          break;
          case 'sat':
          return '토요일';
          break;
          case 'sun':
          return '일요일';
          break;
        }
      }
        return(
          <div className="store-card">
            <div>
              <img src={this.props.inform.thumbnail} alt={"thumbnail image of "+this.props.inform.name} className="responsive-img"/>
            </div>
            <div>
              <div className="store-card-title">{this.props.inform.name}</div>
              <div>★ {this.props.inform.starRate}</div>
              <div>{tvShowExposeString(this.props.inform.tvShow)}</div>
              <div>{this.props.inform.tell+' | '+dayToKorean(this.props.inform.offDay)+" 후무"}</div>
              <div>{this.props.inform.address}</div>
              <div>{this.props.inform.openingHours}</div>
            </div>
          </div>
        );
    }
}

EachStore.propTypes = propTypes;
EachStore.defaultProps = defaultProps;

export default EachStore;
