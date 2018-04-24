// @flow
import map from 'lodash/map';
import React, {PureComponent} from 'react';

import {getAPK} from '../../redux/actions/androidActions';
import APK from './APK';

class APKs extends PureComponent<$APKsProps, $APKsState> {
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
      <APK
        title="Debug"
        subtitle="APK with React Native developer tools"
        loading={this.state.getDebug}
        data={this.state.debug}
        lookAgain={() => this.getApks('debug')}
        app={this.props.app}
      />
      <APK
        title="Release"
        subtitle="Play Store ready production APK"
        loading={this.state.getRelease}
        data={this.state.release}
        lookAgain={() => this.getApks('release')}
        app={this.props.app}
      />
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
      reject(error);
    }
  });
}

export default APKs;
