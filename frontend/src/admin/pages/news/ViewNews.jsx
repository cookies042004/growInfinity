import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFetchData } from "../../../hooks/useFetchData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ViewNews = () => {
  document.title = "View News";
  const apiUrl = `${process.env.BASE_URL}/api/v1/news`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const news = data.news;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (newsId) => {
    try {
      const deleteUrl = apiUrl + `/${newsId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete news");
      }
    } catch (err) {
      console.log(err);
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
            <h2 className="text-2xl font-bold p-2 sm:text-left text-blue-600">
              View News
            </h2>
            <div className="flex gap-4">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={refetch}
                className="hover:bg-blue-700 transition-all"
                sx={{ textTransform: "none" }}
              >
                Refresh
              </Button>
            </div>
          </div>

          <Paper sx={{ marginTop: "20px" }}>
            {loading && (
              <div className="flex justify-center py-10">
                <CircularProgress size="large" color="secondary" />
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 py-4">
                <Typography variant="h6">Error: {error}</Typography>
              </div>
            )}
            {news && (
              <>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow className="bg-gray-100 border-b border-gray-300">
                        <TableCell className="px-4 py-3 font-semibold">
                          S No.
                        </TableCell>
                        <TableCell className="px-4 py-3 font-semibold">
                          Title
                        </TableCell>
                        <TableCell className="px-4 py-3 font-semibold">
                          URL
                        </TableCell>
                        <TableCell className="px-4 py-3 font-semibold text-center">
                          Image
                        </TableCell>
                        <TableCell className="px-4 py-3 font-semibold">
                          Date
                        </TableCell>
                        <TableCell className="px-4 py-3 font-semibold text-center">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {news
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((article, i) => (
                          <TableRow
                            key={article._id}
                            className="border-b border-gray-200 hover:bg-gray-100 transition-all"
                          >
                            <TableCell className="px-4 py-3">{i + 1}</TableCell>
                            <TableCell className="px-4 py-3">
                              {article.title.slice(0, 20) + "..."}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              {article.url}
                            </TableCell>
                            <TableCell className="px-4 py-3 flex justify-center">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="h-24 w-36 object-cover rounded-lg shadow-md"
                              />
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              {new Date(article.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="px-4 py-3 flex gap-2 justify-center">
                              <Link to={`/admin/update-news/${article._id}`}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="primary"
                                  startIcon={<EditIcon />}
                                  className="hover:border-blue-600 hover:text-blue-600 transition-all"
                                  sx={{ textTransform: "none" }}
                                >
                                  Edit
                                </Button>
                              </Link>
                              <Button
                                onClick={() => handleDelete(article._id)}
                                variant="contained"
                                size="small"
                                color="error"
                                startIcon={<DeleteIcon />}
                                className="hover:bg-red-700 transition-all"
                                sx={{ textTransform: "none" }}
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
                  count={news.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
