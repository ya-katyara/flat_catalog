import React, {Component} from 'react';
import './switch.css';

export default class Switch extends Component {

    BtnClick = (e) => {
        let el_classes = e.target.classList;
        if (el_classes.contains('FlatSwitch-button--active')) {
            return true;
        } else {
            let buttons = document.getElementsByClassName('FlatSwitch-button');
            for (let btn of buttons) {
                btn.classList.remove("FlatSwitch-button--active");    
            }
            el_classes.add("FlatSwitch-button--active");
        }
        let type = '';
        if (el_classes.contains('FlatSwitch-button-flat')) {
            type = 'flat';
        } else if (el_classes.contains('FlatSwitch-button-floor')) {
            type = 'floor';
        }
        this.props.clicked(type);
    }

    render() {
        return(
            <div className="FlatSwitch">
                <div className="FlatSwitch-buttons">
                    <div className="ComplexSwitchContainer-container">
                        <div className="FlatSwitch-buttons">
                            <div className="FlatSwitch-button FlatSwitch-button-flat FlatSwitch-button--active" onClick={this.BtnClick}>
                                Квартира
                            </div>
                            <div className="FlatSwitch-button FlatSwitch-button-floor" onClick={this.BtnClick}>
                                План этажа
                            </div>
                        </div>
                        <div className="FlatSwitch-button--active ComplexSwitchContainer-active" style={{'width': '150px', 'transform': 'translateX(-2px)'}}></div>
                    </div>
                </div>
            </div>
        )
    }
}