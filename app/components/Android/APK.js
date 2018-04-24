// @flow
import ActionAndroid from 'material-ui/svg-icons/action/android';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Subheader from 'material-ui/Subheader';

import {dragAPK} from '../../redux/actions/androidActions';
import {roundUp} from '../../helpers/mathHelpers';

const APK = ({data, loading, lookAgain, title}) => (
  <div>
    <h4>{title}</h4>
    <div>
      {loading && (
        <div>
          <CircularProgress />
          <div>Looking for APK</div>
        </div>
      )}
    </div>
    <div>
      {!loading && !data && (
        <div>
          <div>
            <RaisedButton
              label="Look again"
              onClick={lookAgain}
            />
          </div>
          <Subheader>or</Subheader>
          <div>
            <RaisedButton
              label="Generate APK"
              secondary
            />
          </div>
        </div>
      )}
    </div>
    <div>
      {!loading && data && (
        <div>
          <span
            draggable
            onDragStart={() => {
              dragAPK(data.path);
            }}
          >
            <RaisedButton
              label="Debug"
              primary
              icon={<ActionAndroid />}
            />
          </span>
          <Subheader>{roundUp(data.size)} MB</Subheader>
          <div>
            <RaisedButton
              label="Generate new APK"
              secondary
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

export default APK;
