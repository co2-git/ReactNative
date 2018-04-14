import React, {PureComponent} from 'react';
import TextField from 'material-ui/TextField';
import {Column, Row} from 'reactors-flex';
import OpenFolderIcon from 'material-ui/svg-icons/file/folder-open';
import IconButton from 'material-ui/IconButton';

import {pickFile} from '../../helpers/fsHelpers';

class EjectSettings extends PureComponent {
  state = {
    config: '',
  };
  render = () => (
    <div style={{margin: 12, marginRight: 24, marginLeft: 0}}>
      <Row flexBetween style={{alignItems: 'center'}}>
        <IconButton onClick={this.onChooseConfigFile}>
          <OpenFolderIcon />
        </IconButton>
        <TextField
          hintText="Config"
          value={this.state.config}
          onChange={this.onChangeConfig}
          floatingLabelText="Config"
          style={{flexGrow: 2}}
        />
      </Row>
    </div>
  );
  onChangeConfig = event => this.setState({config: event.target.value});
  onChooseConfigFile = () => {
    pickFile({properties: ['openFile']})
      .then((config = '') => this.setState({config}))
      .catch(error => console.log(error.stack));
  };
}

export default EjectSettings;
