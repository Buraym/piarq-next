import Head from "next/head"

interface Params {
    title: string
    icon?: string
}

export default function NextHead({ title, icon }: Params) {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href={icon} />
        </Head>
    )
}
