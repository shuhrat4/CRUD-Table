import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItem } from "./redtool/slices/crudSlice";

const CrudTable = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.crud.items);

  const [newItemName, setNewItemName] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  // Function to handle adding a new item
  const handleAddItem = () => {
    if (newItemName) {
      dispatch(addItem({ id: Date.now(), name: newItemName }));
      setNewItemName("");
    }
  };

  // Function to handle editing an existing item
  const handleUpdateItem = (id) => {
    if (editingItemName) {
      dispatch(updateItem({ id, name: editingItemName }));
      setEditingItemId(null);
      setEditingItemName("");
    }
  };

  // Function to handle deleting an item
  const handleDeleteItem = (id) => {
    dispatch(removeItem(id));
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>CRUD Table</h2>

      {/* Search Input */}
      <input
        type="search"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.input}
      />

      {/* Add Item Section */}
      <div style={styles.addItemContainer}>
        <input
          type="text"
          placeholder="Enter item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddItem} style={styles.addButton}>
          Add 
        </button>
      </div>

      {/* Table for CRUD Operations */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr
              key={item.id}
              style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              <td style={styles.td}>{item.id}</td>
              <td style={styles.td}>
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={editingItemName}
                    onChange={(e) => setEditingItemName(e.target.value)}
                    style={styles.input}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td style={styles.td}>
                {editingItemId === item.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateItem(item.id)}
                      style={styles.saveButton}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingItemId(null)}
                      style={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingItemId(item.id);
                        setEditingItemName(item.name);
                      }}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;

// Inline CSS styles
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
    fontFamily: 'Roboto, sans-serif',
    backgroundImage: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: '700',
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '100%',
    marginBottom: '10px',
    fontSize: '16px',
    boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  addItemContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#f1f1f1',
    padding: '14px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    fontSize: '16px',
    fontWeight: '600',
  },
  td: {
    padding: '14px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    fontSize: '16px',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
    transition: 'background-color 0.3s ease',
  },
  oddRow: {
    backgroundColor: '#fff',
    transition: 'background-color 0.3s ease',
  },
  saveButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '10px',
    transition: 'background-color 0.3s ease',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
  editButton: {
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginRight: '10px',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
  addButtonHover: {
    backgroundColor: '#218838',
  },
};
