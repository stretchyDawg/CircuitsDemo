import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import './View.css'

const View = () => {
  const [scale, setScale] = React.useState(1);
  const stageRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    if(container){
      const width = container.clientWidth;
      const height = container.clientHeight;

      stageRef.current.width(width);
      stageRef.current.height(height);
    }

  }, [scale]);


  const handleWheel = (e) => {
    e.evt.preventDefault();

    // Adjusts scale based on wheel movement
    const newScale = e.evt.deltaY > 0 ? scale * 1.2 : scale / 1.2;

    // Limits scale to reasonable range 
    const minScale = .1;
    const maxScale = 5;

    if (newScale > minScale && newScale < maxScale) {
      setScale(newScale);
    }
  };

  return (
    <div className="view-container">
      <div className="view-stage" style={{ position: 'relative', width: '100%', height: '100%' }} ref={containerRef}>
        <Stage
          width={750}
          height={600}
          onWheel={handleWheel}
          ref={stageRef}
          scaleX={scale}
          scaleY={scale}
        >
          {/* These are basic assets that won't realistically be used. */}
          <Layer>
            <Rect width={100} height={200} fill="blue" />
            <Rect width={50} height={30} fill="red" />
          </Layer>
          <Layer>
          <Rect width={30} height={50} fill="green" />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default View;
