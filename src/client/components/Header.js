import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  currentUser_id: PropTypes.string,
  onLogout: PropTypes.func,
  pathName: PropTypes.string,
  adminPermission: PropTypes.bool
};
const defaultProps = {
  currentUser_id: '',
  onLogout: () => {console.log('logout function is undefined')},
  pathName: '',
  adminPermission: false
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
      const activeStyle = (str) => {
        let willTestRegexp = new RegExp(str);
        if(willTestRegexp.test(this.props.pathName)){
          return "fixed-active";
        }else{
          return undefined;
        }
      }
      const adminButton = (
        <li><Link to='/admin'>admin</Link></li>
      )
      const adminButtonA = (
        <li><a href='/admin'>admin</a></li>
      )
        return(
          <div className="header">
            <nav className="nav-extended">
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo">뭐 할끼니?</Link>
                <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><Link to="/login">sign-in</Link></li>
                  <li><Link to="/register">sign-up</Link></li>
                  <li><Link to='#' onClick={this.props.onLogout}>logout</Link></li>
                  {this.props.adminPermission?adminButton:undefined}
                </ul>
              </div>
              <div className="nav-content">
                <ul className="tabs tabs-transparent">
                  <li className="tab"><Link className={this.props.pathName==='/'?"fixed-active":undefined} to="/">지역별 맛집</Link></li>
                  <li className="tab disabled"><Link to="#test2">메뉴별 맛집</Link></li>
                  <li className="tab disabled"><Link to="#test3">끼니 결정</Link></li>
                  <li className="tab disabled"><Link to="#test4">회차별 맛집</Link></li>
                  <li className="tab"><Link to={this.props.currentUser_id.length>0?"/mypage/"+this.props.currentUser_id:"/mypage"}
                                                      className={activeStyle("mypage")}>My page</Link></li>
                </ul>
              </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
              <li><a href="/login">sign-in</a></li>
              <li><a href="/register">sign-up</a></li>
              <li><Link to='#' onClick={this.props.onLogout}>logout</Link></li>
              {this.props.adminPermission?adminButtonA:undefined}
            </ul>
          </div>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
