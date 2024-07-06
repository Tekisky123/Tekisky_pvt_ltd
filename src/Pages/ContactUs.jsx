import React from "react";
import { Link } from "react-router-dom";
import instagram from "../images/blog/instagram-new-logo-chisinau-moldova-september-instagram-new-logo-printed-white-paper-instagram-online-mobile-photo-128373447.webp"
import twitter from "../images/blog/4fd07cea5c3e3c0d810000db.format-webp.width-1440_0ygTbhgMQscB5N8u.webp"
import facebook from "../images/blog/new-facebook-logo-2019.jpg"
import linkedin from "../images/blog/free-linkedin-logo-vector-r3cq0.webp"
const RelatedPost = ({ image, title }) => {
  return (
    <div className="flex items-center lg:block xl:flex">
      <div className="mr-5 lg:mb-3 xl:mb-0">
        <div className="relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]">
          <img
            src={image}
            alt={title}
            className="social-logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="w-full">
        <h5>{title}</h5>
      </div>
    </div>
  );
};

const ContactUs = () => {
  return (
    <>
      <section className="overflow-hidden pb-[120px] pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  Contact Us
                </h1>

                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Contact Us Feel free to reach out to us for any inquiries,
                    collaborations, or assistance. Our dedicated team at Tekisky
                    Pvt Ltd is here to help you with your technology needs.
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sin!4v1714476863010!5m2!1sen!2sin!6m8!1m7!1sjDU1iv9-R5M_tLM-Z222FQ!2m2!1d19.18001771201362!2d77.30521175364845!3f175.29476688424725!4f7.231318187953079!5f0.7820865974627469"
                        width="800"
                        height="450"
                        title="map"
                        className="google-map"
                        style={{ border: "0" }}
                        dir="off"
                        allowFullScreen={true}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>

                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    Head Office:
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    <i>
                      If you have any questions or inquiries, please don&apos;t
                      hesitate to get in touch with us. You can reach us at:
                    </i>
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    <b>Address:</b> 2nd Floor, Opposite Water Tank, Workshop
                    Corner, Nanded, Maharashtra 431605, India
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Our team is available to assist you during our business
                    hours: <br />
                    <br />
                    Monday to Saturday - : 11:00 AM to 7:00 PM <br />
                    Friday - : 11:00 AM to 1:00 PM & 2:00 PM to 7:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                  <p className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    We welcome your inquiries and feedback and look forward to
                    serving you.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-4/12">
              <div className="mb-10 rounded-sm bg-white shadow-three dark:bg-gray-dark dark:shadow-none">
                <h3 className="border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Follow Us
                </h3>
                <ul className="p-8">
                  <li className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                    <Link
                      to="https://www.instagram.com/tekisky.pvt.ltd/?igsh=NTc4MTIwNjQ2YQ%3D%3D"
                      target="_blank"
                    >
                      <RelatedPost
                        title="Instagram"
                        image={instagram}
                      />
                    </Link>
                  </li>
                  <li className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                    <Link to="" target="_blank">
                      <RelatedPost
                        title="Facebook"
                        image={facebook}
                      />
                    </Link>
                  </li>
                  <li className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                    <Link to="https://x.com/tekiskypvtldt" target="_blank">
                      <RelatedPost
                        title="Twitter"
                        image={twitter}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.linkedin.com/company/tekisky-pvt-ltd/posts/?feedView=all"
                      target="_blank"
                    >
                      <RelatedPost
                        title="Linkedin"
                        image={linkedin}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
