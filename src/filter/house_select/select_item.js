import React, {Component} from 'react';
import Checkbox from '../../Icons/Checkbox.js';

export default class SelectItem extends Component {
    handleCheck = (e) => {
        let check = e.target;
        if ("0" === check.value) {
            let houses = document.querySelectorAll('.FlatDropDownCheckboxMenu-item input');
            for (let house of houses) {
                if ("0" === house.value) {
                    continue;
                }
                house.checked = check.checked;
                this.props.changed(house);
            }
        } else {
            let all_houses = document.querySelector('.FlatDropDownCheckboxMenu-item input[value="0"]');
            if (all_houses.checked) {
                let houses = document.querySelectorAll('.FlatDropDownCheckboxMenu-item input');
                for (let house of houses) {
                    house.checked = false;
                    this.props.changed(house);
                }
                check.checked = true;
            }
        }
        this.props.changed(e);
    }
    render() {
        let isChecked = this.props.houses.includes(this.props.val.toString());
        return (
            <label className="FlatCheckbox FlatDropDownCheckboxMenu-item">
                <input type="checkbox" className="FlatCheckboxChecked" name="house_select" checked={isChecked} onChange={this.handleCheck} value={this.props.val} />
                <span className="FlatCheckboxCheckedCustom">
                    <Checkbox />
                </span>
                <div className="FlatCheckboxTitle">{this.props.title}</div>
            </label>
        )
    }
}