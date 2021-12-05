export interface IBoardTocData {
  level: number;
  anchor: string;
  text: string;
  offsetTop: number;
}

export interface IBoardList {
  fileName: string;
  title: string;
  date: string;
  tag?: string[];
}

export interface IBoardDetail extends IBoardList {
  content: string;
}

export interface ICategoryLen {
  [key: string]: number;
}

export interface IBoardContent {
  content: string;
  title: string;
}
