// @flow
import ActionAndroid from 'material-ui/svg-icons/action/android';
import RemoveIcon from 'material-ui/svg-icons/navigation/more-vert';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import React, {PureComponent} from 'react';
import Subheader from 'material-ui/Subheader';
import {Card, CardText, CardHeader, CardActions} from 'material-ui/Card';
import path from 'path';

import {dragAPK} from '../../redux/actions/androidActions';
import {roundUp} from '../../helpers/mathHelpers';
import {dangerBackgroundColor, dangerColor} from '../../styles/vars/colors';
import Terminal from '../Terminal/Console';

class APK extends PureComponent<$APKProps, $APKState> {
  state = {showTerminal: false, showFailMessage: false};
  render = () => (
    <Card style={{marginBottom: 12}}>
      <CardHeader
        title={this.props.title}
        subtitle={this.props.subtitle}
      />
      <CardActions>
        {this.props.loading && (
          <CircularProgress />
        )}
        {!this.props.loading && !this.props.data && (
          <Subheader style={{color: dangerColor}}>No APK found</Subheader>
        )}
        {!this.props.loading && !this.props.data && (
          <div>
            <RaisedButton
              label="Look again"
              onClick={this.props.lookAgain}
            />
            <RemoveIcon />
            <RaisedButton
              label="Generate APK"
              secondary
              onClick={() => {
                if (this.state.showTerminal) {
                  this.setState({showTerminal: false, showFailMessage: false}, () => {
                    setTimeout(() => this.setState({showTerminal: true}), 750);
                  });
                } else {
                  this.setState({showTerminal: true});
                }
              }}
            />
          </div>
        )}
        {!this.props.loading && this.props.data && (
          <div>
            <span
              draggable
              onDragStart={() => {
                dragAPK(this.props.data.path);
              }}
            >
              <RaisedButton
                label={`${this.props.title} (${roundUp(this.props.data.size)} MB)`}
                primary
                icon={<ActionAndroid />}
              />
            </span>
            <RemoveIcon />
            <RaisedButton
              label="Generate APK"
              secondary
              onClick={this.props.lookAgain}
            />
          </div>
        )}
        <CardText expandable>
          {this.state.showTerminal && (
            <div>
              {this.props.title === 'Release' && this.state.showFailMessage && (
                <div
                  style={{
                    padding: 12,
                    color: dangerColor,
                    fontWeight: 'bold',
                    border: `2px solid ${dangerColor}`,
                    borderRadius: 4,
                    backgroundColor: dangerBackgroundColor,
                    marginBottom: 12,
                  }}
                >
                  Build failed! Are you sure you read the <a
                    href="https://facebook.github.io/react-native/docs/signed-apk-android.html"
                    target="_blank"
                    rel="noopener noreferrer"
                   >doc</a>?
                </div>
              )}
              <Terminal
                command={`${
                  path.join(this.props.app.path, 'android', 'gradlew')
                } assemble${this.props.title}`}
                cwd={path.join(this.props.app.path, 'android')}
                onDone={this.props.lookAgain}
                onFail={() => this.setState({showFailMessage: true})}
              />
            </div>
          )}
        </CardText>
      </CardActions>
    </Card>
  );
}

export default APK;
