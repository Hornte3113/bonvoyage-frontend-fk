import React from "react";
import { motion } from "motion/react";
import { IoIosGlobe } from "react-icons/io";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
function Header() {
    const[active, setActive] = React.useState(0);
    return (
        <div className=" absolute mt-5 flex w-full flex-wrap items-center justify-between gap-2 px-5 text-xs font-medium uppercase opacity-90 md:px-10">
            <div className=" flex items-center gap-2 font-medium tracking-[4px]">
                <IoIosGlobe className=" text-xl"/>
                Bon Voyage
            </div>
            <ul className=" flex flex-wrap items-center gap-3 text-[11px] md:gap-10">
                {menus.map((menu, index) => {
                    return (
                        <motion.li 
                        layout
                        key={index}
                        className={` ${
                            active == index && "border-b-2 border-b-yellow-500"}
                             inline-block cursor-pointer border-b-yellow-500 transition duration-300 ease-in-out hover:border-b-2 hover:text-white`}
                             >
                            {menu}
                        </motion.li>
                    );

                })}
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="px-3 py-1 rounded border border-white/50 hover:bg-white hover:text-black transition duration-300">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="px-3 py-1 rounded bg-yellow-500 text-black hover:bg-yellow-400 transition duration-300">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>

            </ul>
            </div>
    );
    }

export default Header;

const menus = [
    "Home",
    "Sobre Nosotros",
    "Destinos",
    "Blog",
    "Algo:(",

];




