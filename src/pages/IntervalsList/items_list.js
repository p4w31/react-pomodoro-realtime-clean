import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import LoadingBars from '../../components/loading_bars';
import ModalError from '../../components/modal_error';
import EditableItemTitle from './editable_item_title';
import { removeIntervalByDate, fetchIntervalsOnceByDate } from '../../actions/intervals.js';

import './items_list.scss';

class ItemsList extends Component{
    constructor(props) {
        super(props);

        let currentDay = moment().format('YYYY-MM-DD');

        this.state = {
            currentDay,
            modalError: false 
        };
    }

    componentDidMount() {
        this.props.fetchIntervalsOnceByDate( this.state.currentDay );
    }

    toggleError = (event) => {
        this.setState({
            modalError: !this.state.modalError
        });
    }

    removeInterval = (val) => {
        this.props.removeIntervalByDate(val, this.state.currentDay)
            .then(() => {
                /**
                 * TODO success alert
                 */
            })
            .catch((err) => {
                this.toggleError();
            });
    }

    displayItems = () => {
        if (this.props.intervals.items.length > 0) {
            return _.map(this.props.intervals.items, (item) => (
                <EditableItemTitle 
                    item={item} 
                    removeInterval={this.removeInterval} 
                    key={item.key}
                />
            ));
        } else {
            return <tr><td colSpan="3">no intervals</td></tr>
        }
        
    }

    render() {
        return (
            <div className="items-list-wrapper">
                <table>
                    <thead>
                        <tr>
                            <td>start</td>
                            <td>stop</td>
                            <td>type</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        { (this.props.intervals.loading) 
                            ? <tr><td colSpan="3"><LoadingBars /></td></tr>
                            : this.displayItems()
                        }
                    </tbody>
                </table>
                <ModalError isOpen={this.state.modalError} toggle={this.toggleError} message="Can't remove interval."/>
            </div>
        );
    }

}

//export default ItemsList;

function mapStateToProps(state) {
    return {
        intervals: state.intervals
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeIntervalByDate,
        fetchIntervalsOnceByDate
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);