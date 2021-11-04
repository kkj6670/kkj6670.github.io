import * as fs from 'fs';

const boardDir = './public/data/board/';

const boardData = {};
const folders = fs.readdirSync(boardDir).map((folder) => folder);

folders.forEach((name) => {
  const dir = `${boardDir}${name}/`;
  const files = fs.readdirSync(dir).map((fileName) => {
    const fileDir = `${dir}${fileName}`;
    const date = fs.statSync(fileDir).mtime;

    const md = fs.readFileSync(fileDir, 'utf8');
    // TODO :: 다른방식으로 데이터 추출방법
    const title = md.match(/(BOARD_TITLE\:)(.*)/g)['0'].replace('BOARD_TITLE: ','');
    const tag = md.match(/(BOARD_TAG\:)(.*)/g)['0'].replace('BOARD_TAG: ','');

    return {
      fileName,
      date,
      title,
      tag: JSON.parse(tag)
    };
  });

  if(files.length > 0) {
    files.sort((a,b) => b.date - a.date);
    boardData[name] = files;
  }
});

const boardDataDir = './public/data/boardData.json';
fs.unlink(boardDataDir, (err) => console.error(err));
fs.writeFileSync(boardDataDir, JSON.stringify(boardData));