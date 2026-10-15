import blogsData from '../../Blogs.json';
import { isBlogPost, parseCollection } from '../../lib/runtime';

export default function Blog() {
  const posts = parseCollection(blogsData, isBlogPost);

  return (
    <main className="container py-5">
      <h1>Beauty journal</h1>
      <div className="row">
        {posts.map((post) => (
          <article className="col-md-4 mb-4" key={post.id}>
            {post.image && <img src={post.image} className="img-fluid" alt="" />}
            <h2 className="h5 mt-2">{post.title}</h2>
            {post.description && <p>{post.description}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
