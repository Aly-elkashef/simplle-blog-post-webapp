// pages/viewpost/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Post } from '../interface';
import Link from 'next/link';
import styles from './viewpost.module.css';

const ViewPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      fetchPost(Number(id));
    }
  }, [id]);

  const fetchPost = async (postId: number) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch post');
      }
      const data: Post = await res.json();
      setPost(data);
    } catch (error) {
      console.error(`Error fetching post ${postId}:`, error);
    }
  };

  if (!post) {
    return <p className={styles.loading}>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.body}>{post.body}</p>
      <div>
        <Link href="/" className={styles.link}>
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ViewPost;
