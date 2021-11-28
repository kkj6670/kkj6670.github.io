import React from 'react';
import { useRouter } from 'next/router';
import { useBase } from '../../src/store/Base';

const Post = function () {
  const router = useRouter();
  const { boardData } = useBase();
  const post = boardData[router.query.menu as string];

  console.log(router);
  if (!post) return <p>noting</p>;

  console.log(post);

  return <div>hi</div>;
};

export default Post;
