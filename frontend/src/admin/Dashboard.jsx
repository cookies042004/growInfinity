import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useFetchData } from "../hooks/useFetchData"; // Import your hook
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { AdminLayout } from "./components/AdminLayout";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  useEffect(() => {
    document.title = "Admin Dashboard";
    const token = Cookies.get("adminToken");
    if (token) {
      toast.success("Login Successfully!");
    }
  }, []);

  const apiUrl = `${process.env.BASE_URL}/api/v1/contact`;

  const { data, loading, error, refetch } = useFetchData(apiUrl); // Use the custom hook

  const contacts = data.contact;

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

  const handleDelete = async (contactId) => {
    try {
      const deleteUrl = apiUrl + `/${contactId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch(); // Refetch data after deletion
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while deleting");
    }
  };

  const apiUrl1 = `${process.env.BASE_URL}/api/v1/property/total-properties`;
  const apiUrl2 = `${process.env.BASE_URL}/api/v1/property-enquiry/total-enquiry`;
  const apiUrl3 = `${process.env.BASE_URL}/api/v1/news/total-news`;

  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError,
    refetch: propertyRefetch,
  } = useFetchData(apiUrl1);

  const {
    data: propertyEnquiryData,
    loading: propertyEnquiryLoading,
    error: propertyEnquiryError,
    refetch: propertyEnquiryRefetch,
  } = useFetchData(apiUrl2);

  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
    refetch: newsRefetch,
  } = useFetchData(apiUrl3);

  const totalProperties = propertyData.totalProperties;
  const totalNews = newsData.totalNews;
  const totalPropertyEnquiry = propertyEnquiryData.totalPropertyEnquiry;

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-6 sm:ml-64 bg-gray-100 min-h-screen">
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Property Listed",
              count: totalProperties,
              color: "from-blue-500 to-indigo-500",
              link: "/admin/view-property",
            },
            {
              title: "Total Contact Enquiries",
              count: contacts?.length,
              color: "from-green-500 to-teal-500",
              link: "/admin/view-contact",
            },
            {
              title: "Total Property Enquiries",
              count: totalPropertyEnquiry,
              color: "from-purple-500 to-pink-500",
              link: "/admin/view-property-enquiry",
            },
            {
              title: "Total News",
              count: totalNews,
              color: "from-yellow-500 to-orange-500",
              link: "/admin/view-news",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center h-[180px] bg-white shadow-lg rounded-xl border border-gray-200 transition-transform hover:scale-105 duration-300"
            >
              <div
                className={`w-full h-1 rounded-t-xl bg-gradient-to-r ${item.color}`}
              />
              <div className="flex flex-col items-center gap-2 p-6">
                <h5 className="text-lg font-semibold text-gray-700">
                  {item.title}
                </h5>
                <p className={`text-2xl font-bold ${item.color.split(" ")[1]}`}>
                  {item.count}
                </p>
                <Link to={item.link}>
                  <button
                    className={`px-4 py-2 mt-3 rounded-lg text-sm font-medium bg-gradient-to-r ${item.color} text-white hover:shadow-lg transition duration-300`}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white shadow-xl rounded-lg border border-gray-300 p-6">
          <h2 className="text-2xl font-bold text-blue-600 text-center sm:text-left">
            View Contact Enquiries
          </h2>

          <Paper sx={{ marginTop: "20px" }}>
            {loading && (
              <div className="flex justify-center py-10">
                <CircularProgress size="large" color="secondary" />
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 py-4">
                <p>{error}</p>
              </div>
            )}

            {contacts && (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow className="bg-blue-100">
                        {[
                          "S No.",
                          "Name",
                          "Email",
                          "Phone",
                          "Message",
                          "Date",
                          "Action",
                        ].map((head) => (
                          <TableCell
                            key={head}
                            className="font-semibold text-gray-800"
                          >
                            {head}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contacts
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((contact, i) => (
                          <TableRow
                            key={contact._id}
                            className={`${
                              i % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-200`}
                          >
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>{contact.message}</TableCell>
                            <TableCell>
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => handleDelete(contact._id)}
                                endIcon={<DeleteIcon />}
                                variant="contained"
                                size="small"
                                color="error"
                                sx={{
                                  textTransform: "none",
                                  backgroundColor: "#ff4d4f",
                                  "&:hover": { backgroundColor: "#ff7875" },
                                }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={contacts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    ".MuiTablePagination-toolbar": { justifyContent: "center" },
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                      { fontSize: "0.9rem" },
                  }}
                />
              </>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
