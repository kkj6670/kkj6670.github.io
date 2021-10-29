import React from 'react';
import { useParams } from 'react-router-dom';

import { useBase } from '../../store/Base';

function BoardList() {
  const { boardData } = useBase();
  const test = useParams();

  return <section>1</section>;
}

export default BoardList;
