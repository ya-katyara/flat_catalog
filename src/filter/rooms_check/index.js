import React, {Component} from 'react';
//TODO: вынести чекбокс в функц компонент
export default class RoomsCheck extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="FlatFilter-name">Количество комнат</div>
                <div className="FlatFilter-buttons">
                    <div className="FlatFilter-buttonsWrapper FlatFilter-buttonsWrapperChecked">
                        <label className="FlatFilter-check FlatFilter-check--active">
                            <input type="checkbox" className="FlatFilter-checkChecked" name="rooms_select" onChange={this.props.changed} value="0"
                            checked={this.props.rooms.includes("0")} />
                            <div className="FlatFilter-checkCheckedCustom">
                                <span>Ст</span>
                            </div>
                        </label>
                        <label className="FlatFilter-check">
                            <input type="checkbox" className="FlatFilter-checkChecked" name="rooms_select" onChange={this.props.changed}  value="1" 
                            checked={this.props.rooms.includes("1")} />
                            <div className="FlatFilter-checkCheckedCustom">
                                <span>1</span>
                            </div>
                        </label>
                        <label className="FlatFilter-check">
                            <input type="checkbox" className="FlatFilter-checkChecked" name="rooms_select" onChange={this.props.changed}  value="2" 
                            checked={this.props.rooms.includes("2")} />
                            <div className="FlatFilter-checkCheckedCustom">
                                <span>2</span>
                            </div>
                        </label>
                        <label className="FlatFilter-check">
                            <input type="checkbox" className="FlatFilter-checkChecked" name="rooms_select" onChange={this.props.changed}  value="3" 
                            checked={this.props.rooms.includes("3")} />
                            <div className="FlatFilter-checkCheckedCustom">
                                <span>3</span>
                            </div>
                        </label>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}