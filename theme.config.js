const YEAR = new Date().getFullYear();

export default {
  readMore: null, // Remove "Read More" links
  dateFormatter: (date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  footer: (
    <footer>
      <small>
        <time>{YEAR}</time> © Alexander Schoenenwald.
        <a href="/feed.xml">RSS</a>
      </small>
      <style jsx>{`
        footer {
          margin-top: 8rem;
        }
        a {
          float: right;
        }
      `}</style>
    </footer>
  ),
};
