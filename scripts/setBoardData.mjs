import * as fs from 'fs';

const BOARD_JSON_DIR = './public/data/boardData.json';
const BOARD_MD_DIR = './public/data/board/';

const boardData = {};

const folders = fs.readdirSync(BOARD_MD_DIR).map((folder) => folder);
folders.forEach((name) => {
  boardData[name] = {};
  const dir = `${BOARD_MD_DIR}${name}/`;
  const files = fs.readdirSync(dir).map((fileName) => {
    const fileDir = `${dir}${fileName}`;

    const md = fs.readFileSync(fileDir, 'utf8');

    // FIXME :: 1. 정규표현식 +가 안먹어서 다른방법 필요
    // FIXME :: 2. MD파일 CRLF일때 정규표현식 안먹음
    const commentRegExp = /(<!--)(.*\s.*\s.*\s.*\s)(-->\n)/g;
    const content = md.replace(commentRegExp, '');

    const info = md.match(/(BOARD_)(.*)(:\s)(.*)/g);
    const [title, date, tag] = info.map((item) => item.replace(/(BOARD_)(.*)(:\s)/, ''));

    return {
      fileName: fileName.replace('.md', ''),
      title,
      date,
      tag: JSON.parse(tag),
      content,
    };
  });

  if (files.length > 0) {
    files.sort((a, b) => a.date - b.date);
    files.forEach((data) => {
      boardData[name][data.fileName] = data;
    });
  }
});

console.log('>>> write boardData - Start');
fs.open(BOARD_JSON_DIR, 'w', (openErr, fd) => {
  if (openErr) throw openErr;

  const buf = Buffer.from(JSON.stringify(boardData));
  fs.write(fd, buf, 0, buf.length, null, (writeErr) => {
    if (writeErr) throw writeErr;

    fs.close(fd, (closeErr) => {
      if (closeErr) throw closeErr;
    });
  });
});
console.log('>>> write boardData - End');
