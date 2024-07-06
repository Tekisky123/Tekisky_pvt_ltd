import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import assignmentsData from "../Common/assignmentsData.json";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAlert } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa";

const AssignAssisment = () => {
  const [formData, setFormData] = useState({
    customTask: "",
    assessmentTask: "",
    assessmentDeadline: "",
    assessmentDescription: "",
    selectedAssessmentCategory: null,
  });

  const [applicantInfo, setApplicantInfo] = useState(null); // State to store applicant info
  const [token, setToken] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  useEffect(() => {
    fetchApplicantDetails(id); // Fetch applicant details on component mount
  }, [id]);

  const fetchApplicantDetails = async (applicantId) => {
    try {
      const response = await axios.get(
        `https://tekisky-pvt-ltd-backend.vercel.app/consultancy/getoneuploadresume/${applicantId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const { fullName, yearsOfExperience, skills } = response.data;

      // Split skills string into array
      const parsedSkills = skills[0].split(",");

      const info = {
        fullName,
        yearsOfExperience,
        skills: parsedSkills,
      };

      setApplicantInfo(info); // Set applicant info to display
    } catch (error) {
      console.error("Error fetching applicant details:", error);
    }
  };

  const handleCheckboxChange = (category) => {
    setFormData({
      ...formData,
      selectedAssessmentCategory:
        category === formData.selectedAssessmentCategory ? null : category,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "customTask") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      const selectedAssignments =
        assignmentsData[formData.selectedAssessmentCategory];
      const selectedAssignment = selectedAssignments.find(
        (assignment) => assignment.title === value
      );
      const selectedDescription = selectedAssignment
        ? selectedAssignment.description
        : "";

      setFormData({
        ...formData,
        [name]: value,
        assessmentDescription: selectedDescription,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading",
      text: "Assigning assignment...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post(
        `https://tekisky-pvt-ltd-backend.vercel.app/consultancy/assignAssessment/${id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      Swal.fire("Success", response.data.message, "success").then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "An error occurred",
        "error"
      );
    }
  };

  return (
    <div className="container mx-auto mb-20 mt-40 p-4">
      <h1 className="mb-4 text-2xl font-bold">Assessment</h1>
      <div className="col-span-full mb-10">
        <h2 className="mb-4 block text-lg text-black dark:text-white">
          Candidate Information
        </h2>
        <div className="text-yellow-700 mb-4 flex items-start space-x-2 rounded-md border-l-4 border-yellow bg-red-100 p-4">
          <IoMdAlert className="mt-3 h-8 w-8 flex-shrink-0 text-red-600" />
          <div>
            {applicantInfo ? (
              <>
                <h3 className=" font-medium">
                  <span className="font-bold">Full Name:</span>{" "}
                  {applicantInfo.fullName}
                </h3>
                <h3 className=" font-medium">
                  <span className="font-bold">Years of Experience:</span>{" "}
                  {applicantInfo.yearsOfExperience}
                </h3>
                <h3 className=" font-medium">
                  <span className="font-bold">Skills:</span>{" "}
                  {applicantInfo.skills.join(", ")}
                </h3>
              </>
            ) : (
              <p className="text-sm font-medium">
                Loading applicant information...
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Object.keys(assignmentsData).map((category) => (
          <div
            key={category}
            className={`duration-400 relative cursor-pointer rounded-lg bg-white p-4 shadow transition-all ${
              category === formData.selectedAssessmentCategory
                ? "border-2 border-green-500"
                : "border-2 border-transparent"
            }`}
            onClick={() => handleCheckboxChange(category)}
            style={{ minWidth: "0", flexBasis: "0" }}
          >
            {category === formData.selectedAssessmentCategory && (
              <FaClipboardCheck className="absolute right-2 top-2 h-6 w-6 text-green-500" />
            )}
            <label className="ml-2" htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-4 max-w-md">
        <div className="mb-4">
          <label htmlFor="assessmentTask" className="mb-2 block">
            Assessment Task:
          </label>
          <div className="flex">
            <select
              id="assessmentTask"
              name="assessmentTask"
              className="mb-5 w-full border p-2"
              value={formData.assessmentTask}
              onChange={handleChange}
            >
              <option value="">Select Task</option>
              {formData.selectedAssessmentCategory &&
                assignmentsData[formData.selectedAssessmentCategory].map(
                  (assignment, index) => (
                    <option
                      key={index}
                      value={assignment.title}
                      className="m-5 py-5"
                    >
                      {assignment.title}
                    </option>
                  )
                )}
            </select>
          </div>
          <textarea
            id="assessmentDescription"
            name="assessmentDescription"
            className="w-full border p-2"
            placeholder="Assessment Description"
            onChange={handleChange}
            style={{ height: "200px" }}
            value={formData.assessmentDescription}
          />
          <input
            type="text"
            id="customTask"
            name="customTask"
            className="w-full border p-2"
            placeholder="Custom Task"
            value={formData.customTask}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="assessmentDeadline" className="mb-2 block">
            Assessment Deadline:
          </label>
          <input
            type="date"
            id="assessmentDeadline"
            name="assessmentDeadline"
            className="w-full border p-2"
            min={new Date().toISOString().split("T")[0]}
            value={formData.assessmentDeadline}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AssignAssisment;
