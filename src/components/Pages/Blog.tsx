import blogsData from '../../Blogs.json';

type BlogPost = { id: number; title: string; image?: string; description?: string };
export default function Blog() { const posts = blogsData as BlogPost[]; return <main className="container py-5"><h1>Beauty journal</h1><div className="row">{posts.map((post) => <article className="col-md-4 mb-4" key={post.id}>{post.image && <img src={post.image} className="img-fluid" alt="" />}<h2 className="h5 mt-2">{post.title}</h2>{post.description && <p>{post.description}</p>}</article>)}</div></main>; }
