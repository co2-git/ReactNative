import fs from 'fs';
import {remote} from 'electron';
import first from 'lodash/first';

export const readDir = dir => new Promise(async (resolve, reject) => {
  fs.readdir(dir, (error, files) => {
    if (error) {
      reject(error);
    } else {
      resolve(files);
    }
  });
});

export const read = (file, options = {}) => new Promise((resolve, reject) => {
  let source = '';
  fs.createReadStream(file, options)
    .on('error', reject)
    .on('data', data => {
      source += data.toString();
    })
    .on('end', () => {
      resolve(source);
    });
});

export const stat = dir => new Promise(async (resolve, reject) => {
  fs.stat(dir, (error, stats) => {
    if (error) {
      reject(error);
    } else {
      resolve(stats);
    }
  });
});

const defaultProperties = ['openDirectory'];

export const pickFile = ({properties = defaultProperties} = {}) => new Promise(async (resolve, reject) => {
  try {
    let path;
    const directories = await remote.dialog.showOpenDialog({properties});
    if (directories) {
      path = first(directories);
    }
    resolve(path);
  } catch (error) {
    reject(error);
  }
});
