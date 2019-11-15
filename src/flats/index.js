import React, { Component } from 'react';
import '../flats/flats.css';
import Modal from 'react-awesome-modal';
import Plan from '../plan';
import Flat from './flat.js';
import { getFlatsList, getFloorPlans } from '../components/network';
import { sortByPrice } from '../components/functions';

class Flats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flats: [],
            flats_filtered: [],
            flat_imgs: [],
            modal: {
                visible : false,
                flat: {}
            }
        }
        this.flatList = React.createRef();
    };

    openModal = flat => {
        getFloorPlans(flat.house_id).then(plans => {
            flat.plan = (plans[flat.floor] !== undefined) ? plans[flat.floor] : '';
        })
        flat.image = this.state.flat_imgs[flat.id];
        this.setState({
            modal: {
                visible : true,
                flat: flat
            }
        });
    }

    closeModal = () => {
        this.setState({
            modal: {
                visible : false,
                flat: {}
            }
        });
    }

    componentWillMount() {
        getFlatsList().then(flats =>
            {
                flats.sort(sortByPrice);
                this.setState({
                    flats: flats,
                    flats_filtered: flats
                })
                this.setResultCount();
            }
        );
        // getFlatImgs().then(imgs =>
        //     {
        //         this.setState({
        //             flat_imgs: imgs
        //         }, ()=>console.log(this.state));
        //     }
        // );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.houses.length !== this.props.houses.length 
            || prevProps.rooms.length !== this.props.rooms.length 
            || prevProps.price_from !== this.props.price_from 
            || prevProps.price_to !== this.props.price_to
            || prevProps.area_from !== this.props.area_from
            || prevProps.area_to !== this.props.area_to
            || prevProps.floor_from !== this.props.floor_from
            || prevProps.floor_to !== this.props.floor_to)   {
            this.setResultCount();
        }
        if (this.props.applyClicked) {
            this.props.btnToggle();
            this.onFilterButtonClick();
        }
    }

    setResultCount() {
        let filtered = this.filterFlats();
        this.props.updated(filtered.length);
    }

    filterFlats() {
        return this.state.flats.filter(flat => {
            let houses, rooms, price, area, floor;
            houses = rooms = price = area = floor = true;
            if (this.props.houses.length) {
                if (!this.props.houses.includes(flat.house_id.toString())) {
                    houses = false;
                }
            }
            if (this.props.rooms.length) {
                if (!(this.props.rooms.includes(flat.rooms_amount.toString()) && !flat.studio) && !(this.props.rooms.includes("0") && flat.studio)) {
                    rooms = false;
                }
            }
            if (this.props.price_from !== 0 && this.props.price_to !== 0) {
                if (!(flat.price.value >= this.props.price_from && flat.price.value <= this.props.price_to)) price = false;
            }
            if (this.props.area_from !== 0 && this.props.area_to !== 0) {
                if (!(flat.area.area_total >= this.props.area_from && flat.area.area_total <= this.props.area_to)) area = false;
            }
            if (this.props.floor_from != '' && this.props.floor_to != '') {
                if (!(flat.floor >= this.props.floor_from && flat.floor <= this.props.floor_from)) floor = false;
            }
            return houses && rooms && price && area && floor;
        });
    }

    onFilterButtonClick() {
        this.flatList.current.classList.remove('FlatsResultTable--show');
        this.flatList.current.classList.add('FlatsResultTable--hide');
        this.startAnimation(() => {
            this.setState({
                flats_filtered: this.filterFlats()
            }, () => {
                this.flatList.current.classList.remove('FlatsResultTable--hide');
                this.flatList.current.classList.add('FlatsResultTable--show');
            });
        });
    }

    startAnimation(callback) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                callback();
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="FlatsResultTable" ref={this.flatList}>
                    <div className="FlatsResultTable-data">
                        {
                            this.state.flats_filtered.map((flat) => {
                                return (
                                    <Flat flat={flat} key={flat.id} modal={this.openModal} />
                                )
                            })
                        }        
                    </div>
                </div>
                <Modal 
                className='modal-flat'
                visible={this.state.modal.visible}
                width="95%"
                height="82%"
                effect="fadeInUp"
                onClickAway={() => this.closeModal()}
                >
                    <Plan closed={this.closeModal} flat={this.state.modal.flat} />
                </Modal>
            </React.Fragment>
        )
    }
}

export default Flats;