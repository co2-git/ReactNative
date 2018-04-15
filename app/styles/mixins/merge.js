import compact from 'lodash/compact';

const merge = (...styles) => {
  const transformed = {};
  const realStyles = compact(styles);
  for (const style of realStyles) {
    Object.assign(transformed, style);
  }
  return transformed;
};

export default merge;
