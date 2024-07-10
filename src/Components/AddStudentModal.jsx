import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import LoaderSmall from "../Loader/LoaderSmall";
import baseURL from "../Common/Api"


const AddStudentModal = ({ showModal, onClose,fetchStudents }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    education: "",
    companyName: "",
    designation: "",
  });
  const [students, setStudents] = useState([]);
  const [showLoader, setShowLoader] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [token, setToken] = useState("");
  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    try {
      const response = await axios.post(
        `${baseURL}selectedStudent/create`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 201) {
        // Show success message
        Swal.fire("Success!", "Student added successfully.", "success");
        // Close modal
        onClose();
        // Reset form data
        setFormData({
          name: "",
          gender: "",
          education: "",
          companyName: "",
          designation: "",
        });
        // Call the fetchStudents function passed from Dashboard component
        fetchStudents();
      } else {
        Swal.fire("Error!", "Failed to add student.", "error");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      Swal.fire("Error!", "Failed to add student.", "error");
    }
    setShowLoader(false);
    fetchStudents();
  };
  
  

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 model-body ">
           {showLoader && <LoaderSmall />}
          <div className="rounded-lg bg-white p-8 shadow-lg student-model  bg-white  dark:bg-dark dark:text-white border">
            <h2 className="mb-4 text-2xl font-semibold">Add Student</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2 block text-gray-700 text-body-color dark:text-body-color-dark ">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2   dark:bg-dark dark:text-white "
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-gray-700 text-body-color dark:text-body-color-dark">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2   dark:bg-dark dark:text-white "
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-gray-700 text-body-color dark:text-body-color-dark">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2   dark:bg-dark dark:text-white "
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-gray-700 text-body-color dark:text-body-color-dark">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2   dark:bg-dark dark:text-white "
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-gray-700 text-body-color dark:text-body-color-dark">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2   dark:bg-dark dark:text-white "
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStudentModal;
