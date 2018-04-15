// @flow
import React, {PureComponent} from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import map from 'lodash/map';
import keys from 'lodash/keys';
import startCase from 'lodash/startCase';

import {android} from '../../../config.json';

const defaultState = {};

for (const key in android.runOptions) {
  defaultState[key] = android.runOptions[key].default;
}

class AndroidRunOptions extends PureComponent<$AndroidRunOptionsProps, $AndroidRunOptionsState> {
  state = {options: {...defaultState}};
  render = () => (
    <div>
      {map(keys(android.runOptions).sort(), (key) => {
        const option = android.runOptions[key];
        if (option.type === 'boolean') {
          return (
            <div key={key}>
              <Toggle
                label={option.label || startCase(key)}
                toggled={option.default}
                labelStyle={{color: '#777'}}
                value={this.state.options[key]}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                  const {value} = event.target;
                  this.setState({
                    options: {
                      ...this.state.options,
                      [key]: value,
                    },
                  }, () => {
                    this.props.onChange(key, option, value);
                  });
                }}
              />
            </div>
          );
        }
        if (option.type === 'string') {
          return (
            <div key={key}>
              <TextField
                hintText={startCase(key)}
                floatingLabelText={startCase(key)}
                errorText={option.label || startCase(key)}
                errorStyle={{color: '#777'}}
                floatingLabelStyle={{color: '#777'}}
                fullWidth
                value={this.state.options[key]}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                  const {value} = event.target;
                  this.setState({
                    options: {
                      ...this.state.options,
                      [key]: value,
                    },
                  }, () => {
                    this.props.onChange(key, option, value);
                  });
                }}
              />
            </div>
          );
        }
        if (option.type === 'number') {
          return (
            <div key={key}>
              <TextField
                hintText={startCase(key)}
                floatingLabelText={startCase(key)}
                errorText={option.label || startCase(key)}
                errorStyle={{color: '#777'}}
                floatingLabelStyle={{color: '#777'}}
                fullWidth
                value={this.state.options[key]}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                  const {value} = event.target;
                  this.setState({
                    options: {
                      ...this.state.options,
                      [key]: value,
                    },
                  }, () => {
                    this.props.onChange(key, option, value);
                  });
                }}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default AndroidRunOptions;
