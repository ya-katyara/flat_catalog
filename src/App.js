import React, {Component} from 'react';
import './App.css';
import './fonts.css';
import Flats from './flats';
import Filter from './filter';
import Media from 'react-responsive';
import CloseIcon from './Icons/Close.js';

export default class App extends Component {
  price_from = 1000000;
  price_to = 6000000;
  constructor(props) {
    super(props);
    this.state = {
        house_select: [],
        rooms_select: [],
        price_from: this.price_from,
        price_to: this.price_to,
        area_from: 31.96,
        area_to: 81.05,
        floor_from: '',
        floor_to: '',
        res_count: 92,
        apply_btn_clicked: true,
        popup: {
            visible : false
        }
    };
  }

  handleInputChange = (e) => {
    const target = e.target || e;
    const value = target.value;
    const name = target.name;

    if ('checkbox' === target.type) {
        if (target.checked) {
            this.setState((state) => {
                const list = state[name].concat(value);
                console.log(list);
                return {
                  [name]: list
                };
            });
        } else {
            this.setState((state) => {
                const list = state[name].filter(item => item !== value);
          
                return {
                  [name]: list
                };
            });
        }
    } else {
        this.setState({
            [name]: value
        });
    }
    this.setState({
      apply_btn_clicked: false
    });
  }

  handleRangeSlider = (val) => {
    this.setState({
      price_from: val[0],
      price_to: val[1]
    }, ()=>console.log(this.state));
  }

  updateResultCount = (count) => {
    this.setState({
      res_count: count
    });
  }

  applyBtnToggle = () => {
    this.setState(state => {
      return {
        apply_btn_clicked: !state.apply_btn_clicked
      }
    });
    this.closePopup();
  }

  resetAllFilters = () => {
    this.setState({
      house_select: [],
      rooms_select: [],
      price_from: this.price_from,
      price_to: this.price_to,
      area_from: 31.96,
      area_to: 81.05,
      floor_from: '',
      floor_to: '',
      res_count: 92,
      apply_btn_clicked: false
    });
    this.closePopup();
    this.applyBtnToggle();
  }

  openPopup = () => {
    document.body.style.overflow = 'hidden';
    this.setState({
        popup: {
            visible : true
        }
    });
  }

  closePopup = () => {
    document.body.style.overflow = '';
    this.setState({
        popup: {
            visible : false
        }
    });
  }

  render() {
    let filter = <Filter 
      changed={this.handleInputChange}
      slided={this.handleRangeSlider}
      houses={this.state.house_select}
      rooms={this.state.rooms_select}
      price_from={this.state.price_from}
      price_to={this.state.price_to}
      area_from={this.state.area_from}
      area_to={this.state.area_to}
      floor_from={this.state.floor_from}
      floor_to={this.state.floor_to}
      res_count={this.state.res_count}
      btnClick={this.applyBtnToggle}
      btnResetClick={this.resetAllFilters}
    />;
    return (
      <React.Fragment>
      <div className="top_panel">
        <div className="top_panel_inner">
          <Media query="(max-width: 900px)">
            {matches =>
            matches ? (
              <React.Fragment>
              <div className="top_panel_button">
                <span className="btnPopup" onClick={this.openPopup}>Фильтры</span>
              </div>
              </React.Fragment>
            ) : (
              <div className="top_panel_header">
                <h1>Квартиры</h1>
              </div>
            )}
          </Media>
        </div>
      </div>
      <div className="Picking-wrapper">
        <Media query="(max-width: 900px)">
        {matches =>
          matches ? (
            <div className={'Picking-popup' + (this.state.popup.visible ? ' Picking-popup--show' : '')}>
              <div className="Picking-popupFilter">
                <PopupHead clicked={this.closePopup} />
                {filter}
              </div>
            </div>
          ) : (
            <div className="Picking-filter-wrapper">
              {filter}
            </div>
          )
        }
        </Media>

        <div className="Picking-result-wrapper">
          <div className="Picking-result">
            <Flats 
              updated={this.updateResultCount}
              houses={this.state.house_select}
              rooms={this.state.rooms_select}
              price_from={this.state.price_from}
              price_to={this.state.price_to}
              area_from={this.state.area_from}
              area_to={this.state.area_to}
              floor_from={this.state.floor_from}
              floor_to={this.state.floor_to}
              btnToggle={this.applyBtnToggle}
              applyClicked={this.state.apply_btn_clicked}
            />
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

function PopupHead(props) {
  return (
    <div className="Picking-popupHead">Фильтры
      <CloseIcon onClick={props.clicked}/> 
    </div>
  );
}