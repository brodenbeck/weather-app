import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from './styles/Button';
import FormStyles from './styles/FormStyles';
import Input from './styles/Input';
import Label from './styles/Label';
import services from '../services/CurrentWeather';

const propTypes = {
  displayError: PropTypes.func.isRequired,
  displayWeather: PropTypes.func.isRequired,
};

class UserLocationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postalCode: '',
    };
  }

  handleGeolocationRequest = () => {
    const {
      displayWeather,
      displayError,
    } = this.props;

    navigator.geolocation.getCurrentPosition((position) => {
      services.getCurrentWeatherByGeolocation(
        position.coords.latitude,
        position.coords.longitude,
        displayWeather,
        displayError,
      );
    });
  }

  handleSubmit = (event) => {
    const {
      displayWeather,
      displayError,
    } = this.props;
    const { postalCode } = this.state;

    event.preventDefault();
    services.getCurrentWeatherByPostalCode(postalCode, displayWeather, displayError);
  }

  handleUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { postalCode } = this.state;

    return (
      <FormStyles onSubmit={this.handleSubmit}>
        <Label
          className={postalCode ? 'Label--lifted' : ''}
          htmlFor="postalCode"
        >
          <span className="Label__text">Postal Code</span>
          <Input
            name="postalCode"
            onChange={this.handleUpdate}
            type="tel"
            value={postalCode}
          />
          {('geolocation' in navigator) && (
            <span
              className="Label--alternate"
              onKeyPress={this.handleGeolocationRequest}
              onClick={this.handleGeolocationRequest}
              role="button"
              tabIndex="0"
            >
              Use current location
            </span>
          )}
        </Label>
        <Button>Submit</Button>
      </FormStyles>
    );
  }
}

UserLocationForm.propTypes = propTypes;

export default UserLocationForm;
