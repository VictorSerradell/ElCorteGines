export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line price"></div>
      </div>
    </div>
  );
}
