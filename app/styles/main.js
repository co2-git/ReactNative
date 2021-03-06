import {
  lightBlue800,
  grey500,
} from 'material-ui/styles/colors';

import * as metrics from './vars/metrics';

export const pageStyle = {
  boxSizing: 'border-box',
  height: '100vh',
  overflow: 'auto',
  width: '100vw',
};

export const consoleStyle = {
  backgroundColor: '#000',
  borderRadius: 8,
  boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.25)',
  color: '#fff',
  marginTop: 12,
  maxHeight: 350,
  overflow: 'auto',
  padding: 10,
  lineHeight: 1.5,
};

export const linkStyle = {
  color: lightBlue800,
  fontWeight: 'bold',
  cursor: 'pointer',
};

export const lightInfoMessage = {
  color: grey500,
  fontSize: '105%',
  fontStyle: 'italic',
  marginLeft: metrics.adjustWithCard,
  marginRight: metrics.adjustWithCard,
};

export const appTopBarStyle = {
  flexShrink: 0,
};

export const appMainStyle = {
  flexGrow: 2,
  overflow: 'hidden',
  boxSizing: 'border-box',
};

export const appTabStyle = {
  overflow: 'auto',
  boxSizing: 'border-box',
  height: 'calc(100vh - 120px)',
};

export const logLevelToggleStyle = {
  padding: metrics.gutter,
  flexGrow: 2,
};
