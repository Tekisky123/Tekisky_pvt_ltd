import cashapon from "../images/companies/WhatsApp Image 2024-05-01 at 13.00.00_0e05f6ec.jpg";
import CitiusTech from "../images/companies/CitiusTech-Logo.webp";
import Redbytessoftware from "../images/companies/Redbytessoftware_OG.jpg"
import Flipkart from "../images/companies/Flipkart-Logo-2015-present.jpg"
import Protonshub from "../images/companies/Protonshub-Technologies-logo-profile.jpg"
import scitech from "../images/companies/images.png"
import tende from "../images/companies/images (2).png"
import techefficio from "../images/companies/WhatsApp Image 2024-05-01 at 13.00.00_0e05f6ec.jpg"
import softomatictechindia from "../images/companies/softomatictechindia_logo.jpeg"

const Company = () => {
  const companyData = [
    {
      id: 6,
      name: "Formbold",
      href: "",
      image: cashapon ,
      imageLight: cashapon ,
    },
    {
      id: 1,
      name: "UIdeck",
      href: "",
      image:  CitiusTech ,
      imageLight: CitiusTech ,
    },
    {
      id: 2,
      name: "Tailgrids",
      href: "",
      image: Redbytessoftware,
      imageLight: Redbytessoftware,
    },
    {
      id: 3,
      name: "Lineicons",
      href: "",
      image: Flipkart,
      imageLight: Flipkart,
    },
    {
      id: 4,
      name: "Tailadmin",
      href: "",
      image: Protonshub,
      imageLight: Protonshub,
    },
    {
      id: 5,
      name: "PlainAdmin",
      href: "",
      image: scitech,
      imageLight: scitech,
    },
    {
      id: 7,
      name: "PlainAdmin",
      href: "",
      image: tende,
      imageLight: tende,
    },
    {
      id: 8,
      name: "PlainAdmin",
      href: "",
      image:
        techefficio,
      imageLight:
        techefficio,
    },
    {
      id: 9,
      name: "PlainAdmin",
      href: "",
      image: softomatictechindia,
      imageLight: softomatictechindia,
    },
  ];
  return (
    <section className="">
      <p style={{ textAlign: "center" }}>Happy Placements</p>

      <div className={`w-full ${"mx-auto text-center"}`}>
        <h2 className="mb-16 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] mt-8">
          Our Prestigious Companies
        </h2>
        <p className="text-base leading-relaxed text-body-color md:text-lg mb-5">
          Our Candidates Are Placed in Following Companies.
        </p>
      </div>
      <div className="container">
        <div className="company-container flex flex-wrap items-center justify-center rounded-sm bg-gray-light py-8 dark:bg-gray-dark">
          <div className="image-container">
            {companyData.map((Company) => (
              <SingleCompany key={Company.id} Company={Company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;

const SingleCompany = ({ Company }) => {
  const { href, image, imageLight, name } = Company;

  return (
    <div className="flex h-auto w-60 items-center justify-center px-3">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-40 w-60"
      >
        <img
          src={imageLight}
          alt={name}
          className="company-logo hidden dark:block"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <img
          src={image}
          alt={name}
          className="company-logo block dark:hidden"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </a>
    </div>
  );
};
