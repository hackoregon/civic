import { CardRegistry as FarmersMarketsRegistry } from '@hackoregon/2018-example-farmers-markets';
import Registry from './utils/registry';

const allEntries = []
  .concat(FarmersMarketsRegistry.map(c => ({ ...c, project: '@hackoregon/2018-example-farmers-markets' })));


export default new Registry(allEntries);
