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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 12px;
`;

const ItemBox = styled.article`
  padding: 1%;
  border: 1px solid ${({ theme }) => theme.textColor};
  border-radius: 5px;

  > a {
    display: block;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.textColor};
    > h1 {
      margin-bottom: 10px;
      font-size: 2.5rem;
    }
    > p {
      font-size: 1.5rem;
    }
  }

  :hover {
    border-color: ${({ theme }) => theme.pointColor};
    transform: scale(1.02);
  }

  transition: all 0.125s ease-in 0s;
`;

const TagItem = styled.span`
  padding: 2px 5px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.pointColor};
  margin-left: 10px;
`;

function ListItem({ url, data }: IListItem) {
  const { fileName, title, date, tag } = data;
  return (
    <ItemBox>
      <Link to={`${url}/${fileName}`}>
        <h1>{title}</h1>
        <p>
          <span>{date}</span>
          {tag.map((name) => (
            <TagItem key={name}>{name}</TagItem>
          ))}
        </p>
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
