import React, { Component } from 'react';
import { credit_calc } from '../components/calc.js';
import { numberFormat } from '../components/functions.js';
import Facing from '../flats/facing.js';
import FlatinfoItem from './flatinfo_item.js';
import './plan.css';
import Switch from './switch.js';
import LockIcon from '../Icons/Lock.js';

export default class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_block: 'flat'
        };
    }

    onSwitch = (type) => {
        this.setState({
            current_block: type
        });
    }

    render() {
        let flat_titles = ['1-комнатная', '2-комнатная', '3-комнатная'];
        let flat_title = this.props.flat.studio ? 'Студия' : flat_titles[this.props.flat.rooms_amount-1];
        return(
            <div className="Flat">
                <div className="FlatData">
                    <Switch clicked={this.onSwitch} />
                    {this.state.current_block==='flat' &&
                    <div className="FlatImages">
                        <div className="PlaningSlide">
                            <div className="PlaningSlide-swipe">
                                <div className="PlaningSlide-image PlaningSlide-image--planing no-bg" style={{'width': '100%'}}>
                                    <a className="PlaningSlide-background" href={this.props.flat.preset} target="_blank" rel="noopener noreferrer"
                                        style={{'backgroundImage': 'url('+this.props.flat.preset+')'}}>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {this.state.current_block==='floor' &&
                    <div className="FlatData-floor">
                        <a className="PlaningSlide-background" href={this.props.flat.plan} target="_blank" rel="noopener noreferrer"
                                        style={{'backgroundImage': 'url('+this.props.flat.plan+')'}}>
                        </a>
                    </div>}
                    <div className="FlatInfo">
                        <div className="FlatInfo-block">
                            <Facing />
                            <div className="FlatName FlatInfo-name">
                                <div className="FlatName-title">{flat_title} квартира</div>
                            </div>
                            <div className="FlatInfo-table">
                                <FlatinfoItem label="Дом" text={this.props.flat.houseName}/>
                                <FlatinfoItem label="Этаж" text={this.props.flat.floor}/>
                                <FlatinfoItem label="Стоимость" text={(this.props.flat.price) ? numberFormat(this.props.flat.price.value) : ''}/>
                                <FlatinfoItem label="Площадь" text={((this.props.flat.area) ? this.props.flat.area.area_total : '') +' м2'}/>
                                <FlatinfoItem label="Ипотека" text={(this.props.flat.price) ? 'от ' + numberFormat(credit_calc(this.props.flat.price.value)) +'/мес' : ''}/>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.flat.status === "BOOKED" && 
                    <div className="LockIcon">
                        <LockIcon />
                    </div>
                }
                <span className="close" onClick={this.props.closed}>X Закрыть</span>
            </div>
        )
    }
}