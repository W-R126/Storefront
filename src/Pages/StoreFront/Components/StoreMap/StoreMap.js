import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import CONFIG from '../../../../config';

const StoreMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ mapCenter }) => {
  if (Object.keys(mapCenter).length === 0) return null;
  return (
    <GoogleMap
      defaultZoom={20}
      defaultCenter={mapCenter}
      mapTypeControlOptions={{
        mapTypeIds: [window.google.maps.MapTypeId.ROADMAP, window.google.maps.MapTypeId.HYBRID],
      }}
      mapTypeControl={false}
      mapTypeId={window.google.maps.MapTypeId.ROADMAP}
    >
      <Marker position={mapCenter} />
    </GoogleMap>
  );
});

export default StoreMap;
