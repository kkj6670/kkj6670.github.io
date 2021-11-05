import * as fs from "fs";

const BOARD_JSON_DIR = "./public/data/boardData.json";
const BOARD_MD_DIR = "./public/data/board/";

const boardData = {};
const folders = fs.readdirSync(BOARD_MD_DIR).map((folder) => folder);

folders.forEach((name) => {
  const dir = `${BOARD_MD_DIR}${name}/`;
  const files = fs.readdirSync(dir).map((fileName) => {
    const fileDir = `${dir}${fileName}`;
    const date = fs.statSync(fileDir).mtime;

    const md = fs.readFileSync(fileDir, "utf8");
    // TODO :: 다른방식으로 데이터 추출방법
    const title = md.match(/(BOARD_TITLE\:)(.*)/g)["0"].replace("BOARD_TITLE: ", "");
    const tag = md.match(/(BOARD_TAG\:)(.*)/g)["0"].replace("BOARD_TAG: ", "");

    return {
      fileName,
      date,
      title,
      tag: JSON.parse(tag)
    };
  });

  if (files.length > 0) {
    files.sort((a, b) => b.date - a.date);
    boardData[name] = files;
  }
});

fs.open(BOARD_JSON_DIR, 'w', function(err, fd) {
  if(err) throw err;
  console.log('1. file open');

  let buf = new Buffer(JSON.stringify(boardData));
  fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
    if(err) throw err;

    console.log('2. file write');
    fs.close(fd, function(err) {
      if(err) throw err;

      console.log('3. file closed');
    });
  });
});
