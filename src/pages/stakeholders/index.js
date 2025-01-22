import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { locations } from "../../locations";
import { PageTitle } from "../../components/PageTitle";
import "./style.css";

export const Stakeholders = () => {
  const convertToAddress = ([lat, lon]) => {
    return `${lat}, ${lon}`;
  };

  return (
    <>
      <div className="containheader">
        <PageTitle className="playfair-display-semibold text-center mb-4">
          Stakeholders on water enegry food nexus - Europe region
        </PageTitle>
        <div className="map-container">
          <MapContainer center={[locations[0][0], locations[0][1]]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location, index) => {
              return (
                <Marker position={location} key={index}>
                  <Popup>{convertToAddress([location[0], location[1]])}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </>
  );
};
