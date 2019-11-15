import React, {Component} from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    let calc = window.calc;
    this.state = {
      percent: calc.percent,
      term_months: calc.term_months,
      first_pay_percent: calc.first_pay_percent
    }
  }

  onInputChange = (e) => {
    let name = e.target.name
    this.setState({
      [name]: parseFloat(e.target.value)
    })
  }

  onSettingsSave = () => {
    let newSettings = {
      "percent": this.state.percent,
      "term_months": this.state.term_months,
      "first_pay_percent": this.state.first_pay_percent
    }
    console.log(newSettings);
    fetch(window.location.origin+'/config/api.php', {
      "body": JSON.stringify(newSettings),
      "headers": {
        "Content-Type": "application/json"
      },
      "method": "POST"
    }).then((response)=>response.json()).then(responseJson => {
      console.log(responseJson);
      if (responseJson.success === true) {
        alert('Сохранено!');
      } else {
        alert(responseJson.message);
      }
    });
  }

  render() {
    return (
      <div className="admin_interface_wrapper">
        <div className="admin_fields_form">
          <TextField name="percent" val={this.state.percent} change={this.onInputChange} label="Процент" />
          <TextField name="term_months" val={this.state.term_months} change={this.onInputChange} label="Период (мес.)" />
          <TextField name="first_pay_percent" val={this.state.first_pay_percent} change={this.onInputChange} label="Процент первоначального взноса" />
          <button onClick={this.onSettingsSave}>Сохранить</button>
        </div>
      </div>
    );
  }
}

function TextField(props) {
  return (
    <div>
      <label>{props.label}</label>
      <input className="input_text" type="text" name={props.name} value={props.val} onChange={props.change} />
    </div>
  )
}
