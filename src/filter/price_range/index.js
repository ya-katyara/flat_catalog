import React, {Component} from 'react';
import { Range } from 'rc-slider';
import { numberFormat } from '../../components/functions.js';
import './price_range.css';

export default class PriceRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lowerBound: 0,
            upperBound: 0,
            value: [0, 0]
        }
    }

    onSliderChange = (value) => {
        this.setState({
            value
        });
    }

    onSliderAfterChange = (value) => {
        this.props.slided(value);
    }

    componentDidMount() {
        this.setState({
            lowerBound: this.props.price_from,
            upperBound: this.props.price_to,
            value: [this.props.price_from, this.props.price_to]
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                value: [this.props.price_from, this.props.price_to]
            })
        }
    }

    render() {
        return (
            <React.Fragment>
            <div className="FlatFilter-name">Стоимость, ₽</div>
            <div className="FlatFilter-inputs">
                <div className="FlatFilter-inputsWrapper FlatFilter-inputsWrapperPrice">
                    <div className="FlatFilter-inputsItem">
                        <div className="Input">
                            <input type="text" readOnly name="price_from" value={numberFormat(this.state.value[0])} />
                        </div>  
                    </div>
                    <div className="FlatFilter-inputsItem">
                        <div className="Input">
                            <input type="text" readOnly name="price_to" value={numberFormat(this.state.value[1])} />
                        </div>
                    </div>
                </div>
                <div className="FlatFilter-inputs">
                    <Range 
                        value={this.state.value}
                        min={this.state.lowerBound}
                        max={this.state.upperBound}
                        onChange={this.onSliderChange} 
                        onAfterChange={this.onSliderAfterChange}
                    />
                </div>
            </div>
            </React.Fragment>
        )
    }
}