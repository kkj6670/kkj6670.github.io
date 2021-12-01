const fs = require('fs');
const { BOARD_MD_DIR } = require('../config/boardDir');

const CATEGORY_LEN = {};

const folders = fs.readdirSync(BOARD_MD_DIR).map((folder) => folder);

folders.forEach((category) => {
  const files = fs.readdirSync(`${BOARD_MD_DIR}${category}`).map((folder) => folder);
  const boardLen = files.length;
  CATEGORY_LEN[category] = boardLen;
});

// const folders = fs.readdirSync(BOARD_MD_DIR).map((folder) => folder);
// folders.forEach((name) => {
//   boardData[name] = {};
//   const dir = `${BOARD_MD_DIR}${name}/`;
//   const files = fs.readdirSync(dir).map((fileName) => {
//     const fileDir = `${dir}${fileName}`;

//     const md = fs.readFileSync(fileDir, 'utf8');

//     // TODO :: 정규표현식 연구
//     const commentRegExp = /(<!--)([\r\n]+)(.*)([\r\n]+)(.*)([\r\n]+)(.*)([\r\n]+)(-->)([\r\n]+)/g;
//     const content = md.replace(commentRegExp, '');

//     const info = md.match(/(BOARD_)(.*)(:\s)(.*)/g);
//     const [title, date, tag] = info.map((item) => item.replace(/(BOARD_)(.*)(:\s)/, ''));

//     return {
//       fileName: fileName.replace('.md', ''),
//       title,
//       date,
//       tag: JSON.parse(tag),
//       content,
//     };
//   });

//   if (files.length > 0) {
//     files.sort((a, b) => new Date(b.date) - new Date(a.date));
//     files.forEach((data) => {
//       boardData[name][data.fileName] = data;
//     });
//   }
// });

// console.log(boardData);

// console.log('>>> write boardData - Start');
// fs.open(BOARD_JSON_DIR, 'w', (openErr, fd) => {
//   if (openErr) throw openErr;

//   const buf = Buffer.from(JSON.stringify(boardData));
//   fs.write(fd, buf, 0, buf.length, null, (writeErr) => {
//     if (writeErr) throw writeErr;

//     fs.close(fd, (closeErr) => {
//       if (closeErr) throw closeErr;
//     });
//   });
// });
// console.log('>>> write boardData - End');

// export default boardData;

module.exports = {
  CATEGORY_LEN,
};
