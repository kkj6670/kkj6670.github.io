import React from 'react';

function BoardViewer() {

  fetch('/react-blog/data/board/javascript/test.md', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    console.log(response);
    response.text().then((md) => {
      console.log(md);
    });
  });

  return <div>boardViewer</div>;
}

export default BoardViewer;
