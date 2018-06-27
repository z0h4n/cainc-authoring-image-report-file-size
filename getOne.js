const request = require('request');
const bytes = require('bytes');
const chalk = require('chalk');

const imageURL = process.argv[3];

module.exports = () => {
  if (!imageURL) {
    console.log('ERROR : Run the command as : npm run one <image url>');
  } else {
    request(imageURL, (err, res, body) => {
      if (err) {
        console.log(err);
      } else {
        if (res.statusCode === 200) {
          console.log(`\nFile size is ${chalk.yellow(bytes(+res.headers['content-length']))}\n`);
        } else {
          console.log(`\nERROR : ${res.statusCode}\n`);
        }
      }
    });
  }
};