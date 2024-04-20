import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Form,
  Table,
  Button,
} from "react-bootstrap";
import {
  getAllItems,
  createItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../../services/inventoryService";
import BaseBtn from "../../components/BaseComponents/BaseBtn";
import BaseInput from "../../components/BaseComponents/BaseInput";
import styles from "../../styles/Table.module.css";
import BaseModal from "../../components/BaseComponents/BaseModal";
import "../../components/BaseComponents/BaseBtn.css";

const FacilityManagerDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await getAllItems();
      setInventory(response.data);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };

  const handleCreateItem = async (event) => {
    event.preventDefault();
    try {
      await createItem(newItem);
      fetchInventory();
      setShowCreateModal(false);
      setNewItem({ name: "", quantity: "", description: "" });
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  };

  const handleEditItem = async (event) => {
    event.preventDefault();
    try {
      await updateInventoryItem(selectedItem.id, selectedItem);
      fetchInventory();
      setShowEditModal(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteInventoryItem(itemId);
      fetchInventory();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <Container>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Facility Manager Dashboard</h1>
        </Col>
        <Col xs="auto">
          <BaseBtn
            btnType="primary"
            label="Create New Item"
            onClick={() => setShowCreateModal(true)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.tableContainer}>
            <Table className={styles.tableFullWidth}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Inventory Level ID</th>
                  <th className={styles.tableHeader}>Location ID</th>
                  <th className={styles.tableHeader}>Product ID</th>
                  <th className={styles.tableHeader}>Quantity</th>
                  <th className={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr
                    key={item.InventoryLevelID}
                    className={styles.strongRowLine}
                  >
                    <td className={styles.tableCell}>
                      {item.InventoryLevelID}
                    </td>
                    <td className={styles.tableCell}>{item.LocationID}</td>
                    <td className={styles.tableCell}>{item.ProductID}</td>
                    <td className={styles.tableCell}>{item.Quantity}</td>
                    <td className={styles.tableCell}>
                      <BaseBtn
                        className="edit-btn"
                        btnType="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </BaseBtn>{" "}
                      <BaseBtn
                        className="delete-btn"
                        btnType="secondary"
                        size="sm"
                        onClick={() => handleDeleteItem(item.InventoryLevelID)}
                      >
                        Delete
                      </BaseBtn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <h4>Total Items: {inventory.length}</h4>
        </Col>
      </Row>

      {/* Modal for creating a new item */}
      <BaseModal
        isOpen={showCreateModal}
        onRequestClose={() => setShowCreateModal(false)}
      >
        {{
          header: <h3>Create New Item</h3>,
          body: (
            <Form onSubmit={handleCreateItem}>
              <Form.Group className="mb-3" controlId="itemLocationID">
                <Form.Label>Location ID</Form.Label>
                <BaseInput
                  type="text"
                  placeholder="Enter Location ID"
                  value={newItem.LocationID}
                  onChange={(e) =>
                    setNewItem({ ...newItem, LocationID: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="itemProductID">
                <Form.Label>Product ID</Form.Label>
                <BaseInput
                  type="text"
                  placeholder="Enter Product ID"
                  value={newItem.ProductID}
                  onChange={(e) =>
                    setNewItem({ ...newItem, ProductID: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="itemQuantity">
                <Form.Label>Quantity</Form.Label>
                <BaseInput
                  type="number"
                  placeholder="Enter Quantity"
                  value={newItem.Quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, Quantity: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <BaseBtn btnType="primary" label="Create Item" type="submit" />
            </Form>
          ),
        }}
      </BaseModal>

      {/* Modal for editing an item */}
      <BaseModal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
      >
        {{
          header: <h3>Edit Item</h3>,
          body: selectedItem && (
            <Form onSubmit={handleEditItem}>
              <Form.Group className="mb-3" controlId="editItemLocationID">
                <Form.Label>Location ID</Form.Label>
                <BaseInput
                  type="text"
                  placeholder="Enter Location ID"
                  value={selectedItem.LocationID}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      LocationID: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editItemProductID">
                <Form.Label>Product ID</Form.Label>
                <BaseInput
                  type="text"
                  placeholder="Enter Product ID"
                  value={selectedItem.ProductID}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      ProductID: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editItemQuantity">
                <Form.Label>Quantity</Form.Label>
                <BaseInput
                  type="number"
                  placeholder="Enter Quantity"
                  value={selectedItem.Quantity}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      Quantity: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <BaseBtn btnType="primary" label="Update Item" type="submit" />
            </Form>
          ),
        }}
      </BaseModal>
    </Container>
  );
};

export default FacilityManagerDashboard;
