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

module.exports = {
  saveVisit,
}
