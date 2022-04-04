import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NextHead from "../src/components/defaultPage/NextHead/index";
import { useSession } from "next-auth/react";
import LinearLoading from "../src/components/LinearLoading";

export default function Index({ isAuth }) {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        session ? router.push("/home") : router.push("/login");
    }, [session]);

    return (
        <>
            <NextHead title={"Carregando..."} />
            <LinearLoading />
        </>
    );
}
