import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { IBoardDataDetail } from '../../types/common';

const ListBox = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 12px;

  color: ${({ theme }) => theme.textColor};
`;

const ItemBox = styled.article`
  padding: 1%;
  border: 2px solid ${({ theme }) => theme.pointBgHoverColor};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.scrollColor.track} 0px 4px 16px 0px;

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
  display: inline-flex;
  padding: 2px 5px;
  border-radius: 5px;
  color: #fff;
  background-color: ${({ theme }) => theme.pointColor};
  margin-left: 10px;
  margin-top: 10px;
  :first-child {
    margin-left: 0;
  }
`;

interface IListItem {
  url: string;
  info: IBoardDataDetail;
}

const ListItem = function ({ url, info }: IListItem) {
  const { fileName, title, date, tag } = info;
  return (
    <ItemBox>
      <Link href={`${url}/${fileName}`} as={`${url}/${fileName}`}>
        <a>
          <h1>{title}</h1>
          <p>{date}</p>
          <p>
            {tag?.map((name) => (
              <TagItem key={name}>{name}</TagItem>
            ))}
          </p>
        </a>
      </Link>
    </ItemBox>
  );
};

interface IBoardListProps {
  data: IBoardDataDetail[];
}

const BoardList = function ({ data }: IBoardListProps) {
  const { asPath } = useRouter();

  return (
    <ListBox>
      {!data || data.length === 0
        ? '해당 Note가 존재하지 않습니다.'
        : data.map((item) => <ListItem key={item.fileName} url={asPath} info={item} />)}
    </ListBox>
  );
};

export default BoardList;
