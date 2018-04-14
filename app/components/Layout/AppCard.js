// @flow
import React, {PureComponent} from 'react';
import {Card, CardHeader, CardActions} from 'material-ui/Card';
import path from 'path';
import RaisedButton from 'material-ui/RaisedButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import Animated from '../Base/Animated';
import {closeApp} from '../../redux/actions/appsActions';

class AppCard extends PureComponent<$AppCardProps, $AppCardState> {
  state = {expanded: false};
  render = () => (
    <Animated rubberBand>
      <Card
        expanded={this.state.expanded}
        onExpandChange={() => console.log('hello')}
        style={{marginBottom: 12}}
      >
        <CardHeader
          title={path.basename(this.props.app.path)}
          subtitle={path.dirname(this.props.app.path)}
          actAsExpander
          showExpandableButton={false}
        />
        <CardActions>
          <RaisedButton
            label="Remove app from list"
            icon={<CloseIcon style={{marginTop: -4}} />}
            onClick={() => closeApp(this.props.app)}
          />
        </CardActions>
      </Card>
    </Animated>
  );
}

export default AppCard;
