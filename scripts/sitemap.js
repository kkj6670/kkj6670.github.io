const fs = require('fs');
const builder = require('xmlbuilder', { encoding: 'utf-8' });
const { BOARD_DATA } = require('./getBoardData');
const DOMAIN = 'https://kkj6670.github.io/board/';
const changefreq = 'weekly'; // 크롤링 주기
const priority = '1.0'; // 중요도? 디폴트는 0.5라고함.

const xml = builder.create('urlset').att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
const allList = Object.entries(BOARD_DATA);
allList.forEach(([category, categoryBoardData = {}]) => {
  const categoryBoardList = Object.entries(categoryBoardData);

  categoryBoardList.forEach(([boardName, { date }]) => {
    const url = xml.ele('url');
    url.ele('loc', `${DOMAIN}${category}/${boardName}`);
    url.ele('lastmod', date.replace(/(\s)([0-9:]+)/, ''));
    url.ele('changefreq', 'weekly');
    url.ele('priority', '1.0');
  });
});

const prettyXml = xml.end({ pretty: true });
fs.open('./public/sitemap.xml', 'w', (openErr, fd) => {
  if (openErr) throw openErr;

  const buf = Buffer.from(prettyXml);
  fs.write(fd, buf, 0, buf.length, null, (writeErr, a) => {
    if (writeErr) throw writeErr;

    fs.close(fd, (closeErr) => {
      if (closeErr) throw closeErr;
    });
  });
});
