function tostring(arg) {
  return typeof arg == 'object' ? JSON.stringify(arg) : arg;
}

function format(fmt) {
var re = /(%?)(%([ojds]))/g
  , args = Array.prototype.slice.call(arguments, 1);
if(args.length) {
  fmt = fmt.replace(re, function(match, escaped, ptn, flag) {
    var arg = args.shift();
    switch(flag) {
      case 's':
        arg = '' + arg;
        break;
      case 'd':
        arg = Number(arg);
        break;
      case 'o':
      case 'j':
        arg = tostring(arg);
        break;
    }
    if(!escaped) {
      return arg;
    }
    args.unshift(arg);
    return match;
  })
}

// arguments remain after formatting
if(args.length) {
  fmt += ' ' + args.map(tostring).join(' ');
}

// update escaped %% values
fmt = fmt.replace(/%{2,2}/g, '%');

return '' + fmt;
}

module.exports = format;
