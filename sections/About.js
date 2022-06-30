import { useContext } from "react";
import { LocalesContext } from "../lib/context";
import { useRouter } from "next/router";

import Section from "../components/Section";
import Image from "next/image"
import me from "../public/me.jpg";
import metwo from "../public/metwo.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function About() {
    const [locales, setLocales] = useContext(LocalesContext);
    const { locale } = useRouter();

    return (
        <Section id="about" className="lg:items-center">
            <div className="lg:flex-1 h-1/2 lg:h-auto w-full lg:w-1/2 2xl:w-1/3 overflow-hidden flex">
                <div className="w-1/2 z-10 relative overflow-hidden animate-rotate">
                    <div className="w-[200%] absolute inset-0">
                        <Image
                            src={metwo}
                            layout="fill"
                            objectFit="contain"
                            className="opacity-100 hover:opacity-0 transition"
                            alt="Me two"
                        />
                        <Image
                            src={me}
                            layout="fill"
                            objectFit="contain"
                            className="opacity-0 hover:opacity-100 transition"
                            alt="Me"

                        />
                    </div>
                </div>
                <div className="w-1/2 relative overflow-hidden animate-rotateReverse">
                    <div className="w-[200%] absolute top-0 bottom-0 right-0">
                        <Image
                            src={me}
                            layout="fill"
                            objectFit="contain"
                            className="opacity-100 hover:opacity-0 transition"
                            alt="Me"
                        />
                        <Image
                            src={metwo}
                            layout="fill"
                            objectFit="contain"
                            className="opacity-0 hover:opacity-100 transition"
                            alt="Me two"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end text-xl">
                <div className="lg:w-1/3 text-end font-bold" dangerouslySetInnerHTML={{ __html: locales[locale].about.contentHtml }} />
                <div className="flex flex-col justify-between">
                    <a href="https://github.com/antoinebollinger" alt="GitHub" className="text-orange-900 hover:text-orange-700 transition ml-8">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://www.linkedin.com/in/antoinebollinger/" alt="LinkedIn" className="text-orange-900 hover:text-orange-700 transition ml-8">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href={`/documents/${locales[locale].resume}`} alt="Download" className="text-orange-900 hover:text-orange-700 transition ml-8">
                        <FontAwesomeIcon icon={faFileArrowDown} />
                    </a>
                </div>
            </div>
        </Section >
    )
}