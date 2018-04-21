// @flow
import ActionAndroid from 'material-ui/svg-icons/action/android';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Subheader from 'material-ui/Subheader';

const APK = ({data, loading, title}) => (
  <div>
    <h4>{title}</h4>
    <div>
      {loading && (
        <CircularProgress />
      )}
    </div>
    <div>
      {loading && !data && (
        <div>
          No apk found
        </div>
      )}
    </div>
    <div>
      {loading && data && (
        <div>
          <span
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData(
                'DownloadURL',
                `text/html:cool.apk:data:;base64,`,
              );
            }}
          >
            <RaisedButton
              label="Debug"
              primary
              icon={<ActionAndroid />}
            />
          </span>
          <Subheader>47 Mb</Subheader>
        </div>
      )}
    </div>
  </div>
);

export default APK;
