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
    console.log('APKS')
    // this.getApks('debug');
  };
  render = () => (
    <div>
      <Card>
        <CardText>
          <Row between>
            <APK
              data={this.state.debug}
              loading={this.getDebug}
              title="Debug"
            />
            <APK
              data={this.state.release}
              loading={this.getRelease}
              title="Release"
            />
          </Row>
        </CardText>
      </Card>
    </div>
  );
  getApks = async (...variants) => new Promise(async (resolve, reject) => {
    try {
      const results = await Promise.all(map(
        variants,
        variant => getAPK(this.props.app, variant),
      ));
      console.log({results});
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}

export default APKs;
