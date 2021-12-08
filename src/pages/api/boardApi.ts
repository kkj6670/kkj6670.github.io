import fs from 'fs';
import matter from 'gray-matter';
import { IBoardDetail, IBoardContent } from '../../types/common';

import { BOARD_MD_DIR } from '../../../config/boardDir';

export function getCategory() {
  return fs.readdirSync(BOARD_MD_DIR).map((folder) => folder);
}

export function getCategoryFile(category = '') {
  const dir = `${BOARD_MD_DIR}/${category}`;

  try {
    return fs.readdirSync(dir).map((fileName) => {
      return {
        fileName,
        fileDir: `${dir}/${fileName}`,
      };
    });
  } catch {
    return null;
  }
}

export function getBoardFile(category = '', fileName = '') {
  const dir = `${BOARD_MD_DIR}/${category}/${fileName}.md`;

  try {
    return fs.readFileSync(dir, 'utf8');
  } catch {
    return null;
  }
}

export function getBoardList(category = ''): IBoardDetail[] {
  const fileList = getCategoryFile(category) || [];

  const boardList = fileList
    .map(({ fileName, fileDir }) => {
      const md = fs.readFileSync(fileDir, 'utf8');
      const {
        data: { title = '', date = '', tag = '[]' },
      } = matter(md);

      return {
        fileName: fileName.replace('.md', ''),
        title,
        date,
        tag,
        content: '',
      };
    })
    .filter((file) => file !== null);

  boardList.sort((a, b) => {
    const bDate = new Date(b.date).getTime();
    const aDate = new Date(a.date).getTime();
    return bDate - aDate;
  });

  return boardList;
}

export function getBoardContent(category = '', fileName = ''): IBoardContent {
  const md = getBoardFile(category, fileName) || '';
  const {
    data: { title = '' },
    content,
  } = matter(md);

  return {
    title,
    content,
  };
}
