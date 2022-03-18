import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NextHead from "../src/components/defaultPage/NextHead/index";

export default function Index() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    session ? router.push("/home") : router.push("/login");
  }, [session]);

  return (
    <>
      <NextHead title={"Carregando..."} />
    </>
  );
}
