import { useRouter } from "next/router";
import { useEffect } from "react";
import NextHead from "../src/components/defaultPage/NextHead/index";
import { getSession } from "next-auth/react";
import LinearLoading from "../src/components/LinearLoading";

export default function Index({ isAuth }) {
    const router = useRouter();

    useEffect(() => {
        isAuth ? router.push("/home") : router.push("/login");
    }, [isAuth]);

    return (
        <>
            <NextHead title={"Carregando..."} />
            <LinearLoading />
        </>
    );
}

export async function getStaticProps(context) {
    try {
        const session = await getSession(context);
        var isAuth = false;
        session ? (isAuth = true) : (isAuth = false);
        return {
            props: { isAuth },
        };
    } catch (err) {
        console.error(err);
    }
}
