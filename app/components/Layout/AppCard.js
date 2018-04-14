// @flow
import React, {PureComponent} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import path from 'path';

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
    <Animated bounce>
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
      </Card>
    </Animated>
  );
}

export default AppCard;
