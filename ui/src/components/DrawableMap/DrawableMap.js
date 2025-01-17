import React, { useState, useRef } from "react";
import GoogleMapReact from 'google-map-react';
import { useTranslation } from 'react-i18next';
import "../../App.css"
import MapDrawShapeManager from 'google-maps-draw-shape-lib';
import './DrawableMap.css';

export default function MapDrawShape(props) {
  const [t, i18n] = useTranslation();
  const [state, setState] = useState({
    mapLoaded: false,
    drawingMode: false,
    drawFreeHandMode: false,
    shape: [],
  });

  const mapDrawShapeManagerRef = useRef(null);

  function onGoogleApiLoaded(map, maps) {
    mapDrawShapeManagerRef.current = new MapDrawShapeManager(
      map,
      onDrawCallback,
      state.drawingMode,
      state.drawFreeHandMode,
      props.polygonOptions,
      props.initialPointInnerHtml,
      props.deletePointInnerHtml
    );

    setState(prevState => ({ ...prevState, mapLoaded: true }));
  }

  const saveCoordsRequest = (shape, the_name) => {
    fetch('http://127.0.0.1:5000/save-coords', { // if getting a CORS error, use 127.0.0.1 instead (localhost alias)
        method: 'post',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            "name": the_name,
            "shape": shape
            })
    })
  }

  function onDrawCallback(shape) {
    // These two lines might shortly become outdated, depending on how we implement the db
    document.documentElement.setAttribute("unsavedChanges", "true")
    setState(prevState => ({ ...prevState, shape, drawingMode: false }));
    //console.log(shape); 
    const the_name = window.prompt("Enter a name for this route:", "Default Name");
    // only save if user provided a name
    if (the_name) {
        saveCoordsRequest(shape, the_name);
    } else {
        alert("No name entered. Coordinates were not saved.");
    }
  }

  function setDrawingMode(drawingMode) {
    mapDrawShapeManagerRef.current.setDrawingMode(drawingMode);
    setState(prevState => ({ ...prevState, drawingMode }));
  }

  function resetDrawnShape() {
    document.documentElement.removeAttribute("unsavedChanges");
    mapDrawShapeManagerRef.current.resetDrawnShape();

    setState(prevState => ({ ...prevState, shape: [] }));
  }

  return (
    <>
      <div id="map-container">
        <GoogleMapReact 
          bootstrapURLKeys={props.mapBootstrap}
          options={props.mapOptions}
          defaultCenter={props.defaultCenter}
          defaultZoom={props.defaultZoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
        >
        </GoogleMapReact> 
      </div>
      {state.mapLoaded &&
        <div className="controls-container">
          <div className="center">
            <button className="btn-control" onClick={() => setDrawingMode(!state.drawingMode)}>
            {!state.drawingMode ? t("startDraw") : t("cancelDraw")}
            </button>
            <button className="btn-control" disabled={(!(state.shape?.length > 0) || state.drawingMode)} onClick={resetDrawnShape}>{t("clearDraw")}</button>
          </div>
        </div>
      }
    </>
  );
}
MapDrawShape.defaultProps = {
  mapBootstrap: {
    key: 'AIzaSyCn8eV4OJCGnktvuqI5DmfXqb-g1xn6LVk', // TODO what is this key? is this OK to have in plaintext?
    libraries: ['drawing']
  },
  mapOptions: {
    mapTypeId: 'hybrid',
    minZoom: 5,
    maxZoom: 20,
    gestureHandling: 'greedy',
    disableDefaultUI: true,
    scrollwheel: true,
    clickableIcons: false,
    rotateControl: false,
    tilt: 0
  },
  defaultCenter: {
    lat: 44.5650665,
    lng: -123.2865842,
  },
  defaultZoom: 18,
  polygonOptions: {
    clickable: false,
    fillColor: "#303030",
    fillOpacity: 0.1,
    strokeColor: "#000000",
    strokeWeight: 4,
    strokeOpacity: 1
  },
  initialPointInnerHtml: `<button class="btn-initial-point" title="Initial Point"></button>`,
  deletePointInnerHtml: `<button class="btn-delete-point" title="Delete">X</button></div>`
}