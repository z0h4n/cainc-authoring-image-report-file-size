const main = {
  bulk: require('./getBulk'),
  one: require('./getOne')
};

const runType = process.argv[2];

(main[runType] || function () { })();