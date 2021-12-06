export function mdToPlainText(text: string): string {
  const header = /[#]/g;
  const codeStart = /(```\w+)+/g;
  const codeEnd = /(```)/g;
  const image = /(!\[.*\](.*))/g;

  return text.replace(header, '').replace(image, '').replace(codeStart, '').replace(codeEnd, '');
}

export default {
  mdToPlainText,
};
