import React from "react";
import mern from "../images/blog/mern.png"
import mernwithPyDSA from "../images/blog/mernwithPy&DSA.png"
import datascience from "../images/blog/960x0.webp"
import frontend from "../images/blog/1679683081898.png"
import nodejs from "../images/blog/0_TrneyH4gnbEHvgGM.png"

const featuresData = [
  {
    id: 1,
    image: (
      <img
        src={mern}
        alt="MERN Full Stack Development"
        className="service-img"
        width={600}
        height={500}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
    title: "MERN Full Stack Development",
    paragraph: `Learn the MERN stack: MongoDB, Express, React, and Node.js, to build powerful and modern web applications, Syllabus includes HTML, CSS, JavaScript, React.js, and Node.js. Ideal for aspiring full-stack developers looking to master the latest technologies in web development.`,
  },
  {
    id: 2,
    image: (
      <img
        src={mernwithPyDSA}
        alt="MERN Full Stack with Python and DSA"
        className="service-img"
        width={600}
        height={500}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
    title: "MERN Full Stack with Python and DSA",
    paragraph: `Combine the power of the MERN stack with Python and Data Structures & Algorithms (DSA). Learn to build full-stack applications while mastering Python for backend development and DSA for optimizing code performance. Ideal for developers aiming to enhance their skill set with versatile technologies.`,
  },
  {
    id: 3,
    image: (
      <img
        src={datascience}
        alt="Data Science"
        className="service-img"
        width={600}
        height={500}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
    title: "Data Science",
    paragraph: `Dive into the multidisciplinary field of data science, mastering techniques and tools to extract meaningful insights from data. Topics cover artificial intelligence and machine learning. Perfect for individuals interested in analyzing and interpreting data to drive business decisions.`,
  },
  {
    id: 4,
    image: (
      <img
        src={frontend}
        alt="Front-end Developer"
        className="service-img"
        width={600}
        height={500}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
    title: "Front-end Developer",
    paragraph: `Learn the essentials of frontend development, focusing on HTML, CSS, and JavaScript. Develop skills in creating user interfaces and interactive web experiences. Suitable for beginners aiming to kickstart their career in web development.`,
  },
  {
    id: 5,
    image: (
      <img
        src={nodejs}
        alt="Node.js Developer"
        className="service-img"
        width={600}
        height={500}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
    title: "Node.js Developer",
    paragraph: `Become proficient in backend development using Node.js. Topics include JavaScript, MongoDB, NPM, REST API, and Node.js. Designed for developers interested in building scalable and efficient backend systems for web applications.`,
  },
];

const SingleFeature = ({ feature }) => {
  const { image, title, paragraph } = feature;
  return (
    <div className="wow fadeInUp" data-wow-delay=".15s">
      <div className="mb-10 flex h-[220px] w-auto items-center justify-center border-none object-contain text-primary courses-img">
        {image}
      </div>
      <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
        {title}
      </h3>
      <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
        {paragraph}
      </p>
    </div>
  );
};

const Courses = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className={`w-full mx-auto text-center`}>
          <h2 className="mb-16 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] mt-8">
            Pick a Course to Get Started
          </h2>
          <p className="text-base leading-relaxed text-body-color md:text-lg">
            Popular topics to learn.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
