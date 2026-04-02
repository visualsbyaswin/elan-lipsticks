import './Preloader.css';

export default function Preloader({ loaded, loadProgress }) {
  if (loaded) return null;

  return (
    <div className="preloader">
      <div className="preloader-inner">
        <span className="preloader-brand">élan</span>
        <div className="preloader-bar-track">
          <div
            className="preloader-bar-fill"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <span className="preloader-percent">{loadProgress}%</span>
      </div>
    </div>
  );
}
