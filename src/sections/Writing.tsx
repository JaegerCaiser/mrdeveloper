import React from "react";

type Post = { title: string; url: string; date: string };

const posts: Post[] = [
  { title: "Como estruturo projetos React", url: "#", date: "2025-01-12" },
  { title: "Boas práticas com TypeScript", url: "#", date: "2024-10-03" },
  { title: "Acessibilidade na web na prática", url: "#", date: "2024-06-18" },
];

const Writing: React.FC = () => {
  return (
    <section id="writing" className="section writing" aria-label="Escritos">
      <h3 className="section__title">Escritos</h3>
      <ul className="writing__list">
        {posts.map((post) => (
          <li key={post.title} className="writing__item">
            <a href={post.url} className="writing__link">
              <span className="writing__title">{post.title}</span>
              <time className="writing__date">
                {new Date(post.date).toLocaleDateString()}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Writing;
