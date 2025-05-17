export function drawScatterPlot(canvas, data, labels, newPoint, nearestIndices) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Scale data to canvas (Runtime: 90-150 -> 0-300, Rating: 5.5-8.5 -> 0-200)
  const xScale = (value) => ((value - 90) / (150 - 90)) * 280 + 10;
  const yScale = (value) => ((8.5 - value) / (8.5 - 5.5)) * 180 + 10;

  // Draw axes
  ctx.beginPath();
  ctx.moveTo(10, 190);
  ctx.lineTo(290, 190);
  ctx.moveTo(10, 190);
  ctx.lineTo(10, 10);
  ctx.strokeStyle = '#888';
  ctx.stroke();
  ctx.fillText('Runtime (min)', 120, 210);
  ctx.fillText('Rating', 0, 10);

  // Draw data points
  data.forEach((point, i) => {
    ctx.beginPath();
    ctx.arc(xScale(point[0]), yScale(point[1]), 5, 0, 2 * Math.PI);
    ctx.fillStyle = labels[i] === 'Hit' ? 'green' : 'red';
    ctx.fill();
  });

  // Draw new point
  ctx.beginPath();
  ctx.arc(xScale(newPoint[0]), yScale(newPoint[1]), 10, 0, 2 * Math.PI);
  ctx.fillStyle = 'blue';
  ctx.fill();

  // Draw lines to nearest neighbors
  nearestIndices.forEach((i) => {
    ctx.beginPath();
    ctx.moveTo(xScale(newPoint[0]), yScale(newPoint[1]));
    ctx.lineTo(xScale(data[i][0]), yScale(data[i][1]));
    ctx.strokeStyle = 'black';
    ctx.stroke();
  });
}