const fs = require('fs');
const matter = require('gray-matter');
const { BOARD_MD_DIR } = require('../config/boardDir');

const folders = fs.readdirSync(BOARD_MD_DIR).map((folder) => folder);

const CATEGORY_LEN = {};
const BOARD_DATA = {};

folders.forEach((category) => {
  BOARD_DATA[category] = {};
  const dir = `${BOARD_MD_DIR}/${category}`;
  const files = fs.readdirSync(dir).map((folder) => {
    const fileList = fs
      .readdirSync(dir)
      .map((fileName) => {
        const fileDir = `${dir}/${fileName}`;

        const md = fs.readFileSync(fileDir, 'utf8');
        const {
          data: { title = '', date = '', tag = '[]' },
          content,
        } = matter(md);

        return {
          fileName: fileName.replace('.md', ''),
          title,
          date,
          tag,
          content,
        };
      })
      .filter((file) => file !== null);

    if (fileList.length > 0) {
      fileList.sort((a, b) => new Date(b.date) - new Date(a.date));
      fileList.forEach((data) => {
        BOARD_DATA[category][data.fileName] = data;
      });
    }

    return folder;
  });

  CATEGORY_LEN[category] = files.length;
});

module.exports = {
  CATEGORY_LEN,
  BOARD_DATA,
};
