import React, {Component} from 'react';
import './text_range.css';

export default class TextRange extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="FlatFilter-name">{this.props.label}</div>
            <div className="FlatFilter-inputs FlatFilter-inputs-finish">
                <div className="FlatFilter-inputsWrapper FlatFilter-inputsWrapperDual">
                    <div className="FlatFilter-inputsItem">
                        <div className="Input">
                            <div className="Input-placeholder">от</div>
                            <input type="text" onBlur={this.props.changed} onChange={this.props.changed} name={this.props.name_from} value={this.props[this.props.name_from]} placeholder="" />
                        </div>
                    </div>
                    <div className="FlatFilter-inputsItem">
                        <div className="Input">
                            <div className="Input-placeholder">до</div>
                            <input type="text" onBlur={this.props.changed} onChange={this.props.changed} name={this.props.name_to} value={this.props[this.props.name_to]} placeholder="" />
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}