import React from 'react';

import { useRouter } from 'next/router';
import { useBase } from '../../../store/Base';

import BoardViewer from '../../../components/board/BoardViewer';

const BoardViewerPage = function () {
  const router = useRouter();
  const { boardData } = useBase();
  const { category, boardName } = router.query;
  const data = boardData[category as string]?.[boardName as string];

  return <BoardViewer data={data} />;
};

export default BoardViewerPage;
