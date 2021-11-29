import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useBase } from '../../store/Base';

import BoardList from '../../components/board/BoardList';

const BoardListPage = function () {
  const router = useRouter();
  const { boardData } = useBase();
  const boardList = boardData[router.query.category as string];

  const data = useMemo(() => {
    return Object.keys(boardList || {}).map((key) => boardList[key]);
  }, [boardList]);

  return <BoardList data={data} />;
};

export default BoardListPage;
