//CorporateManagerDashboard.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Form, Table } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  getAllLocations,
  createLocation,
} from "../../services/locationService";
import BaseBtn from "../../components/BaseComponents/BaseBtn";
import BaseModal from "../../components/BaseComponents/BaseModal";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import BaseInput from "../../components/BaseComponents/BaseInput";
import styles from "../../styles/Table.module.css";
import { toast } from "react-toastify";

const CorporateManagerDashboard = () => {
  const [locations, setLocations] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLocation, setNewLocation] = useState({
    businessId: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const customIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  const fetchLocations = async () => {
    try {
      const response = await getAllLocations();
      if (response && Array.isArray(response.data)) {
        setLocations(response.data);
      } else {
        console.error(
          "Received format is incorrect or data is not an array:",
          response,
        );
        setLocations([]);
        toast.error("Failed to fetch locations. Please try again later.");
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      setLocations([]);
      toast.error("Failed to fetch locations. Please try again later.");
    }
  };

  const isValidLatitude = (latitude) => {
    return !isNaN(latitude) && latitude >= -90 && latitude <= 90;
  };

  const isValidLongitude = (longitude) => {
    return !isNaN(longitude) && longitude >= -180 && longitude <= 180;
  };

  const handleCreateLocation = async (event) => {
    event.preventDefault();
    try {
      const { businessId, latitude, longitude } = newLocation;

      if (!businessId) {
        toast.error("Please enter a valid Business ID.");
        return;
      }

      if (!isValidLatitude(latitude)) {
        toast.error("Please enter a valid latitude (-90 to 90).");
        return;
      }

      if (!isValidLongitude(longitude)) {
        toast.error("Please enter a valid longitude (-180 to 180).");
        return;
      }

      await createLocation(
        businessId,
        parseFloat(latitude),
        parseFloat(longitude),
      );
      fetchLocations();
      setShowCreateModal(false);
      toast.success("Location created successfully.");
    } catch (error) {
      console.error("Failed to create location:", error);
      toast.error("Failed to create location. Please try again later.");
    }
  };

  return (
    <Container>
      <h1>Corporate Manager Dashboard</h1>
      <Row>
        <Col>
          <div style={{ marginBottom: "15px" }}>
            <BaseBtn
              btnType="primary"
              label="Create New Location"
              onClick={() => setShowCreateModal(true)}
            />
          </div>
          <div
            className={styles.tableContainer}
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table className={styles.tableFullWidth}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>ID</th>
                  <th className={styles.tableHeader}>Business ID</th>
                  <th className={styles.tableHeader}>Latitude</th>
                  <th className={styles.tableHeader}>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(locations) &&
                  locations.map((location) => (
                    <tr
                      key={location.LocationID}
                      className={styles.strongRowLine}
                    >
                      <td className={styles.tableCell}>
                        {location.LocationID}
                      </td>
                      <td className={styles.tableCell}>
                        {location.BusinessID}
                      </td>
                      <td className={styles.tableCell}>{location.Latitude}</td>
                      <td className={styles.tableCell}>{location.Longitude}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <h4>Total Locations: {locations.length}</h4>
        </Col>
        <Col>
          <MapContainer
            center={[0, 0]}
            zoom={1}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locations.map((location) => (
              <Marker
                key={location.LocationID}
                position={[
                  Number(location.Latitude),
                  Number(location.Longitude),
                ]}
                icon={customIcon}
              >
                <Popup>
                  {`Location ID: ${location.LocationID}, Business ID: ${location.BusinessID}`}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Col>
      </Row>
      {/* Modal for creating a new location */}
      <BaseModal
        isOpen={showCreateModal}
        onRequestClose={() => setShowCreateModal(false)}
        header={<h3>Create New Location</h3>}
        body={
          <Form onSubmit={handleCreateLocation}>
            <Form.Group className="mb-3" controlId="locationBusinessId">
              <Form.Label>Business ID</Form.Label>
              <BaseInput
                type="text"
                placeholder="Enter business ID"
                modelValue={newLocation.businessId}
                onChange={(value) =>
                  setNewLocation((prevState) => ({
                    ...prevState,
                    businessId: value,
                  }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="locationLatitude">
              <Form.Label>Latitude</Form.Label>
              <BaseInput
                type="text"
                placeholder="Enter latitude"
                modelValue={newLocation.latitude}
                onChange={(value) =>
                  setNewLocation((prevState) => ({
                    ...prevState,
                    latitude: value,
                  }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="locationLongitude">
              <Form.Label>Longitude</Form.Label>
              <BaseInput
                type="text"
                placeholder="Enter longitude"
                modelValue={newLocation.longitude}
                onChange={(value) =>
                  setNewLocation((prevState) => ({
                    ...prevState,
                    longitude: value,
                  }))
                }
                required
              />
            </Form.Group>
            <BaseBtn
              btnType="primary"
              label="Create Location"
              htmlType="submit"
            />
          </Form>
        }
      />
    </Container>
  );
};

export default CorporateManagerDashboard;
