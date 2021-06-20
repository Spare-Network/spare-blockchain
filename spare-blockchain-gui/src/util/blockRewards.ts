import Big from 'big.js';

const GRAVITON_PER_SPARE = Big(1000000000000);
const BLOCKS_PER_YEAR = 1681920;

export function calculatePoolReward(height: number): Big {
  if (height === 0) {
    return GRAVITON_PER_SPARE.times(5000000).times(7 / 8);
  }
  if (height < 0.25 * BLOCKS_PER_YEAR) {
    return GRAVITON_PER_SPARE.times(4).times(7 / 8);
  }
  if (height < 3 * BLOCKS_PER_YEAR) {
    return GRAVITON_PER_SPARE.times(2).times(7 / 8);
  }
  if (height < 6 * BLOCKS_PER_YEAR) {
    return GRAVITON_PER_SPARE.times(1).times(7 / 8);
  }
  if (height < 9 * BLOCKS_PER_YEAR) {
    return GRAVITON_PER_SPARE.times(0.5).times(7 / 8);
  }
  if (height < 12 * BLOCKS_PER_YEAR) {
    return GRAVITON_PER_SPARE.times(0.25).times(7 / 8);
  }

  return GRAVITON_PER_SPARE.times(0.125).times(7 / 8);
}

export function calculateBaseFarmerReward(height: number): Big {
  if (height === 0) {
    return GRAVITON_PER_SPARE.times(5000000).times(1 / 8);
  }
  if (height < 0.25 * BLOCKS_PER_YEAR) {
    return GRAVITON_PER_SPARE.times(4).times(1 / 8);
  }
  if (height < 3 * BLOCKS_PER_YEAR) {
    return GRAVITON_PER_SPARE.times(2).times(1 / 8);
  }
  if (height < 6 * BLOCKS_PER_YEAR) {
    return GRAVITON_PER_SPARE.times(1).times(1 / 8);
  }
  if (height < 9 * BLOCKS_PER_YEAR) {
    return GRAVITON_PER_SPARE.times(0.5).times(1 / 8);
  }
  if (height < 12 * BLOCKS_PER_YEAR) {
    return GRAVITON_PER_SPARE.times(0.25).times(1 / 8);
  }

  return GRAVITON_PER_SPARE.times(0.125).times(1 / 8);
}
