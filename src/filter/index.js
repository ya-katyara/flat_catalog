import React, {Component} from 'react';
import '../filter/filter.css';
import HouseSelect from '../filter/house_select';
import PriceRange from './price_range';
import TextRange from './text_range';
import RoomsCheck from './rooms_check';
import Buttons from './buttons';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {}
        };
        this.filterRef = React.createRef();
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (e) => {
        let scrollTop = window.scrollY;
        let filterHeight = this.filterRef.current.offsetHeight;

        let topPanel = document.querySelector('.top_panel');
        let wrapper = document.querySelector('.Picking-wrapper');

        let footerOffset = wrapper.offsetTop + wrapper.offsetHeight;
        let topPanelOffset = topPanel.offsetTop + topPanel.offsetHeight;

        if (scrollTop + filterHeight >= footerOffset - 100) {
            this.setState({
                style: {
                    position: "absolute",
                    bottom: "10px"
                }
            });
        } else {
            if (scrollTop > topPanelOffset) {
                this.setState({
                    style: {
                        position: "fixed",
                        top: "90px"
                    }
                });
            } else {
                this.setState({
                    style: {}
                });
            }
        }
    }

    render() {
        return (
            <div className="Picking-filter Picking-filterScroll" style={this.state.style} ref={this.filterRef}>
                <div className="FlatFilter">
                    <div className="FlatFilter-wrapper">
                        <div className="FlatFilter-filter">
                            <HouseSelect changed={this.props.changed} houses={this.props.houses} />
                        </div>
                        <div className="FlatFilter-filter">
                            <RoomsCheck changed={this.props.changed} rooms={this.props.rooms} />
                        </div>
                        <div className="FlatFilter-filter">
                            <PriceRange slided={this.props.slided} price_from={this.props.price_from} price_to={this.props.price_to}/>
                        </div>
                        <div className="FlatFilter-filter">
                            <TextRange changed={this.props.changed} label="Площадь м²" name_from="area_from" name_to="area_to" area_from={this.props.area_from} area_to={this.props.area_to} />
                        </div>
                        <div className="FlatFilter-filter">
                            <TextRange changed={this.props.changed} label="Этаж" name_from="floor_from" name_to="floor_to"  floor_from={this.props.floor_from} floor_to={this.props.floor_to} />
                        </div>
                    </div>
                    <Buttons count={this.props.res_count} clicked={this.props.btnClick} reset_clicked={this.props.btnResetClick} />
                </div>
            </div>
        )
    }
}
