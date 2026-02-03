export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text">
        <div className="skeleton-line title" style={{ width: `${70 + Math.random() * 25}%` }}></div>
        <div className="skeleton-line description"></div>
        <div className="skeleton-line price"></div>
      </div>
    </div>
  );
}
