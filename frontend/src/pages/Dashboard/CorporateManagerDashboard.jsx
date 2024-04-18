//CorporateManagerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Modal, Form, Table } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getAllLocations, createLocation } from '../../services/locationService'; // Import location service functions
import BaseBtn from '../../components/BaseComponents/BaseBtn';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import BaseInput from '../../components/BaseComponents/BaseInput';
import styles from '../../styles/Table.module.css'
import { toast } from "react-toastify";

const CorporateManagerDashboard = () => {
  const [locations, setLocations] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLocation, setNewLocation] = useState({ businessId: '', latitude: '', longitude: '' });

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
        setLocations(response.data); // Make sure to set the 'data' array to state
      } else {
        console.error("Received format is incorrect or data is not an array:", response);
        setLocations([]); // Fallback to an empty array to prevent errors
        toast.error("Failed to fetch locations. Please try again later.");
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      setLocations([]); // Ensure state is always an array
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

      // Check if businessId is provided
      if (!businessId) {
        toast.error("Please enter a valid Business ID.");
        return;
      }

      // Check if latitude is valid
      if (!isValidLatitude(latitude)) {
        toast.error("Please enter a valid latitude (-90 to 90).");
        return;
      }

      // Check if longitude is valid
      if (!isValidLongitude(longitude)) {
        toast.error("Please enter a valid longitude (-180 to 180).");
        return;
      }

      await createLocation(businessId, parseFloat(latitude), parseFloat(longitude));
      fetchLocations();
      setShowCreateModal(false);
      toast.success("Location created successfully.");
    } catch (error) {
      console.error('Failed to create location:', error);
      toast.error("Failed to create location. Please try again later.");
    }
  };

  return (
    <Container>
      <h1>Corporate Manager Dashboard</h1>
      <Row>
        <Col>
          <BaseBtn
            btnType="primary"
            label="Create New Location"
            onClick={() => setShowCreateModal(true)}
          />
          <div className={styles.tableContainer}>
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
                {Array.isArray(locations) && locations.map(location => (
                  <tr key={location.LocationID} className={styles.strongRowLine}>
                    <td className={styles.tableCell}>{location.LocationID}</td>
                    <td className={styles.tableCell}>{location.BusinessID}</td>
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
          <MapContainer center={[0, 0]} zoom={1} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locations.map(location => (
              <Marker
                key={location.LocationID}
                position={[Number(location.Latitude), Number(location.Longitude)]}
                icon={customIcon} // Assign the custom icon to the marker
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
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateLocation}>
            <Form.Group className="mb-3" controlId="locationBusinessId">
              <Form.Label>Business ID</Form.Label>
              <BaseInput
                type="text"
                placeholder="Enter business ID"
                modelValue={newLocation.businessId}
                onChange={(value) => setNewLocation(prevState => ({ ...prevState, businessId: value }))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="locationLatitude">
              <Form.Label>Latitude</Form.Label>
              <BaseInput
                type="text"
                placeholder="Enter latitude"
                modelValue={newLocation.latitude}
                onChange={(value) => setNewLocation(prevState => ({ ...prevState, latitude: value }))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="locationLongitude">
              <Form.Label>Longitude</Form.Label>
              <BaseInput
                type="text"
                placeholder="Enter longitude"
                modelValue={newLocation.longitude}
                onChange={(value) => setNewLocation(prevState => ({ ...prevState, longitude: value }))}
                required
              />
            </Form.Group>
            <BaseBtn
              btnType="primary"
              label="Create Location"
              htmlType="submit"
            />
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CorporateManagerDashboard;