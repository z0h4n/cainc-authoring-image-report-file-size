const request = require('request');
const bytes = require('bytes');
const csvdata = require('csvdata');
const path = require('path');
const open = require('open');
const chalk = require('chalk');

const csvPath = process.argv[3];
const baseURL = 'https://dev-cdn.i-ready.com/instruction/content/';

let exitTriggered = false;

function getImageSize(data, counter = 0) {
  const row = data[counter];

  if (!row || exitTriggered) {
    onComplete(data, exitTriggered ? process.exit : function () { });
    return;
  }

  const url = JSON.parse(row.Image).file;
  const fullURL = `${baseURL}${url}`;

  request(fullURL, (err, res, body) => {
    if (err) {
      row.Size = 'Error'
    } else {
      if (res.statusCode === 200) {
        row.Size = bytes(+res.headers['content-length']);
      } else {
        row.Size = `Error : ${res.statusCode}`;
      }
    }

    console.log(`${counter + 1}/${data.length} - ${url} - ${chalk.yellow(row.Size)}`);
    getImageSize(data, counter + 1);
  });
};

function onComplete(data, callback = function () { }) {
  const inputFileName = path.basename(csvPath);
  const newCsvPath = csvPath.replace(inputFileName, `Updated_${inputFileName}`);

  csvdata.write(newCsvPath, data, {
    header: Object.keys(data[0]).join(',')
  }).then(() => {
    open(newCsvPath);
    callback();
  }).catch((err) => {
    console.log(err);
  });
}

process.on('SIGINT', function () {
  exitTriggered = true;
});

module.exports = () => {
  if (!csvPath) {
    console.log('ERROR : Run the command as : npm run bulk <path_to_your_file>.csv');
  } else {
    csvdata.load(csvPath).then((data) => {
      data = data.map((rowObject) => {
        rowObject.Size = '';
        return rowObject;
      });
      getImageSize(data);
    }).catch((err) => {
      console.log(err);
    });
  }
};