import React, {Component} from 'react';
import { numberFormat } from '../components/functions.js';
import { credit_calc } from '../components/calc.js';
import LockIcon from '../Icons/Lock.js';
import Facing from './facing.js';

export default class Flat extends Component {
    render() {
        let flat_titles = ['Однокомнатная', 'Двухкомнатная', 'Трехкомнатная'];
        let flat_title = this.props.flat.studio ? 'Студия' : flat_titles[this.props.flat.rooms_amount-1];
        return(
            <div className="FlatsResultTable-row">
                <div className="FlatsResultTable-link" onClick={()=>this.props.modal(this.props.flat)}>
                    <div className="FlatsResultTable-rowInfo">
                        <div className="FlatsResultTable-rowLayout">
                            <img src={this.props.flat.preset} alt="планировка" />
                        </div>
                        <div className="FlatsResultTable-rowTitle">
                            <div className="FlatsResultTable-rowTitle--section">{this.props.flat.houseName}, {this.props.flat.sectionName}</div>
                            <div className="FlatsResultTable-rowTitle--room">{flat_title} {this.props.flat.area.area_total} м²</div>
                            <div className="FlatsResultTable-rowTitle--feature"><span>{this.props.flat.floor} этаж</span></div>
                            <div className="FlatsResultTable-rowBanners">
                                <Facing />
                                {this.props.flat.status === "BOOKED" && 
                                    <div className="LockIcon" onClick={(e)=>e.stopPropagation()}>
                                        <LockIcon />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="FlatsResultTable-rowPrice">
                        <div className="FlatsResultTable-rowPriceMeter">
                            <div className="FlatsResultTable-rowPriceTitle">{numberFormat(this.props.flat.price.value)}</div>
                            от {numberFormat(credit_calc(this.props.flat.price.value))}/мес
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}