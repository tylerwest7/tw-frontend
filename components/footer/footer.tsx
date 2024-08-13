import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="" style={{ backgroundColor: "#CBC9C7" }}>
      {/* <div
        id="divider"
        className="h-[2px] absolute top-0 w-full bg-black"
      ></div> */}
      <div
        id="footer"
        className="grid grid-cols-1 md:grid-cols-5 pt-20 pb-20 font-medium gap-y-10 md:gap-y-0 ml-9 mr-9 lg:ml-24 lg:mr-24"
      >
        <div className="md:col-span-2">
          <h1 className="text-3xl font-medium">Tyler West</h1>
          <p className="mt-2 text-3xl pt-0 lg:pt-5 xl:pt-5 md:text-4xl">
            3D Generalist
          </p>
        </div>
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-3">
          <div>
            <h1 className="text-3xl font-medium">My Services</h1>
            <ul className="pt-5 pb-5 text-1xl md:text-3xl">
              <li className="font-medium underline py-2 text-1xl">3D Design</li>
              <li className="font-medium underline py-2">Motion Design</li>
              {/* <li className="font-medium underline py-2">Web Development</li> */}
              <li className="font-medium underline py-2">AR/VR Experiences</li>
            </ul>
          </div>
          <div>
            <h1 className="text-3xl font-medium">Connect</h1>
            <ul className="pt-5 pb-5 text-3xl md:text-3xl">
              <li className="font-medium underline py-2">
                <a
                  href="https://www.instagram.com/tylerwest.design/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li className="font-medium underline py-2">
                <a
                  href="https://www.linkedin.com/in/tyler-west/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a>
              </li>
              <li className="font-medium underline py-2 opacity-50">Resume</li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h1 className="text-3xl pb-5 font-medium">
              Want to discuss a project?
            </h1>
            <p className="mt-2 text-3xl md:text-3xl">
              Feel free to reach out and say hi!
            </p>
            <p className="mt-2 underline text-3xl md:text-3xl">
              <a href="mailto:your-email@example.com">tyler@tylerwest.co</a>
            </p>
          </div>
        </div>
      </div>
      {/* <div id="divider" className="h-[2px] w-full bg-black"></div> */}
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-2 pt-10 pb-20 text-1xl lg:text-3xl ml-9 mr-9 lg:ml-24 lg:mr-24">
          <p className="font-medium">Thanks for visiting!</p>
          <p className="font-medium ml-auto">© Tyler West 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
