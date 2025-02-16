import React, { useState } from "react";
import { Box, Card, CardContent, Button, Typography, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFetchData } from "../../../hooks/useFetchData";

export const ViewProperty = () => {
  document.title = "View Property";
  const apiUrl = `${process.env.BASE_URL}/api/v1/property`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const properties = data?.properties || [];

  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleDelete = async (propertyId) => {
    try {
      const deleteUrl = `${apiUrl}/${propertyId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch();
        selectedProperty && setSelectedProperty(null);
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", fontSize: "2rem", fontFamily: "sans-serif", fontWeight: "bold" }}>
        View Property
      </div>
      <div style={{ padding: "20px", marginTop: "60px", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {loading && <Typography>Loading properties...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}
        {properties.length === 0 && !loading && <Typography>No properties found</Typography>}

        {properties.map((property) => (
          <Card
            key={property._id}
            style={{
              width: "300px",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#fff",
            }}
            onClick={() => setSelectedProperty(property)}
          >
            <img
              src={property.image?.[0] ? property.image?.[0] : "/placeholder.jpg"}
              alt={property.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>{property.name}</Typography>
              <Typography variant="body2" color="textSecondary">By {property.location}</Typography>
              <Typography variant="body2" color="primary">₹ {property.price}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for Detailed View */}
      {selectedProperty && (
        <Modal open={!!selectedProperty} onClose={() => setSelectedProperty(null)}>
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "600px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "10px" }}>{selectedProperty.name}</Typography>
            <img
              src={selectedProperty.image?.[0] ? selectedProperty.image?.[0] : "/placeholder.jpg"}
              alt={selectedProperty.name}
              style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }}
            />
            <Typography variant="body1" style={{ marginTop: "10px" }}>Category: {selectedProperty.category?.name}</Typography>
            <Typography variant="body1">Builder: {selectedProperty.builder}</Typography>
            <Typography variant="body1">Location: {selectedProperty.location}</Typography>
            <Typography variant="body1">Size: {selectedProperty.size} sqft</Typography>
            <Typography variant="body1">Furnish Type: {selectedProperty.furnishType}</Typography>
            <Typography variant="body1">Unit: {selectedProperty.unit}</Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>Price: ₹ {selectedProperty.price}</Typography>
            
            <Box style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
              <Link to={`/admin/update-property/${selectedProperty._id}`}>
                <Button variant="contained" color="primary" startIcon={<EditIcon />}>Edit</Button>
              </Link>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(selectedProperty._id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};
