import Layout from "../components/Layout";
import Home from "../sections/Home";
import Portfolio from "../sections/Portfolio";
import About from "../sections/About";
import Contact from "../sections/Contact";

import { LocalesContext } from "../lib/context";
import { getMarkup, getLocales } from "../lib/locales";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrayToObject } from "../lib/helpers";

export async function getServerSideProps(context) {
    const locales = await getLocales();
    const all = await Promise.all(Object.keys(locales).map(async (locale) => {
        const home = await getMarkup('home', locale);
        const about = await getMarkup('about', locale);
        return {
            locale: locale,
            ...locales[locale],
            home: {
                ...locales[locale].home,
                ...home
            },
            about: {
                ...locales[locale].about,
                ...about
            }
        }
    }));
    const data = ArrayToObject(all, 'locale');
    return {
        props: {
            data
        },
    };
}

export default function Index({ data }) {
    const [title, setTitle] = useState('');
    const [locales, setLocales] = useState(data);
    const { locale } = useRouter();

    useEffect(() => {
        const test = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('animate-fadeout');
                    entry.target.classList.add('animate-fadein');
                    if (!entry) return;
                    setTitle(locales[locale][entry.target.id].title);
                } else {
                    entry.target.classList.add('animate-fadeout');
                    entry.target.classList.remove('animate-fadein');
                }
            });
        }

        const sectionObserver = new IntersectionObserver(test, { root: null, threshold: 0.5 });
        document.querySelectorAll('section')?.forEach(section => sectionObserver.observe(section));
    }, []);

    return (
        <LocalesContext.Provider value={[locales, setLocales]}>
            <Layout title={title}>
                <Home />
                <Portfolio />
                <About />
                <Contact />
            </Layout>
        </LocalesContext.Provider>
    )
}
