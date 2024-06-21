import { useState } from 'react';
import { useRouter } from 'next/router';
import { NewPost } from '../interface';
import styles from './CreatePost.module.css';

const CreatePost = () => {
  const router = useRouter();
  const [newPost, setNewPost] = useState<NewPost>({ title: '', body: '' });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      
      setMessage('Post created successfully!');
      router.push('/'); 
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Body:</label>
          <textarea
            name="body"
            value={newPost.body}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default CreatePost;
