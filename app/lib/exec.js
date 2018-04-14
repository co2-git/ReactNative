import {spawn} from 'child_process';
import Emitter from 'events';

const $spawn = (cmd, options = {}) => {
  const emitter = new Emitter();
  setTimeout(() => {
    const [entry, ...bits] = cmd.trim().split(/\s+/);
    const ps = spawn(entry, bits, options);
    let done = false;
    emitter.emit('pid', ps.pid);
    ps
      .on('error', error => emitter.emit('error', error))
      .on('exit', (status) => {
        done = true;
        if (status === 0) {
          emitter.emit('done');
        } else {
          emitter.emit('failed', status);
        }
      })
      .on('close', (status) => {
        if (!done) {
          done = true;
          if (status === 0) {
            emitter.emit('done');
          } else {
            emitter.emit('failed', status);
          }
        }
      });
    ps.stdout.on('data', data => emitter.emit('data', {
      std: 'out',
      buffer: data,
      message: data.toString(),
    }));
    ps.stderr.on('data', data => emitter.emit('data', {
      std: 'err',
      buffer: data,
      message: data.toString(),
    }));
    emitter.on('write', message => ps.stdin.write(message));
    emitter.on('kill', () => $spawn(`kill -9 ${ps.pid}`));
  });
  return emitter;
};

export default $spawn;
