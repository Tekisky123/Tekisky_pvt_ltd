import React from "react";
import WebDevelopment from "../images/hero/web-development-coding-programming-internet-technology-business-concept-web-development-coding-programming-internet-technology-121903546.webp";
import CorporateTraining from "../images/hero/corporeate training.png"
import CorporateTrainers from "../images/hero/corporate_training.jpg"
import industrialconsultancyservices from "../images/hero/industrial-consultancy-services.png"
import ITSupportServices from "../images/hero/IT-Support-Services-Detailed-IT-Services.jpg"
import gradient from "../images/hero/gradient-ui-ux-background_23-2149065783.avif"
import software from "../images/hero/software-development-button.jpg"
import gradientui from "../images/hero/gradient-ui-ux-background_23-2149052117.avif"
import img10 from "../images/blog/960x0.webp"
import img11 from "../images/hero/960x0.webp"
const testimonialData = [
  {
    id: 1,
    name: "Web Development:",
    content:
      "Our web development services are tailored to your specific requirements, ensuring that your online presence reflects your brand identity and values. Whether you need a custom website or an e-commerce platform, we have the expertise to bring your vision to life.",
    image: WebDevelopment,
  },
  {
    id: 2,
    name: "Corporate Training:",
    content:
      "Enhance your team's skills and productivity with our comprehensive corporate training programs. We offer customized training solutions that address your specific business needs and help your employees stay ahead of the curve.",
    image: CorporateTraining,
  },
  {
    id: 3,
    name: "Corporate Trainers:",
    content:
      "Our experienced corporate trainers are experts in their respective fields. They provide engaging and impactful training sessions that equip your team with the knowledge and skills they need to excel in their roles.",
    image: CorporateTrainers,
  },
  {
    id: 4,
    name: "IT Consultancy:",
    content:
      "Our IT consultancy services help you navigate the complex world of technology. From strategic planning to implementation, we provide expert guidance to ensure your IT infrastructure supports your business goals.",
    image: industrialconsultancyservices,
  },
  {
    id: 5,
    name: "IT Services:",
    content:
      "We offer a wide range of IT services to support your business operations. From network management to cybersecurity, our services are designed to keep your IT systems running smoothly and securely.",
    image: ITSupportServices,
  },
  {
    id: 6,
    name: "Mobile App Development:",
    content:
      "From native apps to cross-platform solutions, our mobile app development services cover all your needs. We specialize in creating engaging and user-friendly applications that enhance the mobile experience for your customers.",
    image: gradient,
  },
  {
    id: 7,
    name: "Software Development:",
    content:
      "Our software development services are designed to streamline your business operations and drive efficiency. Whether you need a custom solution or an off-the-shelf product, we have the skills and experience to deliver high-quality software that meets your needs.",
    image: software,
  },
  {
    id: 8,
    name: "UI/UX Design:",
    content:
      "User experience is at the heart of everything we do. Our UI/UX design services focus on creating intuitive and visually appealing interfaces that delight users and drive engagement.",
    image: gradientui,
  },
  {
    id: 9,
    name: "Data Science:",
    content:
      "Unlock the power of your data with our data science services. From data analysis to predictive modeling, we help you turn raw data into actionable insights that drive informed decision-making.",
    image: img10,
  },
  {
    id: 10,
    name: "Startup Tech Partnerships:",
    content:
      "Our e-commerce solutions are designed to help you succeed in the competitive online marketplace. From website development to digital marketing, we provide end-to-end solutions that drive sales and maximize ROI.",
    image: img11,
  },
];

const SingleTestimonial = ({ testimonial }) => {
  const { name, image, content } = testimonial;

  return (
    <div className="w-full">
      <div className="h-auto rounded-sm bg-white p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8">
        <div className="relative mr-4 h-[200px] w-full max-w-[400px] overflow-hidden">
          <img
            src={image}
            alt={name}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <h1 className="mb-5 text-lg font-semibold text-dark dark:text-white lg:text-base xl:text-lg mt-5">
          {name}
        </h1>
        <p className=" h-40 overflow-hidden pb-8 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white">
          “{content}
        </p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section className="relative z-10 bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
      <div className="container">
        <div className={`w-9/12 mb-10 ${"mx-auto text-center"}`}>
          <h2 className="mb-16 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] mt-8">
            Our Services
          </h2>
          <p className="text-base leading-relaxed text-body-color md:text-lg   text-center">
            At Tekisky Pvt Ltd, we offer a comprehensive range of services to
            meet your digital needs. From web development to data science, our
            team of experts is dedicated to delivering innovative solutions that
            drive results for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((testimonial) => (
            <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
