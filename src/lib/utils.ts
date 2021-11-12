export interface IMdToPlainTextOptions {
  whiteSpace?: boolean;
  code?: boolean;
  onlyWord?: boolean;
}

export function mdToPlainText(
  text: string,
  options: IMdToPlainTextOptions = { whiteSpace: true, code: true, onlyWord: true },
): string {
  const whiteSpace = /[\s]/g;
  const codeStart = /(```\w+)+/g;
  const codeEnd = /(```)/g;
  const onlyWord = /([^\w가-힣ㄱ-ㅎㅏ-ㅣ])/g;

  let plainText = text;
  if (options.whiteSpace) plainText = plainText.replace(whiteSpace, '');
  if (options.code) {
    plainText = plainText.replace(codeStart, '');
    plainText = plainText.replace(codeEnd, '');
  }
  if (options.onlyWord) plainText = plainText.replace(onlyWord, '');
  return plainText;
}

export default {
  mdToPlainText,
};
