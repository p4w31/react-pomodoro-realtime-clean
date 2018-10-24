import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth.js';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import './menu_top.scss';

class MenuTop extends Component {
    logout = () => {
        this.props.signOut()
            .then((authData) => {
                this.props.history.push('/login');
            })
            .catch((err) => {
                /**
                 * TODO alert with err
                 */
            });
    }

    redirectTo = (path) => {
        this.props.history.push(`/${path}`);
    }

    renderMenu = () => {
        return (
            <div className="menu-top-wrapper">
                <span className="menu-link" onClick={ () => this.redirectTo('timers') }>
                    Timers
                </span>
                <span className="menu-link" onClick={ () => this.redirectTo('list') }>
                    List
                </span>
                <span className="menu-link logout" onClick={ this.logout }>
                    Logout
                </span>
                <span className="menu-link email" onClick={ () => this.redirectTo('list') }>
                    [{ this.props.user.email }]
                </span>
            </div>
        );
    }

    render() {
        return (
            ( this.props.user )
                ? this.renderMenu()
                : null
        );
    }
}

function mapStatsToProps(state) {
    return {
        user: state.user
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators ({
        signOut
    }, dispatch);
}

export default compose(
    withRouter,
    connect(mapStatsToProps, mapDispatchToProps)
)(MenuTop);