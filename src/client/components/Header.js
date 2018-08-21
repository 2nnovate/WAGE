import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};
const defaultProps = {
};

class Header extends Component {
    state = {
    }
    componentDidMount(){
      $(document).ready(function(){
        $('.sidenav').sidenav();
      });
    }
    render() {
        return(
          <div className="header media-1024 media-1025">
            <nav className="nav-extended">
              <div className="nav-wrapper">
                <a href="#" className="brand-logo">뭐 할끼니?</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><a href="sass.html">sign-in</a></li>
                  <li><a href="badges.html">sign-up</a></li>
                </ul>
              </div>
              <div className="nav-content">
                <ul className="tabs tabs-transparent">
                  <li className="tab"><a className="active" href="#test1">지역별 맛집</a></li>
                  <li className="tab disabled"><a href="#test2">메뉴별 맛집</a></li>
                  <li className="tab disabled"><a href="#test3">끼니 결정</a></li>
                  <li className="tab disabled"><a href="#test4">회차별 맛집</a></li>
                  <li className="tab disabled"><a href="#test4">My page</a></li>
                </ul>
              </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
              <li><a href="sass.html">sign-in</a></li>
              <li><a href="badges.html">sign-up</a></li>
            </ul>
          </div>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
