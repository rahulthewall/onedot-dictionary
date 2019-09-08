import { IDictionaryListItem, ConsistencyIssues } from './types';

const checkConsistency = (dictPairs: IDictionaryListItem[]) => {
  return dictPairs.map((dictPair) => {
    const errors: ConsistencyIssues[] = [];
    const restPairs = dictPairs.filter((pair) => pair.id !== dictPair.id);

    // Check for duplicates
    if (
      restPairs.some((pair) => pair.domain === dictPair.domain && pair.range === dictPair.range)
    ) {
      errors.push(ConsistencyIssues.DUPLICATES);
    }

    // Check for forks
    if (
      restPairs.some((pair) => pair.domain === dictPair.domain && pair.range !== dictPair.range)
    ) {
      errors.push(ConsistencyIssues.FORKS);
    }

    // Check for cycles
    if (
      restPairs.some((pair) => pair.domain === dictPair.range && pair.range === dictPair.domain)
    ) {
      errors.push(ConsistencyIssues.CYCLES);
    }

    // Check for chains
    if (
      restPairs.some((pair) => pair.domain === dictPair.range && pair.range !== dictPair.domain)
    ) {
      errors.push(ConsistencyIssues.CHAINS);
    }

    // No error
    if (errors.length === 0) {
      errors.push(ConsistencyIssues.NONE);
    }

    return {
      ...dictPair,
      errors,
    };
  });
};

export { checkConsistency };
