import React, { useState, useRef } from "react";
import GoogleMapReact from 'google-map-react';
import { useTranslation } from 'react-i18next';
import "../../renderer/App.css"
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

  function onDrawCallback(shape) {
    props.callback(shape)

    setState(prevState => ({ ...prevState, shape, drawingMode: false }));
  }

  function setDrawingMode(drawingMode) {
    mapDrawShapeManagerRef.current.setDrawingMode(drawingMode);

    setState(prevState => ({ ...prevState, drawingMode }));
  }

  function resetDrawnShape() {
    mapDrawShapeManagerRef.current.resetDrawnShape();

    setState(prevState => ({ ...prevState, shape: [] }));
  }

  return (
    <>
      <div  id="map-container">
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
    key: 'AIzaSyCn8eV4OJCGnktvuqI5DmfXqb-g1xn6LVk',
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
    lat: 39.58875553716348,
    lng: -8.576849426688483
  },
  defaultZoom: 7,
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