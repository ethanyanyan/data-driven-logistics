import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Form, Table, Button } from 'react-bootstrap';
import { getAllItems, createItem, updateInventoryItem, deleteInventoryItem } from '../../services/inventoryService';
import BaseBtn from '../../components/BaseComponents/BaseBtn';
import BaseInput from '../../components/BaseComponents/BaseInput';
import styles from '../../styles/Table.module.css'

const FacilityManagerDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', description: '' });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await getAllItems();
      // Set only the data array to the inventory state
      setInventory(response.data);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    }
  };
  

  const handleCreateItem = async (event) => {
    event.preventDefault();
    try {
      await createItem(newItem);
      fetchInventory();
      setShowCreateModal(false);
      setNewItem({ name: '', quantity: '', description: '' });
    } catch (error) {
      console.error('Failed to create item:', error);
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
      console.error('Failed to update item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteInventoryItem(itemId);
      fetchInventory();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <Container>
      <h1>Facility Manager Dashboard</h1>
      <Row>
        <Col>
          <BaseBtn
            btnType="primary"
            label="Create New Item"
            onClick={() => setShowCreateModal(true)}
          />
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
              {inventory.map(item => (
                <tr key={item.InventoryLevelID} className={styles.strongRowLine}>
                  <td className={styles.tableCell}>{item.InventoryLevelID}</td>
                  <td className={styles.tableCell}>{item.LocationID}</td>
                  <td className={styles.tableCell}>{item.ProductID}</td>
                  <td className={styles.tableCell}>{item.Quantity}</td>
                  <td className={styles.tableCell}>
                    <Button variant="primary" size="sm" onClick={() => {
                      setSelectedItem(item);
                      setShowEditModal(true);
                    }}>Edit</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteItem(item.InventoryLevelID)}>Delete</Button>
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
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleCreateItem}>
          <Form.Group className="mb-3" controlId="itemLocationID">
            <Form.Label>Location ID</Form.Label>
            <BaseInput
              type="text"
              placeholder="Enter Location ID"
              modelValue={newItem.LocationID}
              onChange={(value) => setNewItem({ ...newItem, LocationID: value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemProductID">
            <Form.Label>Product ID</Form.Label>
            <BaseInput
              type="text"
              placeholder="Enter Product ID"
              modelValue={newItem.ProductID}
              onChange={(value) => setNewItem({ ...newItem, ProductID: value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemQuantity">
            <Form.Label>Quantity</Form.Label>
            <BaseInput
              type="number"
              placeholder="Enter Quantity"
              modelValue={newItem.Quantity}
              onChange={(value) => setNewItem({ ...newItem, Quantity: value })}
              required
            />
          </Form.Group>
          <BaseBtn
            btnType="primary"
            label="Create Item"
            htmlType="submit"
          />
        </Form>
      </Modal.Body>
      </Modal>

      {/* Modal for editing an item */}
      {selectedItem && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditItem}>
              <Form.Group className="mb-3" controlId="editItemName">
                <Form.Label>Name</Form.Label>
                <BaseInput
                  type="text"
                  placeholder="Enter item name"
                  modelValue={selectedItem.name}
                  onChange={(value) => setSelectedItem({ ...selectedItem, name: value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editItemQuantity">
                <Form.Label>Quantity</Form.Label>
                <BaseInput
                  type="number"
                  placeholder="Enter item quantity"
                  modelValue={selectedItem.quantity}
                  onChange={(value) => setSelectedItem({ ...selectedItem, quantity: value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editItemDescription">
                <Form.Label>Description</Form.Label>
                <BaseInput
                  type="text"
                  placeholder="Enter item description"
                  modelValue={selectedItem.description}
                  onChange={(value) => setSelectedItem({ ...selectedItem, description: value })}
                  required
                />
              </Form.Group>
              <BaseBtn
                btnType="primary"
                label="Update Item"
                htmlType="submit"
              />
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default FacilityManagerDashboard;