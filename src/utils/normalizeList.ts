export type NLReturnObject<T, U = string> = {
  ids: U[],
  byId: {
    [id: string]: T
  }
};

export default function normalizeList(items: Array<any>, key: string = 'id') {
  return items.reduce((acc, item) => {
    acc.byId[item[key]] = item;
    acc.ids.push(item[key]);
    return acc;
  }, { ids: [], byId: {} });
}
