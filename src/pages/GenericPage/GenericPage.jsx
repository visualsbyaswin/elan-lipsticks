import './GenericPage.css';

export default function GenericPage({ title, eyebrow, children }) {
  return (
    <main className="generic-page">
      <div className="generic-hero">
        <span className="generic-eyebrow">{eyebrow}</span>
        <h1 className="generic-title">{title}</h1>
      </div>
      <div className="generic-content">
        {children}
      </div>
    </main>
  );
}
