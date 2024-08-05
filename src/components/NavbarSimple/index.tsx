import Link from "next/link";
import {LifebuoyIcon} from "@heroicons/react/24/outline";
import ThemeToggle from "@/components/ThemeToggle";

const NavbarSimple = () => {




    return (
        <div
            className="flex flex-wrap items-center justify-between border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 p-6">

            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <LifebuoyIcon className="w-8 h-8 text-blue-700 dark:text-blue-500"/>
                <span
                    className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Table Rock Lake Level</span>
            </Link>

            <nav>
                <ul className="navbar flex items-center text-xl font-medium text-gray-800">


                </ul>
                <ThemeToggle/>
            </nav>
        </div>
    );
};

export default NavbarSimple;