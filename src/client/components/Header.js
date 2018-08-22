import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  currentUser_id: PropTypes.string
};
const defaultProps = {
  currentUser_id: ''
};

class Header extends Component {
    state = {
    }
    componentDidMount(){
      $(document).ready(function(){
        $('.sidenav').sidenav();
      });
    }
    // **상위 컴포넌트로 부터 현재 페이지정보를 받으면 해당 정보를 통해 헤더의 class 값에 active 를 주기(jQuery 이용해서)
    render() {
        return(
          <div className="header media-1024 media-1025">
            <nav className="nav-extended">
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo">뭐 할끼니?</Link>
                <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><Link to="/login">sign-in</Link></li>
                  <li><Link to="/register">sign-up</Link></li>
                </ul>
              </div>
              <div className="nav-content">
                <ul className="tabs tabs-transparent">
                  <li className="tab"><a className="active" href="#test1">지역별 맛집</a></li>
                  <li className="tab disabled"><Link to="#test2">메뉴별 맛집</Link></li>
                  <li className="tab disabled"><Link to="#test3">끼니 결정</Link></li>
                  <li className="tab disabled"><Link to="#test4">회차별 맛집</Link></li>
                  <li className="tab disabled"><Link to={this.props.currentUser_id.length>0?"/mypage/"+this.props.currentUser_id:"/mypage"}>My page</Link></li>
                </ul>
              </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
              <li><a href="/login">sign-in</a></li>
              <li><a href="/register">sign-up</a></li>
            </ul>
          </div>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
