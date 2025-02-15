import React from "react";
import { useFetchData } from "../../hooks/useFetchData";
import { Layout } from "../../components/Layout";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import "./Brochure.css";

export const Brochure = () => {

  console.log("process.env.BASE_URL is", process.env.BASE_URL);

  const apiUrl = `${process.env.BASE_URL}/api/v1/brochures`;
  console.log("apiUrl is", apiUrl);
  const { data, loading, error } = useFetchData(apiUrl);
  const brochures = data?.brochure || [];

  const images = [];
  const pdfs = [];

  // Generate image and PDF URLs for each brochure
  if (brochures.length > 0) {
    brochures.forEach((brochure) => {
      let realImage = `${process.env.BASE_URL}/${brochure.image}`;
      images.push(realImage);

      // Generate the correct PDF URL
      let realPdf = `${process.env.BASE_URL}/${brochure.pdf}`;
      pdfs.push(realPdf);
    });
  }

  console.log("brochures are", brochures);

  const handleDownload = (pdfUrl) => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.target = "_blank";  // Open in new tab (not necessary for download)
      link.download = pdfUrl.split("/").pop();  // Set the filename to the last part of the URL
      document.body.appendChild(link);
      link.click();  // Programmatically click the link to trigger the download
      document.body.removeChild(link);  // Remove the link after the download is triggered
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="brochurebanner flex flex-col items-center justify-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center mt-10 lg:mt-20 flex justify-center items-center">
            <h1 className="font-dmsans font-medium text-white text-3xl lg:text-5xl">
              Brochure
            </h1>
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-roboto text-3xl lg:text-4xl font-medium py-8 text-center">
          Our Brochures
        </h1>

        <div className="max-w-[1280px] mx-auto px-6">
          {loading && (
            <div className="flex justify-center">
              <CircularProgr ess />
            </div>
          )}
          {error && <p className="text-center text-red-500">Error: {error.message}</p>}

          {brochures.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {brochures.map((brochure, index) => (
                <div
                  key={brochure._id}
                  className="relative group border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image Preview */}
                  <img
                    src={`${process.env.BASE_URL}/${brochure.image}`}
                    alt={brochure.name}
                    className="h-64 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay for Download Button */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleDownload(pdfs[index])} // Pass the PDF URL
                      className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      <DownloadIcon />
                      Download PDF
                    </button>
                  </div>

                  {/* Brochure Title */}
                  <h4 className="text-center text-xl font-semibold py-3">
                    {brochure.name}
                  </h4>
                </div>  
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No brochures available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};
