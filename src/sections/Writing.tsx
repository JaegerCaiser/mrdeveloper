import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { X, Calendar, Tag, Minus, Plus } from "lucide-react";
import "./Writing.scss";

// Get all MDX modules
const allModules = import.meta.glob("../content/blog/**/*.mdx", {
  eager: true,
});

interface BlogPost {
  slug: string;
  lang: string;
  component: React.ComponentType;
  frontmatter: {
    title: string;
    date?: string;
    publishedAt?: string;
    description?: string;
    summary?: string;
    tags?: string[];
  };
}

const Writing = () => {
  const { t, i18n } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [fontSize, setFontSize] = useState(16); // Base font size in px
  const [showControls, setShowControls] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const posts = useMemo(() => {
    const currentLang = i18n.language.split("-")[0] || "en";
    return Object.entries(allModules)
      .map(([path, mod]: [string, unknown]) => {
        const m = mod as {
          default: React.ComponentType;
          frontmatter: BlogPost["frontmatter"];
        };
        const lang = path.includes("/pt/") ? "pt" : "en";
        return {
          slug: path.split("/").pop()?.replace(".mdx", "") || "",
          lang,
          component: m.default,
          frontmatter: m.frontmatter || {
            title: "Untitled",
            date: new Date().toISOString(),
            tags: [],
          },
        };
      })
      .filter((post) => post.lang === currentLang)
      .sort((a, b) => {
        const dateA = new Date(
          a.frontmatter?.publishedAt ||
            a.frontmatter?.date ||
            new Date().toISOString()
        ).getTime();
        const dateB = new Date(
          b.frontmatter?.publishedAt ||
            b.frontmatter?.date ||
            new Date().toISOString()
        ).getTime();
        return dateB - dateA;
      });
  }, [i18n.language]);

  // Lock body scroll and apply blur to background when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-is-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-is-open");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-is-open");
    };
  }, [selectedPost]);

  // Handle mouse move to show/hide font controls
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!modalContentRef.current) return;

      const rect = modalContentRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const hotZoneX = rect.width - 150;
      const hotZoneY = rect.height - 150;

      if (x > hotZoneX && y > hotZoneY) {
        setShowControls(true);
      } else {
        setShowControls(false);
      }
    };

    const currentModal = modalContentRef.current;
    currentModal?.addEventListener("mousemove", handleMouseMove);

    return () => {
      currentModal?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [selectedPost]);

  return (
    <section className="writing" id="writing">
      <div className="writing__container">
        <h2 className="writing__title">{t("writing_title")}</h2>

        <div className="writing__grid">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="writing__card"
              onClick={() => setSelectedPost(post)}
            >
              <div className="writing__card-date">
                {new Date(
                  post.frontmatter.publishedAt || post.frontmatter.date || ""
                ).toLocaleDateString(i18n.language, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h3 className="writing__card-title">{post.frontmatter.title}</h3>
              <p className="writing__card-desc">
                {post.frontmatter.summary || post.frontmatter.description}
              </p>
              <div className="writing__tags">
                {(post.frontmatter.tags || []).map((tag) => (
                  <span key={tag} className="writing__tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      <div className={`post-modal ${selectedPost ? "is-open" : ""}`}>
        <div
          className="post-modal__overlay"
          onClick={() => setSelectedPost(null)}
        />
        <div className="post-modal__content" ref={modalContentRef}>
          <button
            className="post-modal__close"
            onClick={() => setSelectedPost(null)}
          >
            <X size={24} />
          </button>

          {selectedPost && (
            <>
              <div
                className="post-modal__body"
                style={{ fontSize: `${fontSize}px` }}
              >
                <div className="post-modal__meta">
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Calendar size={16} />
                    {new Date(
                      selectedPost.frontmatter.publishedAt ||
                        selectedPost.frontmatter.date ||
                        ""
                    ).toLocaleDateString(i18n.language, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {(selectedPost.frontmatter.tags || []).length > 0 && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Tag size={16} />
                      {(selectedPost.frontmatter.tags || []).join(", ")}
                    </span>
                  )}
                </div>
                <h1>{selectedPost.frontmatter.title}</h1>
                <selectedPost.component />
              </div>

              <div
                className={`post-modal__controls ${
                  showControls ? "is-visible" : ""
                }`}
              >
                <button
                  onClick={() => setFontSize((s) => Math.max(12, s - 2))}
                  className="post-modal__control-btn"
                  title="Decrease font size"
                >
                  <Minus size={20} />
                </button>
                <span className="post-modal__control-label">{fontSize}px</span>
                <button
                  onClick={() => setFontSize((s) => Math.min(32, s + 2))}
                  className="post-modal__control-btn"
                  title="Increase font size"
                >
                  <Plus size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Writing;
