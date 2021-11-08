export function convertToPlainText(text: string): string {
  return text.replace(/([\s`])+/g, '');
}

export default {
  convertToPlainText,
};
