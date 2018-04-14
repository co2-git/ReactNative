import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import React, {PureComponent} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import PackagerSettings from './PackagerSettings';
import Terminal from '../Terminal/Console';
import * as metroActions from '../../redux/actions/metroActions';

const Start = ({app, status}) => (
  <div style={{margin: 12}}>
    <Card>
      <CardHeader
        title="Packager"
        subtitle="Start/stop metro packager"
        showExpandableButton
        actAsExpander
      />
      <CardText expandable>
        <PackagerSettings />
      </CardText>
      <CardActions>
        {
          !status || !status.on ? (
            <RaisedButton
              label="Start"
              primary
              onClick={() => metroActions.start(app)}
            />
          ) : (
            <RaisedButton
              label="Stop"
              secondary
              onClick={metroActions.start}
            />
          )
        }
      </CardActions>
      <CardText>
        {status && (
          <Terminal
            command="react-native start"
            cwd={app.path}
          />
        )}
      </CardText>
    </Card>
  </div>
);

const selector = (state, props) => ({
  status: state.metroStatus[props.app.path],
});

export default connect(selector)(Start);
