import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import LoaderSmall from "../Loader/LoaderSmall";



const AddUserModel = ({
  showModal,
  onClose,
  fetchUsers,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });

  const [showLoader, setShowLoader] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    // Validate fullName
    if (!formData.fullName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: "Full Name is required",
      }));
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (
      !formData.mobileNumber.trim() ||
      !mobileRegex.test(formData.mobileNumber)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileNumber: "Please enter a valid 10-digit mobile number",
      }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "https://tekisky-pvt-ltd-backend.vercel.app/user/create",
        formData,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status === 201) {
        Swal.fire("Success!", "User added successfully.", "success");
        onClose();
        setFormData({
          fullName: "",
          mobileNumber: "",
          email: "",
          password: "",
        });
      } else {
        Swal.fire("Error!", "Failed to add user.", "error");
      }
    } catch (error) {
      console.error("Error adding user:", error.response.data.error);
      const errorMessage = error.response.data.error || "Failed to add user.";
      Swal.fire("Error!", errorMessage, "error");
    }
    setShowLoader(false);
    fetchUsers()
  };

  return (
    <>
      {showModal && (
        <div className="model-body fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          {showLoader && <LoaderSmall />}

          <div className="student-model rounded-lg border bg-white bg-white  p-8  shadow-lg dark:bg-dark dark:text-white">
            <h2 className="mb-4 text-2xl font-semibold">Add User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2 block text-body-color text-gray-700 dark:text-body-color-dark">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-md border bg-white px-4  py-2  dark:bg-dark dark:text-white "
                />
                {errors.fullName && (
                  <p className="text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-body-color text-gray-700 dark:text-body-color-dark">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  maxLength={10}
                  className="w-full rounded-md border bg-white px-4  py-2  dark:bg-dark dark:text-white "
                />
                {errors.mobileNumber && (
                  <p className="text-red-500">{errors.mobileNumber}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-body-color text-gray-700 dark:text-body-color-dark">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border bg-white px-4  py-2  dark:bg-dark dark:text-white "
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-body-color text-gray-700 dark:text-body-color-dark">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border bg-white px-4  py-2  dark:bg-dark dark:text-white "
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserModel;
