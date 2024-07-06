import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import fullStackSkills from "../Components/fullStackSkills";
import Loader from "../Loader/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";

const ConsultancyForm = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedResumeName, setSelectedResumeName] = useState("");


  const handleFileSelect = (event) => {
    const selectedFile = event.currentTarget.files[0];
    setSelectedResumeName(selectedFile.name);
    formik.setFieldValue("resume", selectedFile);
  };

  const validationSchema = Yup.object({
    employeeNumber: Yup.string()
      .matches(/^\d{4,5}$/, "Employee number must be a 4 or 5-digit number.")
      .nullable(),
    fullName: Yup.string()
      .max(50, "Full name must be less than 50 characters.")
      .matches(/^[a-zA-Z\s]*$/, "Full name must contain only letters.")
      .required("Full name is required"),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be a 10-digit number.")
      .required("Mobile number is required"),
    tenthPercentage: Yup.number()
      .max(100, "Please enter a valid percentage (up to 100).")
      .required("10th Percentage is required"),
    twelthPercentage: Yup.number()
      .max(100, "Please enter a valid percentage (up to 100).")
      .nullable(),
    twelthCollegeName: Yup.string()
      .max(50, "College name must be less than 50 characters.")
      .nullable(),
    diplomaPercentage: Yup.number()
      .max(100, "Please enter a valid percentage (up to 100).")
      .nullable(),
    diplomaCollegeName: Yup.string()
      .max(50, "College name must be less than 50 characters.")
      .nullable(),
    degreePercentage: Yup.number()
      .max(100, "Please enter a valid percentage (up to 100).")
      .nullable(),
    degreeName: Yup.string()
      .max(20, "Degree name must be less than 20 characters.")
      .nullable(),
    degreeCollegeName: Yup.string()
      .max(50, "College name must be less than 50 characters.")
      .nullable(),
    yearOfPassing: Yup.string().required("Year of passing is required"),
    skills: Yup.array().required("Skills are required"),
    workStatus: Yup.string().required("Work status is required"),
    yearsOfExperience: Yup.string().nullable(),
    referredBy: Yup.string().nullable(),
    resume: Yup.mixed().required("Resume is required"),
    extraInformation: Yup.string().nullable(),
    englishSpeaking: Yup.string().required(
      "English speaking level is required"
    ),
    englishWriting: Yup.string().required("English writing level is required"),
    mockInterviewDate: Yup.date().required("Mock interview date is required"),
    mockInterviewTime: Yup.string().required("Mock interview time is required"),
  });

  const formik = useFormik({
    initialValues: {
      employeeNumber: "",
      fullName: "",
      email: "",
      mobileNumber: "",
      tenthPercentage: "",
      twelthPercentage: "",
      twelthCollegeName: "",
      diplomaPercentage: "",
      diplomaCollegeName: "",
      degreePercentage: "",
      degreeName: "",
      degreeCollegeName: "",
      yearOfPassing: "",
      skills: [],
      workStatus: "",
      yearsOfExperience: "",
      referredBy: "",
      resume: "",
      extraInformation: "",
      englishSpeaking: "",
      englishWriting: "",
      mockInterviewDate: "",
      mockInterviewTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const requiredFields = [
        "fullName",
        "email",
        "mobileNumber",
        "tenthPercentage",
        "workStatus",
        "yearOfPassing",
        "skills",
        "englishSpeaking",
        "englishWriting",
        "mockInterviewDate",
        "mockInterviewTime",
        "resume",
      ];
      const missingFields = requiredFields.filter((field) => !values[field]);
      if (missingFields.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Missing Fields",
          text: `Please fill in the following required fields: ${missingFields.join(
            ", "
          )}.`,
        });
        return;
      }

      setLoading(true);
      try {
        const formDataToSend = new FormData();
        for (const key in values) {
          if (key === "skills") {
            formDataToSend.append(key, values[key].join(","));
          } else if (key === "resume" && values[key]) {
            formDataToSend.append(key, values[key]);
          } else {
            formDataToSend.append(key, values[key]);
          }
        }
        await axios.post(
          "https://tekisky-pvt-ltd-backend.vercel.app/consultancy/uploadResume",
          formDataToSend
        );
        localStorage.removeItem("formData");
        Swal.fire({
          icon: "success",
          title: "Your Form Submitted Successfully!",
          text: "We have received your resume. We will contact you via email.",
          showConfirmButton: false,
          timer: 4000,
        }).then(() => {
          window.location.href = "/"; // Redirect using window.location.href
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Something Went Wrong!",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterSkills(value);
  };

  const filterSkills = (value) => {
    if (value.trim() === "") {
      setFilteredSkills([]);
    } else {
      const filtered = fullStackSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
    }
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    setSearchTerm("");
    setFilteredSkills([]);
    formik.setFieldValue("skills", [...selectedSkills, skill]);
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    formik.setFieldValue(
      "skills",
      selectedSkills.filter((s) => s !== skill)
    );
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 30; i--) {
      years.push(i.toString());
    }
    return years;
  };
  const years = generateYears();

  return (
    <div className="container flex flex-col justify-center lg:flex-row ">
      <form
        className="container mx-auto mb-5 mt-44  lg:w-1/2 "
        onSubmit={formik.handleSubmit}
      >
        <div className=""></div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className={`w-full ${"mx-auto text-center"} mb-20`}>
              <h2 className="mb-16 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] mt-8">
                Upload Your Resume
              </h2>
              <p className="text-start leading-relaxed text-body-color md:text-lg">
                We invite all Professionals seeking exciting career
                opportunities to submit their resumes here. Take the first step
                towards your dream job by uploading your resume using the form
                below. Our dedicated team will review your submission and
                consider you for suitable positions within our company. Don't
                miss out on the chance to join a dynamic and innovative team at
                Tekisky Pvt Ltd. Submit your resume now and embark on a
                rewarding career journey with us!
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="employeeNumber"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  Tekisky Employee Number{" "}
                  {/* <span className="text-red-500">*</span>{" "} */}
                  <p className="text-gray-600">
                    (Leave it blank if you are not an Employee of Tekisky)
                  </p>
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="employeeNumber"
                    name="employeeNumber"
                    placeholder="Enter Your Emp ID"
                    maxLength={6}
                    min="0"
                    value={formik.values.employeeNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full rounded-md border-0 px-3 py-1.5  text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
                  {formik.touched.employeeNumber &&
                  formik.errors.employeeNumber ? (
                    <div className="text-red-500">
                      {formik.errors.employeeNumber}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  Full Name <span className="text-red-500">*</span>{" "}
                  <p className="text-gray-600">(As Per Your Aadhar)</p>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter Your Full Name"
                    maxLength={50}
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="text-red-500">{formik.errors.fullName}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  Email Address <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  Mobile Number <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Enter Your Mobile Number"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
                  />
                  {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <div className="text-red-500">
                      {formik.errors.mobileNumber}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className=" col-span-full sm:col-start-1">
                <label
                  htmlFor="10th"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  10th Percentage <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="tenthPercentage"
                    name="tenthPercentage"
                    placeholder="Enter Your 10th Percentage"
                    value={formik.values.tenthPercentage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
                  />
                  {formik.touched.tenthPercentage &&
                  formik.errors.tenthPercentage ? (
                    <div className="text-red-500">
                      {formik.errors.tenthPercentage}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className=" col-span-full">
                <label
                  htmlFor="twelthPercentage"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  12th Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="twelthPercentage"
                    name="twelthPercentage"
                    placeholder="Enter Your 12th Percentage"
                    value={formik.values.twelthPercentage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
                  />
                  {formik.touched.twelthPercentage &&
                  formik.errors.twelthPercentage ? (
                    <div className="text-red-500">
                      {formik.errors.twelthPercentage}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="twelthCollegeName"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  12th College Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="twelthCollegeName"
                    name="twelthCollegeName"
                    placeholder="Enter Your 12th College Name"
                    value={formik.values.twelthCollegeName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
                  />
                  {formik.touched.twelthCollegeName &&
                  formik.errors.twelthCollegeName ? (
                    <div className="text-red-500">
                      {formik.errors.twelthCollegeName}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="consultancy-container  ">
          <div className=" col-span-full  mb-10 ">
            <label
              htmlFor="diplomaPercentage"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Diploma Percentage
            </label>
            <div className="mt-2">
              <input
                type="number"
                id="diplomaPercentage"
                name="diplomaPercentage"
                placeholder="Enter Your Diploma Percentage"
                value={formik.values.diplomaPercentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
              />
              {formik.touched.diplomaPercentage &&
              formik.errors.diplomaPercentage ? (
                <div className="text-red-500">
                  {formik.errors.diplomaPercentage}
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-span-full mb-10 ">
            <label
              htmlFor="diplomaCollegeName"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Diploma College Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="diplomaCollegeName"
                name="diplomaCollegeName"
                placeholder="Enter Your Diploma College Name"
                value={formik.values.diplomaCollegeName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
              />
              {formik.touched.diplomaCollegeName &&
              formik.errors.diplomaCollegeName ? (
                <div className="text-red-500">
                  {formik.errors.diplomaCollegeName}
                </div>
              ) : null}
            </div>
          </div>

          <div className=" col-span-full  mb-10 ">
            <label
              htmlFor="degreeName"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Name of Degree
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="degreeName"
                name="degreeName"
                placeholder="Enter Your Degree Name"
                value={formik.values.degreeName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
              />
              {formik.touched.degreeName && formik.errors.degreeName ? (
                <div className="text-red-500">{formik.errors.degreeName}</div>
              ) : null}
            </div>
          </div>

          <div className=" col-span-full  mb-10 ">
            <label
              htmlFor="degreePercentage"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Degree Percentage
            </label>
            <div className="mt-2">
              <input
                type="number"
                id="degreePercentage"
                name="degreePercentage"
                placeholder="Enter Your Degree Percentage"
                value={formik.values.degreePercentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
              />
              {formik.touched.degreePercentage &&
              formik.errors.degreePercentage ? (
                <div className="text-red-500">
                  {formik.errors.degreePercentage}
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-span-full mb-10 ">
            <label
              htmlFor="degreeCollegeName"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Degree College/University Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="degreeCollegeName"
                name="degreeCollegeName"
                placeholder="Enter Your Degree College Name"
                value={formik.values.degreeCollegeName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
              />
              {formik.touched.degreeCollegeName &&
              formik.errors.degreeCollegeName ? (
                <div className="text-red-500">
                  {formik.errors.degreeCollegeName}
                </div>
              ) : null}
            </div>
          </div>

          <div className=" col-span-full  mb-10 ">
            <label
              htmlFor="yearOfPassing"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Year of Passing <span className="text-red-500">*</span>{" "}
            </label>
            <div className="mt-2">
              <select
                id="yearOfPassing"
                name="yearOfPassing"
                value={formik.values.yearOfPassing}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 px-3  py-2.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {formik.touched.yearOfPassing && formik.errors.yearOfPassing ? (
                <div className="text-red-500">
                  {formik.errors.yearOfPassing}
                </div>
              ) : null}
              <datalist id="yearList">
                {years.map((year) => (
                  <option key={year} value={year} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="skills"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Skills <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="skills"
                name="skills"
                placeholder="Search and add skills"
                value={searchTerm}
                onChange={handleSkillChange}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
              />
              {formik.touched.skills &&
              typeof formik.errors.skills === "string" ? (
                <div className="text-red-500">{formik.errors.skills}</div>
              ) : null}

              <div className="flex flex-wrap items-center gap-2 mt-4">
                {selectedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
                  >
                    {skill}
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full text-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => handleSkillRemove(skill)}
                    >
                      <span className="sr-only">Remove skill</span>
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 8.586l3.95-3.95a1 1 0 011.414 1.414L11.414 10l3.95 3.95a1 1 0 01-1.414 1.414L10 11.414l-3.95 3.95a1 1 0 01-1.414-1.414L8.586 10l-3.95-3.95A1 1 0 016.05 4.636L10 8.586z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              {filteredSkills.length > 0 && (
                <ul className="mt-2 max-h-40 overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredSkills.map((skill, index) => (
                    <li
                      key={index}
                      className="cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                      onClick={() => handleSkillSelect(skill)}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="col-span-full mb-10 mt-5">
            <label className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white">
              Work Status <span className="text-red-500">*</span>{" "}
            </label>
            <div className="mt-2 flex">
              <div className="mb-4 mr-4">
                <input
                  type="radio"
                  id="experience"
                  name="workStatus"
                  value="Experience"
                  checked={formik.values.workStatus === "Experience"}
                  onChange={formik.handleChange}
                  className="sr-only"
                />
                <label
                  htmlFor="experience"
                  className={`block cursor-pointer rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-transform duration-300 ease-in-out  ${
                    formik.values.workStatus === "Experience"
                      ? "scale-105 transform border-4 border-green-500"
                      : ""
                  }`}
                >
                  <h3 className="mb-2 text-xl font-semibold">Experienced</h3>
                  <p className="text-sm text-gray-700 ">
                    I have work experience (excluding internships)
                  </p>
                </label>
              </div>

              <div className="mb-4 mr-4">
                <input
                  type="radio"
                  id="fresher"
                  name="workStatus"
                  value="Fresher"
                  checked={formik.values.workStatus === "Fresher"}
                  onChange={formik.handleChange}
                  className="sr-only"
                />
                <label
                  htmlFor="fresher"
                  className={`block cursor-pointer rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-transform duration-300 ease-in-out ${
                    formik.values.workStatus === "Fresher"
                      ? "scale-105 transform border-4 border-green-500"
                      : ""
                  }`}
                >
                  <h4 className="mb-2 text-xl font-semibold">Fresher</h4>
                  <p className="text-sm text-gray-700">
                    I am a student/ Haven&apos;t worked after graduation
                  </p>
                </label>
              </div>
            </div>
            {formik.errors.workStatus && formik.touched.workStatus && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.workStatus}
              </p>
            )}
          </div>

          {formik.values.workStatus === "Experience" && (
            <div className=" col-span-full  mb-10 ">
              <label
                htmlFor="yearsOfExperience"
                className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
              >
                Years of Experience <span className="text-red-500">*</span>{" "}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  placeholder="Enter Year of Experience (Ex: 1 Year , 2 Year..) "
                  value={formik.values.yearsOfExperience}
                  maxLength={10}
                  onChange={formik.handleChange}
                  className="block w-full rounded-md border-0 px-3  py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                />
                {formik.errors.yearsOfExperience && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.yearsOfExperience}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="col-span-full mb-10">
            <label className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white">
              Extra Information (any queries and questions)
            </label>
            <div className="mt-2">
              <textarea
                id="extraInformation"
                name="extraInformation"
                placeholder="Enter any queries or questions you have"
                value={formik.values.extraInformation}
                onChange={formik.handleChange}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
              />
              {formik.errors.extraInformation && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.extraInformation}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-full mb-10">
            <label className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white">
              How good are you with speaking English?
              <span className="text-red-500">*</span>{" "}
            </label>
            <div className="mt-2">
              <select
                id="englishSpeaking"
                name="englishSpeaking"
                value={formik.values.englishSpeaking}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 px-3  py-2.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  Select your proficiency
                </option>
                <option value="Fluent">Fluent</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
                <option value="Beginner">Beginner</option>
              </select>
              {formik.touched.englishSpeaking && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.englishSpeaking}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-full mb-10">
            <label className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white">
              How good are you with writing English?
              <span className="text-red-500">*</span>{" "}
            </label>
            <div className="mt-2">
              <select
                id="englishWriting"
                name="englishWriting"
                value={formik.values.englishWriting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 px-3  py-2.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  Select your proficiency
                </option>
                <option value="Fluent">Fluent</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
                <option value="Beginner">Beginner</option>
              </select>
              {formik.touched.englishWriting && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.englishWriting}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-full mb-10">
            <h2 className="mb-4 block text-lg text-black dark:text-white">
              Carrier Discussion
            </h2>
            <div className="text-yellow-700 mb-4 flex items-start space-x-2 rounded-md border-l-4 border-yellow bg-red-100 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="mt-3 h-8 w-8 flex-shrink-0 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium">
                  Please schedule your availability for the mock interview. The
                  mock interview is compulsory for the assessment process.
                </p>
                <p className="text-sm font-medium">
                  We will assess the student&apos;s skills during the mock
                  interview to decide the next steps.
                </p>
              </div>
            </div>
            <div className="col-span-full mb-10">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Mock Interview Date:
                <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="date"
                id="mockInterviewDate"
                name="mockInterviewDate"
                value={formik.values.mockInterviewDate}
                onChange={formik.handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="h-10 w-full rounded-lg border px-3 outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="col-span-full mb-10">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Mock Interview Time:
                <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="time"
                id="mockInterviewTime"
                name="mockInterviewTime"
                value={formik.values.mockInterviewTime}
                onChange={formik.handleChange}
                className="h-10 w-full rounded-lg border px-3 outline-none focus:ring focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="col-span-full mb-10">
            <label className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white">
              Referred By
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="referredBy"
                name="referredBy"
                placeholder="Enter the name of the referrer"
                value={formik.values.referredBy}
                onChange={formik.handleChange}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
              {formik.errors.referredBy && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.referredBy}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
          >
            Upload Resume <span className="text-red-500">*</span>{" "}
          </label>
          <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-black border-opacity-50  px-6 py-10 text-black dark:border-white">
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="resume"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-black text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-dark "
                >
                  <span className="">Upload a file</span>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileSelect}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PDF , Document up to 10MB
              </p>
              <div id="file-preview">{selectedResumeName}</div>
            </div>
          </div>
          {formik.errors.resume && formik.touched.resume && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.resume}</p>
          )}
        </div>
          <div className="mb-6 mt-6 flex items-center justify-end  gap-x-6">
            <button
              type="button"
              className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
        {loading && <Loader />}
      </form>
    </div>
  );
};

export default ConsultancyForm;
