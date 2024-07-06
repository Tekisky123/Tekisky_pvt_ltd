import React from "react";
import Codingworkshop from "../images/hero/Coding workshop-bro.svg"

const Section2 = () => {
  return (
    <section className="md:py-20 lg:py-28">
        <div className={`w-full ${"mx-auto text-center"}`}>
          <h2 className="mb-16 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] mt-8">
            Why Choose Tekisky ?
          </h2>
          <p className="text-base leading-relaxed text-body-color md:text-lg"></p>
        </div>
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto mb-12 aspect-[35/24] max-w-[700px] text-center lg:m-0">
              <img
                src={Codingworkshop}
                alt=""
                className="content-image drop-shadow-three dark:drop-shadow-none"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 mt-10">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Industry Expertise:
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  With experience serving various domains including Ed-Tech,
                  E-commerce, Healthcare, and more, Tekisky brings
                  industry-specific expertise to the table. This enables them to
                  understand the unique challenges and requirements of different
                  sectors and tailor solutions accordingly.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  International Reach:
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Tekisky places great emphasis on building and maintaining
                  partnerships with distinguished international partners. This
                  global network allows them to access cutting-edge technologies
                  and deliver tailored solutions to customers worldwide.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Mission and Vision:
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We prioritize client satisfaction and work closely with you to
                  understand your unique needs and deliver tailored solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
