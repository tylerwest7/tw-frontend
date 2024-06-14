import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative">
      <div
        id="divider"
        className="h-[2px] absolute top-0 w-full bg-black"
      ></div>
      <div
        id="footer"
        className="grid grid-cols-1 md:grid-cols-5 pt-20 pb-20 font-medium gap-y-10 md:gap-y-0"
      >
        <div>
          <h1 className="text-3xl font-medium">Tyler West</h1>
          <p className="mt-2 text-3xl md:text-4xl">UI/UX Designer</p>
        </div>
        <div>
          <h1 className="text-3xl font-medium">My Services</h1>
          <ul className="pt-5 pb-5 text-3xl md:text-4xl">
            <li className="font-medium underline py-2">3D Design</li>
            <li className="font-medium underline py-2">Web Design</li>
            <li className="font-medium underline py-2">Web Development</li>
            <li className="font-medium underline py-2">Figma Plugins</li>
          </ul>
        </div>
        <div>
          <h1 className="text-3xl font-medium">Connect</h1>
          <ul className="pt-5 pb-5 text-3xl md:text-4xl">
            <li className="font-medium underline py-2">Instagram</li>
            <li className="font-medium underline py-2">Linkedin</li>
            <li className="font-medium underline py-2">Resume</li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h1 className="text-3xl mb-10 font-medium">
            Want to discuss a project?
          </h1>
          <p className="mt-2 text-3xl md:text-4xl">
            Feel free to reach out and say hi! Recent grad?
          </p>
          <p className="mt-2 underline text-3xl md:text-4xl">
            tyler@tylerwest.co
          </p>
        </div>
      </div>
      <div id="divider" className="h-[2px] w-full bg-black"></div>
      <div className="grid grid-cols-2 md:grid-cols-2 pt-10 pb-20">
        <p className="text-1xl font-medium">Thanks for visiting!</p>
        <p className="text-1xl font-medium md:ml-auto">© Tyler West 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
