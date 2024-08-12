import React, { useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";

const Header = () => {
  const pathName = useLocation();
  const [openNavigation, setOpenNavigation] = useState(true);

  const toggleNavigation = () => {
    enablePageScroll();
    setOpenNavigation((prevState) => !prevState);
    disablePageScroll();
  };

  // so that navbar closes whenever we're not using it... somthing like that
  const handleClick = () => {
    if (!openNavigation) return;
    // not allowed to click when on  a certai element
    enablePageScroll();
    setOpenNavigation(false);
  };
  return (
    <div
      className={`fixed flex top-0 z-50 left-0 w-full border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      {/* logo contaner; take note of the larger px as scren gets larger */}
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 w-full">
        <a href="#logo" className="block w-[12rem] xl:mr-8">
          <img src={brainwave} width={140} height={90} />
        </a>
        {/* nav items in nav bar */}
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 bg-n-8 right-0 bottom-0 lg:flex lg:static lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathName.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>
          <HamburgerMenu />
        </nav>
        {/* last two items */}
        <a
          href="#signup"
          className="button hidden mr-8 text-n-1/50 lg:block transition-colors hover:text-white"
        >
          New account
        </a>
        <Button className="hidden lg:flex" href="#signin">
          Register
        </Button>
        <div className="ml-auto px-3 lg:hidden">
          <Button onClick={toggleNavigation}>
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
