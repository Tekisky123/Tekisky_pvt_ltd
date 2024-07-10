import axios from "axios";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useParams } from "react-router-dom";
import baseURL from "../Common/Api"


const SingleApplication = () => {
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const { id } = useParams();
  
    useEffect(() => {
      const fetchApplication = async () => {
        try {
          const response = await axios.get(
            `${baseURL}consultancy/getoneuploadresume/${id}`
          );
          setApplication(response.data);
        } catch (error) {
          console.error("Error fetching application:", error);
          setError("Failed to fetch application data");
        } finally {
          setLoading(false);
        }
      };
  
      if (id) {
        fetchApplication();
      }
    }, [id]);
  
    if (loading) {
      return (
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex h-screen items-center justify-center">
          Error: {error}
        </div>
      );
    }
  
    if (!application) {
      return (
        <div className="flex h-screen items-center justify-center">
          No application found
        </div>
      );
    }
  
    const downloadPDF = () => {
      const pdf = new jsPDF();
  
      const imageUrl =
        "https://tekisky-pvt-ltd.vercel.app/images/logo/WhatsApp_Image_2024-04-30_at_12.39.09_86de1ffc-removebg-preview.png";
      pdf.addImage(imageUrl, "JPEG", 55, 5, 100, 30);
  
      pdf.setFontSize(12);
      pdf.text("Personal Information", 10, 30);
      pdf.autoTable({
        startY: 35,
        head: [["Field", "Details"]],
        body: [
          ["Full Name", application.fullName],
          ["Email", application.email],
          ["Mobile Number", application.mobileNumber],
          ["Employee Number", application.employeeNumber],
          ["Work Status", application.workStatus],
          ["Years of Experience", application.yearsOfExperience],
        ],
        theme: "striped",
      });
  
      pdf.text("Education", 10, pdf.autoTable.previous.finalY + 10);
      pdf.autoTable({
        startY: pdf.autoTable.previous.finalY + 15,
        head: [["Field", "Details"]],
        body: [
          ["Tenth Percentage", `${application.tenthPercentage}%`],
          ["Twelfth Percentage", `${application.twelthPercentage}%`],
          ["Twelfth College Name", application.twelthCollegeName],
          ["Diploma Percentage", `${application.diplomaPercentage}%`],
          ["Diploma College Name", application.diplomaCollegeName],
          ["Degree Name", application.degreeName],
          ["Degree Percentage", `${application.degreePercentage}%`],
          ["Degree College Name", application.degreeCollegeName],
          ["Year of Passing", application.yearOfPassing],
        ],
        theme: "striped",
      });
  
      pdf.text("Skills", 10, pdf.autoTable.previous.finalY + 10);
      pdf.autoTable({
        startY: pdf.autoTable.previous.finalY + 15,
        head: [["Skills"]],
        body: application.skills.map((skill) => [skill]),
        theme: "striped",
      });
  
      pdf.text(
        "Additional Information",
        10,
        pdf.autoTable.previous.finalY + 10
      );
      pdf.autoTable({
        startY: pdf.autoTable.previous.finalY + 15,
        head: [["Field", "Details"]],
        body: [
          ["Referred By", application.referredBy],
          ["Extra Information", application.extraInformation],
          ["English Speaking", application.englishSpeaking],
          ["English Writing", application.englishWriting],
          ["Mock Interview Date", application.mockInterviewDate],
          ["Mock Interview Time", application.mockInterviewTime],
        ],
        theme: "striped",
      });
  
      pdf.save(application.fullName + "'s Resume.pdf");
    };
  
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
        <div className="mt-20 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Application Details
          </h1>
          <div className="flex w-full justify-end">
            <button
              onClick={downloadPDF}
              className="bg-white-500 hover:bg-white-700 rounded px-4 py-2 font-bold text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="50"
                height="50"
                fill="red"
              >
                <path d="M7.98,16.11c0,.47-.41,.86-.89,.86h-.83s0-1.72,0-1.72h.84c.48,0,.89,.39,.89,.86Zm7.02-8.11h6.54c-.35-.91-.88-1.75-1.59-2.46l-3.48-3.49c-.71-.71-1.55-1.24-2.46-1.59V7c0,.55,.45,1,1,1Zm-2.91,7.25h-.84v3.5s.84,0,.84,0c.48,0,.89-.39,.89-.86v-1.78c0-.47-.41-.86-.89-.86Zm9.91-4.76v8.51c0,2.76-2.24,5-5,5H7c-2.76,0-5-2.24-5-5V5C2,2.24,4.24,0,7,0h4.51c.16,0,.32,.01,.49,.02V7c0,1.65,1.35,3,3,3h6.98c.01,.16,.02,.32,.02,.49Zm-12.77,5.62c0-1.16-.96-2.11-2.14-2.11h-1.09c-.55,0-1,.45-1,1v4.44c0,.35,.28,.62,.62,.62s.62-.28,.62-.62v-1.22h.84c1.18,0,2.14-.95,2.14-2.11Zm5,0c0-1.16-.96-2.11-2.14-2.11h-1.09c-.55,0-1,.45-1,1v4.44c0,.35,.28,.56,.62,.56s1.46,0,1.46,0c1.18,0,2.14-.95,2.14-2.11v-1.78Zm4.79-1.48c0-.35-.28-.62-.62-.62h-2.31c-.35,0-.62,.28-.62,.62v4.81c0,.35,.28,.62,.62,.62s.62-.28,.62-.62v-1.8h1.24c.35,0,.62-.28,.62-.62s-.28-.62-.62-.62h-1.24v-1.14h1.69c.35,0,.62-.28,.62-.62Z" />
              </svg>
            </button>
          </div>
  
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              Personal Information
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-200">
                <tbody>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Full Name</td>
                    <td className="px-4 py-2">{application.fullName}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">Email</td>
                    <td className="px-4 py-2">{application.email}</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Mobile Number</td>
                    <td className="px-4 py-2">{application.mobileNumber}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">Employee Number</td>
                    <td className="px-4 py-2">{application.employeeNumber}</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Work Status</td>
                    <td className="px-4 py-2">{application.workStatus}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">Years of Experience</td>
                    <td className="px-4 py-2">{application.yearsOfExperience}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          {/* Education */}
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-700">Education</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-200">
                <tbody>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Tenth Percentage</td>
                    <td className="px-4 py-2">{application.tenthPercentage}%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">Twelfth Percentage</td>
                    <td className="px-4 py-2">{application.twelthPercentage}%</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Twelfth College Name</td>
                    <td className="px-4 py-2">{application.twelthCollegeName}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">Diploma Percentage</td>
                    <td className="px-4 py-2">{application.diplomaPercentage}%</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Diploma College Name</td>
                    <td className="px-4 py-2">{application.diplomaCollegeName}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">Degree Name</td>
                    <td className="px-4 py-2">{application.degreeName}</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Degree Percentage</td>
                    <td className="px-4 py-2">{application.degreePercentage}%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">Degree College Name</td>
                    <td className="px-4 py-2">{application.degreeCollegeName}</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Year of Passing</td>
                    <td className="px-4 py-2">{application.yearOfPassing}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          {/* Skills */}
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-700">Skills</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-200">
                <tbody>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Skills</td>
                    <td className="px-4 py-2">
                      {Array.isArray(application.skills)
                        ? application.skills.join(", ")
                        : application.skills}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          {/* Additional Information */}
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              Additional Information
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-200">
                <tbody>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Referred By</td>
                    <td className="px-4 py-2">{application.referredBy}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">Extra Information</td>
                    <td className="px-4 py-2">{application.extraInformation}</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">English Speaking</td>
                    <td className="px-4 py-2">{application.englishSpeaking}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">English Writing</td>
                    <td className="px-4 py-2">{application.englishWriting}</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 font-semibold">Mock Interview Date</td>
                    <td className="px-4 py-2">{application.mockInterviewDate}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">Mock Interview Time</td>
                    <td className="px-4 py-2">{application.mockInterviewTime}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default SingleApplication;
