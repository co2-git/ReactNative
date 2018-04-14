// @flow
import IconButton from 'material-ui/IconButton';
import NameIcon from 'material-ui/svg-icons/content/add-box';
import OpenFolderIcon from 'material-ui/svg-icons/file/folder-open';
import RaisedButton from 'material-ui/RaisedButton';
import React, {PureComponent} from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import {raiseError} from '../../redux/actions/errorsActions';
import {pickFile} from '../../helpers/fsHelpers';
import Row from '../FlexBox/Row';

class Init extends PureComponent<$InitProps, $InitState> {
  state = {
    base: '',
    baseError: '',
    expo: false,
    name: '',
    nameError: '',
  };
  render = () => (
    <div style={{margin: 12}}>
      <Row style={{marginBottom: 12}}>
        <IconButton>
          <NameIcon />
        </IconButton>
        <TextField
          hintText="App name"
          value={this.state.name}
          onChange={this.onChangeName}
          errorText={this.state.nameError}
        />
      </Row>
      <Row style={{marginBottom: 20}}>
        <IconButton onClick={this.onChooseBase}>
          <OpenFolderIcon />
        </IconButton>
        <TextField
          hintText="Base path"
          value={this.state.base}
          onChange={this.onChangeBase}
          errorText={this.state.baseError}
        />
      </Row>
      <Row style={{alignItems: 'center'}}>
        <RaisedButton label="Create" onClick={this.onCreate} />
        <div style={{flexGrow: 2, marginLeft: 20}}>
          <Toggle
            label="Use Expo"
            labelPosition="right"
            toggled={this.state.expo}
            onToggle={this.onToggle}
          />
        </div>
      </Row>
    </div>
  );
  onChangeBase = (event: SyntheticInputEvent<HTMLInputElement>) => this.setState({
    base: event.target.value,
    baseError: !event.target.value ? 'Please choose a base directory' : '',
  });
  onChooseBase = () => {
    pickFile()
      .then((base = '') => this.setState({base, baseError: ''}))
      .catch(raiseError);
  };
  onToggle = (
    event: SyntheticInputEvent<HTMLInputElement>,
    isInputChecked: boolean
  ) => this.setState({expo: isInputChecked});
  onChangeName = (event: SyntheticInputEvent<HTMLInputElement>) => this.setState({
    name: event.target.value,
    nameError: !event.target.value ? 'Please enter a name' : '',
  });
  onCreate = () => {
    this.setState({nameError: ''}, () => {
      const {name, base, expo} = this.state;
      if (!name) {
        this.setState({nameError: 'Please enter a name'});
      } else if (!base) {
        this.setState({baseError: 'Please choose a base directory'});
      } else {
        this.props.onCreate({name, base, expo});
      }
    });
  };
}

export default Init;
