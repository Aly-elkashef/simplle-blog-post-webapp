'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from './interface';
import styles from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data: Post[] = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog Posts</h1>
      <div>
        <Link href="/create/createpost" className={styles.createPostLink}>
          Create Post
        </Link>
      </div>
      {isLoading ? (
        <div className={styles.spinner}>
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
      ) : (
        posts.map(post => (
          <div key={post.id} className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postBody}>{post.body}</p>
            <Link href={`/viewpost/${post.id}`} className={styles.link}>
              Read More
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
