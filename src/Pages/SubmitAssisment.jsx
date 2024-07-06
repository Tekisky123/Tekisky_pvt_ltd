"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const SubmitAssessment = () => {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    console.log("ID:", id);
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire("Error", "Please upload a file.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("assessment", file);

    try {
      Swal.fire({
        title: "Uploading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        `https://tekisky-pvt-ltd-backend.vercel.app/consultancy/submitAssessment/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      Swal.fire("Success", "Assessment submitted successfully!", "success").then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire("Error", "Failed to submit assessment.", "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-10 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Submit Assessment
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="file"
            >
              Upload File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".zip"
              onChange={handleFileChange}
              className="focus:shadow-outline w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 leading-tight text-gray-700 shadow transition duration-200 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="focus:shadow-outline rounded-lg bg-blue-600 px-6 py-3 font-thin text-white transition duration-200 hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
        <div
          className="text-yellow-700 mt-4 items-start space-x-2 rounded-md border-l-4 border-red-500 bg-red-200 p-4"
          role="alert"
        >
          <h4 className="font-bold">Important :</h4>
          <p>
            Please ensure your ZIP file does not contain node modules.
          </p>
          <p>Once you upload, we will review and notify you accordingly.</p>
        </div>
        <p className="mt-6 text-center text-gray-600"></p>
      </div>
    </div>
  );
};

export default SubmitAssessment;
