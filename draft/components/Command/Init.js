import React, {PureComponent} from 'react';
import path from 'path';

import * as initActions from '../../redux/actions/initActions';
import Terminal from '../Terminal/Console';

class Init extends PureComponent {
  state = {showTerminal: false};
  render = () => (
    <div>
      <div>This folder does not seem to contain any react app in it.</div>
      <button onClick={() => this.setState({showTerminal: true})}>Init</button>
      {this.state.showTerminal && (
        <Terminal
          command={`react-native init ${path.basename(this.props.app.path)}`}
          cwd={path.dirname(this.props.app.path)}
          inputHandlers={[
            (data, ps) => {
              if (/Directory.+already exists.+Continue\?/i.test(data)) {
                ps.emit('write', 'yes\n');
              }
            }
          ]}
        />
      )}
    </div>
  );
}

export default Init;
