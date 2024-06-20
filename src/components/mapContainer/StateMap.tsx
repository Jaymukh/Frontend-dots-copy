/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useEffect, useState, useRef, useCallback } from "react";
import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { useRecoilValue } from "recoil";

// CSS
import "../../styles/main.css";

// Components
import CoreSolutions from "./CoreSolutions";
import MapPopup from "./MapPopup";
import DistrictSideBar from "../familyContainer/family/DistrictSidebar";
import { Breadcrumb, BreadcrumbItem } from "../ui/breadcrumb/Breadcrumb";
import { errorState, geoJsonState, mapFeatureState } from "../../states";
import { Heading } from "../ui/typography/Heading";

// Utilities
import * as MapConstants from "../../utils/json/googlemapstyle";
import * as Constants from "../../utils/constants/Constants";
import { useMapsService, useUserService } from "../../services";
import HoverPopup from "./HoverPopup";
import { useMapHelpers } from "../../helpers";
import { initDB } from "../login/db";
import Switch from "../ui/switch/Switch";

interface Option {
  label: string;
  key: number;
  type: string;
}

interface StateMapProps {
  selected: any;
  updateSelected: (key: string, value: any) => void;
  breadcrumbs: BreadcrumbItem[];
  handleBreadcrumbClick: (item: BreadcrumbItem, index: number) => void;
  isChecked: any;
  setIsChecked: (isChecked: any) => void;
}

const StateMap: React.FC<StateMapProps> = ({
  selected,
  updateSelected,
  breadcrumbs,
  handleBreadcrumbClick,
  isChecked,
  setIsChecked,
}) => {
  const mapRef = useRef(null);
  const mapServices = useMapsService();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [circles, setCircles] = useState<google.maps.Marker[]>([]);
  const [selectedRb, setSelectedRb] = useState(0);
  const [coreSolutions, setCoreSolutions] = useState<Option[]>([]);
  const [selectedCoreSoln, setSelectedCoreSoln] = useState<Option>();
  const [isHover, setIsHover] = useState(false);
  const [hoverData, setHoverData] = useState<any>();
  const [focused, setFocused] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<{
    isClicked: boolean;
    feature: any;
  }>({ isClicked: false, feature: null });
  const geoJSON = useRecoilValue(geoJsonState);
  const mapFeatures = useRecoilValue(mapFeatureState);
  const { getErrorMsg } = useMapHelpers();
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
  });
  const [center, setCenter] = useState({
    lat: 22.7196,
    lng: 73.97449,
  });

  const mapOptions = {
    disableDefaultUI: true,
    mapTypeControl: false,
    streetViewControl: false,
    styles: MapConstants.NonGlobalMapStyle,
    isFractionalZoomEnabled: true,
    keyboardShortcuts: false,
    gestureHandling: "none", //manual zoom handling
    zoomControl: false,
    clickableIcons: true,
  };

  // function to find object which has geoName and geoId
  interface FeatureObject {
    [key: string]: any;
  }
  const findRegionObject = (obj: FeatureObject): FeatureObject | null => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          // Recursively search in nested objects
          const result = findRegionObject(obj[key]);
          if (result) {
            return result;
          }
        } else if (
          key === "id" &&
          typeof obj[key] === "number" &&
          obj.hasOwnProperty("Name") &&
          typeof obj["Name"] === "string" &&
          obj.hasOwnProperty("region") &&
          typeof obj["region"] === "string" &&
          obj.hasOwnProperty("Color") &&
          typeof obj["Color"] === "string"
        ) {
          // Check if the object matches the desired structure
          return obj;
        }
      }
    }
    return null; // Return null if no match is found
  };

  const onClickMapFeature = (feature: any) => {
    setSelectedRegion({ isClicked: true, feature: feature });
  };

  const handleMapClick = (feature: any) => {
    var id;
    var clickedRegion;
    if (feature?.id) {
      id = feature?.id;
    } else {
      clickedRegion = findRegionObject(feature);
      id = clickedRegion?.id;
    }
    if (selected.district) {
      setSelectedRegion({ isClicked: false, feature: null });
      return;
    } else if (selected.state) {
      updateSelected("district", id);
    } else if (selected.country) {
      updateSelected("state", id);
    }
    setSelectedRegion({ isClicked: false, feature: null });
  };

  const toggleSwitch = (event?: React.ChangeEvent<HTMLInputElement>) => {
    // if(Heading.title === )
    // console.log("This is toggle");
    const name: string = event?.target?.name!;
    const now = new Date();
    const formattedDateTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;
    setIsChecked({ ...isChecked, [name]: !isChecked[name] });
    const obj3 = { id: formattedDateTime, SwitctName: name, Value: !isChecked[name] };
    initDB("users", obj3);
  };

  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    (mapInstance as any).circles = [];
  }, []);

  const handleChangeRb = (
    event: { target: { value: any } },
    option: Constants.Option
  ) => {
    setSelectedRb(Number(event.target.value));
    setSelectedCoreSoln(option);
  };

  const clearCircles = () => {
    setCircles((prevCircles) => {
      prevCircles.forEach((circle) => {
        circle.setMap(null);
      });
      return [];
    });
  };

  const handleFocused = (index: number) => {
    setFocused(index);
  };

  useEffect(() => {
    if (selectedRegion?.isClicked) {
      handleMapClick(selectedRegion?.feature);
    }
  }, [selectedRegion?.isClicked, selected]);

  useEffect(() => {
    const geoCode = geoJSON?.rootProperties?.id;
    if (geoCode) {
      mapServices
        .getCoreSolutions(Number(geoCode))
        .then((data) => {
          setCoreSolutions(data);
          setSelectedCoreSoln(data[0]);
          setIsChecked({ ...isChecked, coreSolution: data.length > 0 });
        })
        .catch((error) => {
          getErrorMsg(error);
        });
    }
  }, [geoJSON]);

  useEffect(() => {
    if (map && Object.keys(geoJSON).length) {
      map.data.forEach((feature) => {
        map.data.remove(feature);
      });
      map.data.addGeoJson(geoJSON);
      map.data.addListener("click", (event: any) =>
        onClickMapFeature(event.feature)
      );
      map.data.addListener("mouseover", (event: any) =>
        onHoverMap(event.feature)
      );

      map.data.setStyle((feature: any) => {
        const fillColor = feature.getProperty("Color");
        return {
          fillColor,
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 0.5,
        };
      });

      const processCoordinates = (coordinates: any): void => {
        if (Array.isArray(coordinates[0])) {
          // Multi-part geometry, like a polygon with holes or a multi-line string
          coordinates.forEach((coordSet: any) => {
            processCoordinates(coordSet);
          });
        } else {
          // Single set of coordinates
          bounds.extend(
            new window.google.maps.LatLng(coordinates[1], coordinates[0])
          );
        }
      };

      const bounds = new window.google.maps.LatLngBounds();
      geoJSON.features.forEach((feature: any) => {
        processCoordinates(feature.geometry.coordinates);
      });

      // Set map center and zoom level based on bounding box
      map.fitBounds(bounds);
      setCenter({
        lat: bounds?.getCenter()?.lat(),
        lng: bounds?.getCenter()?.lng(),
      });
    }
  }, [map, geoJSON]);

  useEffect(() => {
    clearCircles();
    if (
      map &&
      mapFeatures?.circles &&
      mapFeatures?.circles?.length > 0 &&
      isChecked?.coreSolution
    ) {
      const newCircles = mapFeatures?.circles?.map((feature: any) => {
        const type = selectedCoreSoln?.type;
        const coreSumType = coreSolutions[0]?.type;

        const radii = type !== coreSumType ? [coreSumType, type] : [type];
        // const multplyFactor = selected?.district ? 240 : (selected?.state ? 64 : 30);
        // let multplyFactor = 1;
        return radii.map((radius, i) => {
          if (radius) {
            const fillOpacity = i === 0 && radii.length > 1 ? 0 : 0.5;
            const marker = new window.google.maps.Marker({
              position: new window.google.maps.LatLng(
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0]
              ),
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#FFFFFF",
                fillOpacity,
                strokeWeight: 2,
                strokeColor: "#FFFFFF",
                rotation: 0,
                scale: feature.properties[radius],
              },
              map: map,
            });
            marker?.addListener("click", () => onClickMapFeature(feature));
            return marker;
          }
          return null;
        });
      });
      setCircles(
        newCircles
          .flat()
          .filter((circle) => circle !== null) as google.maps.Marker[]
      );
    }
  }, [map, mapFeatures.circles, selectedCoreSoln, isChecked.coreSolution]);

  useEffect(() => {
    clearCircles();
    setSelectedRb(0);
    handleMapHover(true);
  }, [selected.country, selected.state, selected.district]);

  useEffect(() => {
    if (
      mapFeatures?.featuredStories === null ||
      (Array.isArray(mapFeatures?.featuredStories) &&
        mapFeatures?.featuredStories.length === 0) ||
      mapFeatures.featuredStories?.featuredStories?.length === 0
    ) {
      setIsChecked({ ...isChecked, viewStories: false });
    } else {
      setIsChecked({ ...isChecked, viewStories: true });
    }
  }, [map, mapFeatures.featuredStories]);

  const onHoverMap = (feature: any) => {
    setIsHover(true);
    const coordinates = feature?.Gg?.coordinates;
    const boundary = map?.getBounds()?.toJSON();
    let offset: any = 0;

    const distance = distanceFromMapTopToPoint(
      boundary,
      map?.getZoom(),
      coordinates[0]
    );
    if (distance < 10500) {
      offset = "200%";
    }
    setHoverData({ ...feature?.Gg });
  };

  function distanceFromMapTopToPoint(
    mapBoundary: any,
    zoom: number | undefined,
    lat: any
  ) {
    // Calculate latitude difference between map north end and point
    const mapNorthLat = mapBoundary.north;
    const pointLat = lat;
    const latDiff = Math.abs(mapNorthLat - pointLat);

    // Calculate distance in degrees (latitude difference) between the map north end and the point
    const degreeDistance = latDiff * 111.1; // 1 degree latitude ≈ 111 kilometers

    // Calculate distance in pixels between the map top and the point
    const mapHeight = 256 * Math.pow(2, zoom!); // Height of the map in pixels
    const pixelDistance = (degreeDistance / 360) * mapHeight; //dividing by 1.5*10**4 for simpler calculations

    return pixelDistance;
  }

  const handleMapHover = (event?: any) => {
    if (event) {
      setHoverData(null);
    }
  };

  return (
    <div
      className="row margin-left-right-0"
      style={{ height: "85.5vh", zIndex: 999 }}
    >
      <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 margin-0 padding-0">
        <div className="row margin-0 padding-0 h-100">
          <div
            className="col-12 padding-left-3 padding-top-bottom-2 bg-white border-bottom d-flex align-items-center"
            style={{ height: "5.25vh" }}
          >
            <Breadcrumb
              items={breadcrumbs}
              handleBreadcrumbClick={handleBreadcrumbClick}
            />
          </div>
          <div
            className="col-3 col-sm-3 col-md-4 col-lg-3 col-xl-3 padding-0"
            style={{ backgroundColor: "#F4F6F8", height: "80.25vh" }}
          >
            <CoreSolutions
              isChecked={isChecked}
              toggleSwitch={toggleSwitch}
              handleChangeRb={handleChangeRb}
              selectedRb={selectedRb}
              options={coreSolutions}
            />
          </div>
          <div
            className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 padding-0"
            style={{ height: "80.25vh" }}
          >
            {isLoaded && (
              <GoogleMap
                ref={mapRef}
                zoom={6}
                mapContainerStyle={MapConstants.containerStyle}
                center={center}
                onLoad={handleMapLoad}
                options={mapOptions}
                onMouseMove={(event) => handleMapHover(event)}
              >
                {mapFeatures.featuredStories?.featuredStories &&
                  isChecked?.viewStories &&
                  Object.keys(geoJSON).length &&
                  mapFeatures.featuredStories?.featuredStories?.map(
                    (feature: any, index: number) => (
                      <InfoWindow
                        key={index}
                        position={{
                          lng: feature.properties.geometry.coordinates[0],
                          lat: feature.properties.geometry.coordinates[1],
                        }}
                        options={
                          {
                            padding: 0,
                            // maxWidth: 260,
                            minWidth: 200,
                            borderRadius: 0,
                            border: 0,
                            overflow: "hidden",
                            zIndex: focused === index ? 1000 : 0,
                            disableAutoPan: true,
                            shouldFocus: false,
                          } as any
                        }
                      >
                        <MapPopup
                          properties={feature.properties}
                          handleFocused={handleFocused}
                          index={index}
                        />
                      </InfoWindow>
                    )
                  )}
                {isHover && hoverData && (
                  <InfoWindow
                    position={{
                      lat: hoverData?.coordinates[0],
                      lng: hoverData?.coordinates[1],
                    }}
                    options={
                      {
                        padding: 0,
                        // maxWidth: 200,
                        minWidth: 100,
                        borderRadius: 0,
                        overflow: "hidden",
                        zIndex: 1000,
                        disableAutoPan: true,
                        pixelOffset: hoverData?.offset,
                        shouldFocus: false,
                      } as any
                    }
                  >
                    <HoverPopup
                      properties={hoverData}
                      onClickMapFeature={onClickMapFeature}
                      selected={selected}
                    />
                  </InfoWindow>
                )}
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 padding-0 h-100">
        <DistrictSideBar
          selectedRb={selectedRb}
          coreSolutions={coreSolutions}
        />
      </div>
    </div>
  );
};

export default StateMap;
