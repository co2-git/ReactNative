// @flow
import ActionAndroid from 'material-ui/svg-icons/action/android';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Subheader from 'material-ui/Subheader';

import {dragAPK} from '../../redux/actions/androidActions';
import {roundUp} from '../../helpers/mathHelpers';

const APK = ({data, loading, title}) => (
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
          No apk found
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
        </div>
      )}
    </div>
  </div>
);

export default APK;
