import React, {useRef, useState, useEffect} from 'react';
import '../../filter/house_select/select.css';
import SelectItem from '../house_select/select_item.js';
import ArrowIcon from '../../Icons/Arrow.js';

const HouseSelect = ({ houses, changed }) => {
    const node = useRef();
    const houses_list = [
        {id: 0, title: 'Все', display_text: 'Все'},
        {id: 14823, title: 'Дом 1', display_text: '1'},
        {id: 20647, title: 'Дом 7', display_text: '7'},
        {id: 21395, title: 'Дом 8', display_text: '8'},
        {id: 21350, title: 'Дом 10', display_text: '10'}
    ];

    const [open, setOpen] = useState(false);

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [open]);

    let house = houses_list.map(house => {
        return(
            <SelectItem 
            changed={changed} 
            houses={houses}
            key={house.id}
            val={house.id}
            title={house.title} />
        )
    });
    let class_name = 'FlatDropDownCheckboxMenu' + ((open) ? ' FlatDropDownCheckboxMenu-open' : '') + ((houses.length) ? ' FlatDropDownCheckboxMenu-hasValue' : '');
    let current_houses = houses.map(house => {
        return houses_list.find(x => x.id.toString() === house).display_text;
    });
    if (current_houses.includes('Все')) {
        current_houses = 'Все';
    } else {
        current_houses = current_houses.join();
    }
    return (
        <div className={class_name} onClick={e => setOpen(!open)} ref={node}>
            <div className="FlatDropDownCheckboxMenu-wrapper">
                <div className="FlatDropDownCheckboxMenu-placeholder">Номер дома</div>
                <div className="FlatDropDownCheckboxMenu-value">{current_houses}</div>
                <div className="FlatDropDownCheckboxMenu-arrow"><ArrowIcon/></div>
            </div>
            <div className="FlatDropDownCheckboxMenu-block">
                {house}
            </div>
        </div>
    )
}

export default HouseSelect;