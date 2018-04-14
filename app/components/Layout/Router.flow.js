// @flow

type $RouterOwnProps = {};

type $RouterConnectProps = {
  apps: $App[],
  error: ?Error,
};

// eslint-disable-next-line no-unused-vars
type $RouterProps =
  & $RouterOwnProps
  & $RouterConnectProps
  ;

// eslint-disable-next-line no-unused-vars
type $RoouterState = {
  apps: $App[],
  open: boolean,
  search: string,
};
