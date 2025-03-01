import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { useFetchData } from "../../../hooks/useFetchData";

export const ViewEvents = () => {
  document.title = "View Events";
  const apiUrl = `${process.env.BASE_URL}/api/v1/events`;

  const { data, loading, error, refetch } = useFetchData(apiUrl); // Use the custom hook

  const events = data?.events || [];

  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Handle pagination change (page number)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle delete event
  const handleDelete = async (eventId) => {
    try {
      const deleteUrl = apiUrl + `/${eventId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch(); // Refetch data after deletion
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete event");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
      <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200 mt-20">
        <div className="flex items-center justify-between pb-6 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-blue-600 text-center sm:text-left">
            View Events
          </h2>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={refetch}
            className="capitalize"
          >
            Refresh
          </Button>
        </div>

        <Paper className="mt-5">
          {loading && (
            <div className="flex justify-center py-10">
              <CircularProgress size="large" color="secondary" />
            </div>
          )}
          {error && <Typography className="text-red-500 text-center">{error}</Typography>}

          {events && (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="bg-blue-100">
                      <TableCell className="font-semibold">S No.</TableCell>
                      <TableCell className="font-semibold">Title</TableCell>
                      <TableCell className="font-semibold">Description</TableCell>
                      <TableCell className="font-semibold">Images</TableCell>
                      <TableCell className="font-semibold">Date</TableCell>
                      <TableCell className="font-semibold text-center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event, i) => (
                      <TableRow key={event._id} className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{event.title.length > 20 ? event.title.slice(0, 20) + "..." : event.title}</TableCell>
                        <TableCell>{event.description.length > 20 ? event.description.slice(0, 20) + "..." : event.description}</TableCell>
                        <TableCell>
                          <Box className="flex flex-wrap gap-2">
                            {event.image.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Event ${index + 1}`}
                                className="h-24 w-36 object-cover rounded-lg shadow-md"
                              />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>{new Date(event.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            onClick={() => handleDelete(event._id)}
                            endIcon={<DeleteIcon />}
                            variant="contained"
                            size="small"
                            color="error"
                            className="capitalize bg-red-600 hover:bg-red-500"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={events.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="text-sm"
              />
            </>
          )}
        </Paper>
      </div>
    </div>
    </>
  );
};
