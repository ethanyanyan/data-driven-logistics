import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as shipmentService from "../../services/shipmentService";
import * as locationService from "../../services/locationService";
import styles from "../../styles/Table.module.css";
import { format, parseISO } from "date-fns";
import BaseBtn from "../../components/BaseComponents/BaseBtn";
import BaseModal from "../../components/BaseComponents/BaseModal";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { toast } from "react-toastify";

const ShipmentTracking = () => {
  const { user } = useAuth();
  const [shipments, setShipments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");
  const [isSorted, setIsSorted] = useState(false);
  const [addShipmentModalIsOpen, setAddShipmentModalIsOpen] = useState(false);

  //shipment addition modal data
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [status, setStatus] = useState("");

  //source/components/forms/validation for validation.

  const loadShipmentsAndLocations = async () => {
    if (!user || !user.BusinessID) {
      return;
    }
    try {
      const businessId = user.BusinessID;
      const shipmentsData =
        await shipmentService.fetchShipmentsByCompany(businessId);
      const locationsData = await locationService.getAllLocations();
      if (locationsData.success) {
        setLocations(locationsData.data);
      } else {
        throw new Error(locationsData.error);
      }
      setShipments(shipmentsData.data);
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    }
  };

  useEffect(() => {
    loadShipmentsAndLocations();
  }, [user]);
  // possibly move modal/ui to services to make files smaller


  const requestAddShipment = () => {
    setAddShipmentModalIsOpen(true);
  };

  const addShipment = async () => {

    //source/components/forms/signup/submission-logic line 100 new user
    //error check for proper input
    try {
      const result = await shipmentService.addShipment();
      if (result.success) {
        toast.success("Shipment added successfully.");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      setError("Failed to add shipment.");
      console.error(error);
      toast.error("Failed to delete shipment.");
    }
    setAddShipmentModalIsOpen(false);
    loadShipmentsAndLocations();
  }

  const getLocationNameById = (id) => {
    const location = locations.find((loc) => loc.LocationID === id);
    return location ? location.LocationName : "Unknown Location";
  };

  const getIdByLocationName = (locName) => {
    const location = locations.find((loc) =>  loc.LocationName === locName);
    console.log(location);
    return location ? location.LocationID : null;
  };

  const formatDate = (dateString) => {
    return format(parseISO(dateString), "MMMM d, yyyy h:mm a");
  };

  const sortShipments = (field) => {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection("descending");
      setIsSorted(true);
    } else if (sortDirection === "descending") {
      setSortDirection("ascending");
    } else if (sortDirection === "ascending") {
      setSortField(null);
      setSortDirection("ascending");
      setIsSorted(false);
    }

    setShipments((prevShipments) => {
      const sortedShipments = [...prevShipments];
      sortedShipments.sort((a, b) => {
        let valA, valB;
        if (field === "DepartureDate" || field === "ArrivalDate") {
          valA = new Date(a[field]);
          valB = new Date(b[field]);
        } else if (field === "SourceID" || field === "DestinationID") {
          const locationA = locations.find(
            (loc) => loc.LocationID === a[field],
          );
          const locationB = locations.find(
            (loc) => loc.LocationID === b[field],
          );
          valA = locationA ? locationA.LocationName.toLowerCase() : "";
          valB = locationB ? locationB.LocationName.toLowerCase() : "";
        } else {
          valA =
            typeof a[field] === "string" ? a[field].toLowerCase() : a[field];
          valB =
            typeof b[field] === "string" ? b[field].toLowerCase() : b[field];
        }
        if (valA < valB) return sortDirection === "ascending" ? -1 : 1;
        if (valA > valB) return sortDirection === "ascending" ? 1 : -1;
        return 0;
      });
      return sortedShipments;
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={styles.headerContainer}>
        <h1>Shipment Tracking</h1>
      </div>
      <div className={styles.tableContainer}>
        {shipments.length > 0 ? (
          <table className={styles.tableFullWidth}>
            <thead>
              <tr className={styles.strongRowLine}>
                <th
                  className={styles.tableHeader}
                  onClick={() => sortShipments("ShipmentID")}
                >
                  Shipment ID{" "}
                  {sortField === "ShipmentID" &&
                    (sortDirection === "descending" ? (
                      <SlArrowDown />
                    ) : sortDirection === "ascending" ? (
                      <SlArrowUp />
                    ) : null)}
                </th>
                <th
                  className={styles.tableHeader}
                  onClick={() => sortShipments("SourceID")}
                >
                  Source{" "}
                  {sortField === "SourceID" &&
                    (sortDirection === "descending" ? (
                      <SlArrowDown />
                    ) : sortDirection === "ascending" ? (
                      <SlArrowUp />
                    ) : null)}
                </th>
                <th
                  className={styles.tableHeader}
                  onClick={() => sortShipments("DestinationID")}
                >
                  Destination{" "}
                  {sortField === "DestinationID" &&
                    (sortDirection === "descending" ? (
                      <SlArrowDown />
                    ) : sortDirection === "ascending" ? (
                      <SlArrowUp />
                    ) : null)}
                </th>
                <th
                  className={styles.tableHeader}
                  onClick={() => sortShipments("DepartureDate")}
                >
                  Departure Date{" "}
                  {sortField === "DepartureDate" &&
                    (sortDirection === "descending" ? (
                      <SlArrowDown />
                    ) : sortDirection === "ascending" ? (
                      <SlArrowUp />
                    ) : null)}
                </th>
                <th
                  className={styles.tableHeader}
                  onClick={() => sortShipments("ArrivalDate")}
                >
                  Arrival Date{" "}
                  {sortField === "ArrivalDate" &&
                    (sortDirection === "descending" ? (
                      <SlArrowDown />
                    ) : sortDirection === "ascending" ? (
                      <SlArrowUp />
                    ) : null)}
                </th>
                <th
                  className={styles.tableHeader}
                  onClick={() => sortShipments("Status")}
                >
                  Status{" "}
                  {sortField === "Status" &&
                    (sortDirection === "descending" ? (
                      <SlArrowDown />
                    ) : sortDirection === "ascending" ? (
                      <SlArrowUp />
                    ) : null)}
                </th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.ShipmentID} className={styles.strongRowLine}>
                  <td className={styles.tableCell}>{shipment.ShipmentID}</td>
                  <td className={styles.tableCell}>
                    {getLocationNameById(shipment.SourceID)}
                  </td>
                  <td className={styles.tableCell}>
                    {getLocationNameById(shipment.DestinationID)}
                  </td>
                  <td className={styles.tableCell}>
                    {formatDate(shipment.DepartureDate)}
                  </td>
                  <td className={styles.tableCell}>
                    {formatDate(shipment.ArrivalDate)}
                  </td>
                  <td className={styles.tableCell}>{shipment.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No shipments found.</h2>
        )}
      </div>
      <BaseModal
        isOpen={addShipmentModalIsOpen}
        onRequestClose={() => setAddShipmentModalIsOpen(false)}
        width="400px"
      >
        {{
          header: <h2>Add Shipment</h2>,
          body: (
            <p>Please enter shipment information below:</p>,
            <div className="ta">
              <div className="form-field">
                <label htmlFor="source">Source:</label>
                <select onChange={setSource}>
                {locations.map(location => <option value={getIdByLocationName(location.LocationName)}>{location.LocationName}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="destination">Destination:</label>
                <select onChange={setDestination}>
                {locations.map(location => <option value={getIdByLocationName(location.LocationName)}>{location.LocationName}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="departure date">Departure Date:</label>
                <input type="date" class="form-control" onChange={setDepartureDate}/>
              </div>
              <div className="form-field">
                <label htmlFor="departure date">Arrival Date:</label>
                <input type="date" class="form-control" onChange={setArrivalDate}/>
              </div>
              <div className="form-field">
                <label htmlFor="source">Status:</label>
                <select onChange={setStatus}>
                  <option value="In Transit" label="In Transit"/>
                  <option value="Delayed" label="Delayed"/>
                  <option value="Delivered" label="Delivered"/>
                </select>
              </div>
            </div>
            ),
          buttons: (
            <div>
              <span style={{ marginRight: "10px" }}>
                <BaseBtn onClick={() => setAddShipmentModalIsOpen(false)}>Cancel</BaseBtn>
              </span>
              <BaseBtn onClick={requestAddShipment}>Confirm</BaseBtn>
            </div>
          ),
        }}
      </BaseModal>
    </div>
  );
};

export default ShipmentTracking;
