// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ICategoryLen } from '../../types/common';

const BOARD_MD_DIR = './public/static/data/board/';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}

function getCategory() {
  return fs.readdirSync(BOARD_MD_DIR).map((folder) => folder);
}

function getFiles(category = '') {
  return fs.readdirSync(`${BOARD_MD_DIR}${category}`).map((folder) => folder);
}

export function getBoardList() {
  const folders = getCategory();
  const categoryData: ICategoryLen = {};

  folders.forEach((category: string) => {
    const files = getFiles(category);
    const boardLen = files.length;
    categoryData[category] = boardLen;
  });

  return categoryData;
}
