// @flow
export const roundUp = (num: number, precision: number = 2): number => {
  const precision2 = 10 ** precision;
  return Math.ceil(num * precision2) / precision2;
};

export const convertBytesToMegaBytes = (bytes: number): number => bytes / 1000000.0;
