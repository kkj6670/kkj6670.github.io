import React, { useMemo } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { IParamTypes } from '../../types/common';

import { useBase, IBoardDataDetail } from '../../store/Base';

interface IListItem {
  url: string;
  data: IBoardDataDetail;
}

const ListBox = styled.section`
  width: 100%;
`;

const ItemBox = styled.article`
  width: 100%;
  hieght: 100px;

  > a {
    display: block;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.textColor};
    > h1 {
      color: ${({ theme }) => theme.pointColor};
    }
  }
`;

function ListItem({ url, data }: IListItem) {
  const { id, title, date, tag } = data;
  return (
    <ItemBox>
      <Link to={`${url}/${id}`}>
        <h1>{title}</h1>
        <p>{date}</p>
        <p>{tag}</p>
      </Link>
    </ItemBox>
  );
}

function BoardList({ match }: RouteComponentProps<IParamTypes>) {
  const { params, url } = match;
  const { boardData } = useBase();

  const targetData = useMemo(() => {
    return boardData[params.menu];
  }, [boardData, params.menu]);

  return (
    <ListBox>
      {!targetData || targetData.length === 0
        ? '해당 Note가 존재하지 않습니다.'
        : targetData.map((item) => <ListItem key={item.id} url={url} data={item} />)}
    </ListBox>
  );
}

export default BoardList;
