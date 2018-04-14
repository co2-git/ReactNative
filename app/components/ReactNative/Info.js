import React, {PureComponent} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import map from 'lodash/map';
import keys from 'lodash/keys';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import get from 'lodash/get';

import exec from '../../lib/exec';
import {getInfo} from '../../redux/actions/infoActions';

class Info extends PureComponent {
  componentDidMount = () => {
    getInfo(this.props.app);
  };
  render = () => (
    <div style={{margin: 12}}>
      <Card style={{marginBottom: 12}}>
        <CardHeader
          title="Environment"
          subtitle="Information about your local environment"
          showExpandableButton
          actAsExpander
        />
        <CardText expandable>
          {Boolean(this.props.info) && map(keys(this.props.info.environment), key => (
            <div key={key}>
              <TextField
                disabled
                hintText={key}
                defaultValue={this.props.info.environment[key]}
                floatingLabelText={key}
              />
            </div>
          ))}
        </CardText>
      </Card>
      <Card>
        <CardHeader
          title="Packages"
          subtitle="Information about installed packages"
          showExpandableButton
          actAsExpander
        />
        <CardText expandable>
          {Boolean(this.props.info) && map(keys(this.props.info.packages), key => (
            <div key={key}>
              <TextField
                disabled
                hintText={this.props.info.packages[key].wanted}
                defaultValue={this.props.info.packages[key].installed}
                floatingLabelText={`${key} (wanted: ${this.props.info.packages[key].wanted})`}
              />
            </div>
          ))}
        </CardText>
      </Card>
    </div>
  );
}

const selector = (state, props) => ({
  info: state.info[props.app.path],
});

export default connect(selector)(Info);
