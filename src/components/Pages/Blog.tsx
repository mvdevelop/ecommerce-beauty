import blogsData from '../../Blogs.json';
import { isBlogPost, parseCollection } from '../../lib/runtime';
import { useLanguage } from '../../i18n/LanguageProvider';
import { formatLocalizedDate, resolveLocalized } from '../../i18n/content';

export default function Blog() {
  const { t, locale } = useLanguage();
  const posts = parseCollection(blogsData, isBlogPost);
  return (
    <main className="container py-5">
      <h1>{t('blog.title')}</h1>
      <div className="row">
        {posts.map((post) => (
          <article className="col-md-4 mb-4" key={post.id}>
            {post.image && <img src={post.image} className="img-fluid" alt="" />}
            <h2 className="h5 mt-2">{resolveLocalized(post.titleI18n, locale, post.title)}</h2>
            {post.description && <p>{post.description}</p>}
            {post.name && <p className="text-muted">{resolveLocalized(post.nameI18n, locale, post.name)}</p>}
            {post.date && <small className="text-muted">{formatLocalizedDate(post.date, locale)}</small>}
          </article>
        ))}
      </div>
    </main>
  );
}