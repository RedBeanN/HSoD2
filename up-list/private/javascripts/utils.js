const onerror = (err, msg) => {
  if (typeof err === 'function') return err(new Error(msg));
  return err;
}

const saveVisit = (target, keys, err) => {
  if (typeof keys === 'string' || typeof keys === 'number') keys = [keys];
  if (typeof keys !== 'object') return onerror(err, 'Invalid key(s)');
  for (let key of keys) {
    if (key in target) target = target[key];
    else onerror(err, `The key ${key} of ${keys.join('.')} is not exist in target.`);
  }
  return target;
};
const BSearch = (list, cpfn) => {
  let low = 0;
  let high = list.length - 1;
  while (low <= high) {
    let mid = parseInt((low + high) / 2);
    let cp = 0;
    if (typeof cpfn === 'function') cp = cpfn(list[mid]);
    else cp = cpfn - list[mid];
    if (cp === 0) return mid;
    else if (cp > 0) low = mid + 1;
    else if (cp < 0) high = mid - 1;
    else return -1;
  }
};

module.exports = {
  saveVisit,
  BSearch,
}
