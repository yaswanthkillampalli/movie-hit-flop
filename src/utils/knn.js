export function calculateEuclideanDistance(point1, point2) {
  return Math.sqrt(
    (point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2
  );
}

export function getKNearestNeighbors(data, labels, newPoint, k) {
  const distances = data.map((point, i) => ({
    distance: calculateEuclideanDistance(point, newPoint),
    label: labels[i],
    index: i,
  }));
  distances.sort((a, b) => a.distance - b.distance);
  return distances.slice(0, k);
}

export function predictClass(nearestNeighbors) {
  const labelCounts = nearestNeighbors.reduce((acc, { label }) => {
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(labelCounts).reduce((a, b) =>
    labelCounts[a] > labelCounts[b] ? a : b
  );
}