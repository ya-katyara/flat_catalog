import React, {Component} from 'react';

export default class FlatinfoItem extends Component {
    render() {
        return(
            <div className="FlatInfo-row">
                <span className="FlatInfo-nom">{this.props.label}</span>
                <span className="FlatInfo-value">{this.props.text}</span>
            </div>
        )
    }
}