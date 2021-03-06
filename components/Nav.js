import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { LocalesContext } from "../lib/context";
import Link from "next/link";
import { Link as Linkscroll } from "react-scroll";

export default function Nav({ className = '' }) {
    const [activeLink, setActiveLink] = useState(null);
    const [scrollActive, setScrollActive] = useState(false);
    const [locales, setLocales] = useContext(LocalesContext);
    const { locale, pathname } = useRouter();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScrollActive(window.scrollY > 20);
        }, { passive: true });
    }, []);

    return (
        <nav className={`${className}`} id="nav">
            <ul className="flex justify-end">
                {
                    locales[locale].nav.map((ele, index) => (
                        <li className="uppercase text-orange-900 hover:text-orange-700 dark:text-orange-300 dark:hover:text-orange-500 transition ml-4" key={index}>
                            <Linkscroll
                                activeClass="active text-orange-500"
                                to={ele.href}
                                spy={true}
                                smooth={true}
                                duration={400}
                                onSetActive={() => {
                                    setActiveLink(ele.href);
                                }}
                                className="cursor-pointer transition"
                                href={`#${ele.href}`}
                            >
                                {ele.title}
                            </Linkscroll>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}