import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};
const defaultProps = {
};

class LowerMenuBar extends Component {
    state = {

    }
    render() {
        return(
            <div className="lower-menu-bar">
              <div>
                <div>
                  <i className="material-icons">my_location</i>
                  내주변
                </div>
              </div>
              <div>
                <div>
                  <i className="material-icons">restaurant_menu</i>
                  메뉴별
                </div>
              </div>
              <div>
                <div>
                  뭐 할<br />끼니?
                </div>
              </div>
              <div>
                <div>
                  <i className="material-icons">live_tv</i>
                  회차별
                </div>
              </div>
              <div>
                <div>
                  <i className="material-icons">account_circle</i>
                  My
                </div>
              </div>
            </div>
        );
    }
}

LowerMenuBar.propTypes = propTypes;
LowerMenuBar.defaultProps = defaultProps;

export default LowerMenuBar;
