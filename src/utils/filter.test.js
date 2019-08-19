import { filterList } from './filter';

const records = [
  {
    id: 2,
    name: 'rec 2'
  },
  {
    id: 1,
    name: 'rec 1'
  },
  {
    id: 3,
    name: 'rec 3'
  }
];
const record1 = { id: 1 };

test('should filter out record 1 form records ', () => {
  expect(filterList(records, record1)).toEqual([
    {
      id: 2,
      name: 'rec 2'
    },
    {
      id: 3,
      name: 'rec 3'
    }
  ]);
});
