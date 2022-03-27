import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NextHead from "../src/components/defaultPage/NextHead/index";
import { useSession } from "next-auth/react";
import LinearLoading from "../src/components/LinearLoading";

export default function Index({ isAuth }) {
    const router = useRouter();
    const { data } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        data ? router.push("/home") : router.push("/login");
    }, [data]);

    return (
        <>
            <NextHead title={"Carregando..."} />
            <LinearLoading />
        </>
    );
}
