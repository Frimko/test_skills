export default (items: Array<any>, key: string = 'id') => items.reduce((acc, item) => {
  acc.byId[item[key]] = item;
  acc.ids.push(item[key]);
  return acc;
}, { ids: [], byId: {} });
