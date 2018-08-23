import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  currentUser_id: PropTypes.string,
  pathName: PropTypes.string
};
const defaultProps = {
  currentUser_id: '',
  pathName: ''
};

class LowerMenuBar extends Component {
    state = {

    }
    render() {
      const activeStyle = (str) => {
        let willTestRegexp = new RegExp(str);
        if(willTestRegexp.test(this.props.pathName)){
          return "active-lower-menu";
        }else{
          return undefined;
        }
      }
        return(
            <div className="lower-menu-bar">
              <div>
                <Link to='/' className={this.props.pathName==='/'?"active-lower-menu":undefined}>
                  <i className="material-icons">my_location</i>
                  내주변
                </Link>
              </div>
              <div>
                <Link to='/per-menu' className={activeStyle("per-menu")}>
                  <i className="material-icons">restaurant_menu</i>
                  메뉴별
                </Link>
              </div>
              <div>
                <Link to='/decision' className={activeStyle("decision")}>
                  뭐 할<br />끼니?
                </Link>
              </div>
              <div>
                <Link to='/per-tv-show-time' className={activeStyle("per-tv-show-time")}>
                  <i className="material-icons">live_tv</i>
                  회차별
                </Link>
              </div>
              <div>
                <Link to={'/mypage/'+this.props.currentUser_id} className={activeStyle("mypage")}>
                  <i className="material-icons">account_circle</i>
                  My
                </Link>
              </div>
            </div>
        );
    }
}

LowerMenuBar.propTypes = propTypes;
LowerMenuBar.defaultProps = defaultProps;

export default LowerMenuBar;
