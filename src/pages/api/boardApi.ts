// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ICategoryLen } from '../../types/common';

import { BOARD_MD_DIR } from '../../../config/boardDir';

// type Data = {
//   name: string;
// };

// export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   res.status(200).json({ name: 'John Doe' });
// }

export function getCategory() {
  return fs.readdirSync(BOARD_MD_DIR).map((folder) => folder);
}

export function getCategoryFiles(category = '') {
  const dir = `${BOARD_MD_DIR}${category}`;
  return fs.readdirSync(dir).map((fileName) => {
    return {
      fileName,
      fileDir: `${dir}/${fileName}`,
    };
  });
}

export function getBoardList(category = '') {
  const boardList = getCategoryFiles(category)
    .map(({ fileName, fileDir }) => {
      const md = fs.readFileSync(fileDir, 'utf8');

      // TODO :: 정규표현식 연구
      // const commentRegExp = /(<!--)([\r\n]+)(.*)([\r\n]+)(.*)([\r\n]+)(.*)([\r\n]+)(-->)([\r\n]+)/g;
      // const content = md.replace(commentRegExp, '');

      const info = md.match(/(BOARD_)(.*)(:\s)(.*)/g);
      if (info) {
        const [title, date, tag] = info.map((item) => item.replace(/(BOARD_)(.*)(:\s)/, ''));

        return {
          fileName: fileName.replace('.md', ''),
          title,
          date,
          tag: JSON.parse(tag),
        };
      }

      return null;
    })
    .filter((file) => file !== null);

  boardList.sort((a, b) => {
    const bDate = new Date(b?.date || 0).getTime();
    const aDate = new Date(a?.date || 0).getTime();
    return bDate - aDate;
  });

  return boardList;
}
