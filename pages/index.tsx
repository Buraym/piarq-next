import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material/";
import NextHead from "../src/components/defaultPage/NextHead/index";
import { useSession } from "next-auth/react";
import LinearLoading from "../src/components/LinearLoading";

export default function Index() {
    const { status: status } = useSession({ required: true });
    const router = useRouter();

    useEffect(() => {
        status === "loading"
            ? null
            : status === "authenticated"
            ? router.push("/login")
            : router.push("/home");
    }, []);

    return (
        <>
            <NextHead title={"Carregando..."} />
            <LinearLoading />
        </>
    );
}
