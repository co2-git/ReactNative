import compact from 'lodash/compact';

const merge = (...styles) => {
  const transformed = {};
  styles.forEach((style) => {
    Object.assign(transformed, style);
  });
  return transformed;
};

export default merge;
