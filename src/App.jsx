import { useState, useEffect, useRef } from 'react';
import { calculateEuclideanDistance, getKNearestNeighbors, predictClass } from './utils/knn';
import { drawScatterPlot } from './utils/draw';
import './App.css';

const data = [
  [100, 6.5], [120, 7.0], [90, 5.5], [140, 8.0], [110, 6.0],
  [130, 7.5], [95, 5.8], [150, 8.5], [115, 6.8], [105, 6.2],
  [125, 7.2], [135, 8.2]
];
const labels = ['Flop', 'Hit', 'Flop', 'Hit', 'Flop', 'Hit', 'Flop', 'Hit', 'Hit', 'Flop', 'Hit', 'Hit'];

function App() {
  const [runtime, setRuntime] = useState(122);
  const [rating, setRating] = useState(7.3);
  const [prediction, setPrediction] = useState(null);
  const canvasRef = useRef(null);

  const handlePredict = () => {
    const newPoint = [runtime, rating];
    const k = 3;
    const nearestNeighbors = getKNearestNeighbors(data, labels, newPoint, k);
    const predictedClass = predictClass(nearestNeighbors);
    setPrediction(predictedClass);

    const canvas = canvasRef.current;
    if (canvas) {
      drawScatterPlot(canvas, data, labels, newPoint, nearestNeighbors.map(n => n.index));
    }
  };

  useEffect(() => {
    // Initial draw
    const canvas = canvasRef.current;
    if (canvas) {
      drawScatterPlot(canvas, data, labels, [runtime, rating], []);
    }
  }, []);

  return (
    <div id="root">
      <h1>KNN Movie Predictor</h1>
      <div className='flexingStles'>
        <div className="card">
          <label>
            Runtime (minutes):
            <input
              type="number"
              value={runtime}
              onChange={(e) => setRuntime(Number(e.target.value))}
              min="90"
              max="150"
              className="input"
            />
          </label>
          <label>
            Audience Rating (1-10):
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="10"
              step="0.1"
              className="input"
            />
          </label>
          <button onClick={handlePredict}>Predict</button>
          {prediction && (
            <p className="prediction">
              Predicted Outcome: <strong>{prediction}</strong>
            </p>
          )}
        </div>
        <canvas ref={canvasRef} width="300" height="220" className="canvas" />
      </div>
      <p className="read-the-docs">
        Enter a movie's runtime and rating to predict if it's a Hit or Flop!
      </p>
    </div>
  );
}

export default App;