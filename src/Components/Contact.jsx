import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import LoaderSmall from "../Loader/LoaderSmall";
import img1 from "../images/about/Contact us-bro.svg"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    errors: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) {
        error = "Mobile number must contain only digits";
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      errors: {
        ...prevFormData.errors,
        [name]: error,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setSubmitting(true);
    setShowLoader(true);
    try {
      const response = await axios.post(
        "https://tekisky-pvt-ltd-backend.vercel.app/email/sendEmail",
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Email sent successfully",
        }).then(() => {
          setFormData({
            name: "",
            email: "",
            mobile: "",
            message: "",
            errors: {
              name: "",
              email: "",
              mobile: "",
              message: "",
            },
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to send email",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error sending email",
      });
    }
    setShowLoader(false);
    setSubmitting(false);
  };

  const validateForm = () => {
    const { name, email, mobile, message } = formData;
    const errors = {
      name: name.trim() ? "" : "Name is required",
      email: email.trim() ? "" : "Email address is required",
      mobile: mobile.trim()
        ? mobile.length === 10
          ? ""
          : "Mobile number must be 10 digits"
        : "Mobile is required",
      message: message.trim() ? "" : "Message is required",
    };

    setFormData((prevFormData) => ({ ...prevFormData, errors }));
    return Object.values(errors).every((error) => !error);
  };

  const allFieldsFilled = () => {
    const { name, email, mobile, message } = formData;
    return name && email && mobile && message;
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-5 md:py-20 lg:py-28"
    >
      {showLoader && <LoaderSmall />}

      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full lg:w-5/12 xl:w-6/12">
            <div
              className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Mail Us
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className={`border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none ${
                          formData.errors.name && "border-red-500"
                        }`}
                      />
                      {formData.errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {formData.errors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className={`border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none ${
                          formData.errors.email && "border-red-500"
                        }`}
                      />
                      {formData.errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {formData.errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="mobile"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Mobile
                      </label>
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={handleChange}
                        onKeyPress={(e) => {
                          if (e.key === "e" || e.key === "+" || e.key === "-") {
                            e.preventDefault();
                          }
                        }}
                        placeholder="Enter your mobile number"
                        className={`border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none ${
                          formData.errors.mobile && "border-red-500"
                        }`}
                      />
                      {formData.errors.mobile && (
                        <p className="mt-1 text-sm text-red-500">
                          {formData.errors.mobile}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your Message"
                        className={`border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none ${
                          formData.errors.message && "border-red-500"
                        }`}
                      ></textarea>
                      {formData.errors.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {formData.errors.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      disabled={submitting || !allFieldsFilled()}
                      className="rounded-lg bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark "
                    >
                      {submitting ? "Submitting..." : "Submit Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
            {/* <ContactBox /> */}
            <div className="relative z-10 rounded-sm bg-white shadow-three dark:bg-gray-dark sm:p-11 lg:p-8 xl:p-11">
              <img
                src={img1}
                alt="contact-us"
                width={300}
                height={500}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
