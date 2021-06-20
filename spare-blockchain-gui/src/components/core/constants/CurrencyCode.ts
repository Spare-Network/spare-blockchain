import { IS_MAINNET } from './constants';
import Unit from './Unit';

export default {
  [Unit.SPARE]: IS_MAINNET ? 'SPARE' : 'TSPARE',
};
