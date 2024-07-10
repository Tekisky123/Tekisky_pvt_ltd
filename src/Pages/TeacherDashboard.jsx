import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import baseURL from "../Common/Api";
import { FaFileDownload, FaShareAltSquare } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";

const TeacherDashboard = () => {
  const { userId } = useParams();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      const collegeName = localStorage.getItem("collegeName");

      if (!token || !collegeName || !userId) {
        setError("Missing authentication, college, or user information");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${baseURL}user/teacher/applications/${userId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setApplications(response.data.applications);
        setFilteredApplications(response.data.applications);
      } catch (err) {
        setError(
          err.response ? err.response.data.error : "Error fetching data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter((application) =>
          application.fullName
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
      );
    }
    setCurrentPage(1); // Reset to first page after search
  };

  const openModal = (application) => {
    setSelectedApplication(application);
  };

  const closeModal = () => {
    setSelectedApplication(null);
  };

  const handleShare = (application) => {
    const shareData = {
      title: "Application Details",
      text: `Check out this application from ${application.fullName}`,
      url: `${window.location.origin}/singleApplication/${application._id}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const currentApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-40 mb-20 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>

      <div className="mb-4 w-80">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mobile no.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Application Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentApplications.map((application, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.mobileNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={application.resumeUrl}>
                    <FaFileDownload className="text-blue-600 text-3xl" />
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-2"
                    onClick={() => openModal(application)}
                  >
                    <FaFilePen className="text-blue-600 text-3xl" />
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleShare(application)}
                  >
                    <FaShareAltSquare className="text-blue-600 text-3xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="md:hidden">
        {currentApplications.map((application, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{application.fullName}</h2>
              <button
                className="text-blue-600 hover:text-blue-900"
                onClick={() => handleShare(application)}
              >
                <FaShareAltSquare className="text-blue-600 text-3xl" />
              </button>
            </div>
            <div className="mb-2">
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {application.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Mobile no.:</strong> {application.mobileNumber}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {application.status}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <a href={application.resumeUrl}>
                <FaFileDownload className="text-blue-600 text-3xl" />
              </a>
              <button
                className="text-blue-600 hover:text-blue-900"
                onClick={() => openModal(application)}
              >
                <FaFilePen className="text-blue-600 text-3xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Application Details
                    </h3>
                    <div className="mt-2">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y text-start divide-gray-200">
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Name:
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.fullName}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Email:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.email}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Mobile Number:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.mobileNumber}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Skills:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.skills.join(", ")}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Tenth Percentage:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.tenthPercentage}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Twelth Percentage:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.twelthPercentage}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Twelth College:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.twelthCollegeName}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Diploma Percentage:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.diplomaPercentage}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Diploma College:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.diplomaCollegeName}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Degree Name:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.degreeName}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Degree Percentage:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.degreePercentage}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Degree College:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.degreeCollegeName}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Year Of Passing:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.yearOfPassing}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Experience :
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.yearsOfExperience}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Working Status :
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.workStatus}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              English Speaking :
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.englishSpeaking}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4  py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              English Writing :
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.englishWriting}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Mock Interview Date:
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              {selectedApplication.mockInterviewDate}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Resume:
                            </td>
                            <td className="px-4  py-4 whitespace-nowrap text-sm text-gray-500">
                              <a href={selectedApplication.resumeUrl}>resume</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
