import React, {Component} from 'react';
import './buttons.css';
import '../../media.css';
import { num2str } from '../../components/functions';

export default class Buttons extends Component {
    render() {
        let results_count_string = num2str(this.props.count, ['предложение', 'предложения', 'предложений']);
        return (
            <div className="FlatFilter-button">
                <div className="FlatFilter-buttonSubmit" onClick={this.props.clicked}>Показать {this.props.count} {results_count_string}</div>
                <div className="FlatFilter-showAll" onClick={this.props.reset_clicked}>Сбросить фильтры</div>
            </div>
        )
    }
}