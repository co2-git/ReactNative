// @flow
import React, {PureComponent} from 'react';
import {Card, CardText} from 'material-ui/Card';
import map from 'lodash/map';

import {getAPK} from '../../redux/actions/androidActions';
import APK from './APK';
import Row from '../FlexBox/Row';

class APKs extends PureComponent {
  state = {
    debug: null,
    release: null,
    getDebug: false,
    getRelease: false,
  };
  componentDidMount = () => {
    this.getApks('debug', 'release');
  };
  render = () => (
    <div>
      <Card>
        <CardText>
          <Row between>
            <APK
              data={this.state.debug}
              loading={this.state.getDebug}
              title="Debug"
              lookAgain={() => this.getApks('debug')}
            />
            <APK
              data={this.state.release}
              loading={this.state.getRelease}
              title="Release"
              lookAgain={() => this.getApks('release')}
            />
          </Row>
        </CardText>
      </Card>
    </div>
  );
  getApks = async (...variants) => new Promise(async (resolve, reject) => {
    try {
      const partial = {};
      variants.forEach((variant) => {
        if (variant === 'debug') {
          partial.getDebug = true;
          partial.debug = null;
        }
      });
      this.setState(partial);
      const results = await Promise.all(map(
        variants,
        variant => getAPK(this.props.app, variant),
      ));
      const partial2 = {};
      variants.forEach((variant, index) => {
        if (variant === 'debug') {
          partial2.getDebug = false;
          partial2.debug = results[index];
        }
      });
      this.setState(partial2);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}

export default APKs;
