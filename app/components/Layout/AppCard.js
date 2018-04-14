// @flow
import React, {PureComponent} from 'react';
import {Card, CardHeader, CardActions} from 'material-ui/Card';
import path from 'path';
import Chip from 'material-ui/Chip';

import Animated from '../Base/Animated';

type $AppCardOwnProps = {
  app: $App,
};

type $AppCardProps =
  & $AppCardOwnProps
  ;

class AppCard extends PureComponent<$AppCardProps> {
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
          {(
            this.props.app.info &&
            this.props.app.info.dependencies &&
            this.props.app.info.dependencies['react-native'] && (
              <Chip>
                React Native v{this.props.app.info.dependencies['react-native']}
              </Chip>
            )
          )}
        </CardActions>
      </Card>
    </Animated>
  );
}

export default AppCard;
