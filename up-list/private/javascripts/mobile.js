const formatStr = function formatStr (str) {
  if (typeof str !== 'string') {
    try {
      return str.toString()
    } catch (e) {
      return '';
    }
  }
  return str;
};

const isAndroid = function isAndroid (s) {
  let str = formatStr(s);
  return str.indexOf('Android') !== -1 || str.indexOf('Adr') !== -1;
};

const isIOS = function isIOS (s) {
  let str = formatStr(s);
  return !!str.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
};

const isMobile = function isMobile (s) {
  return isAndroid(s) || isIOS(s);
};

exports.isAndroid = isAndroid;
exports.isIOS     = isIOS;
exports.isMobile  = isMobile;
