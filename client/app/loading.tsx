import Image from "next/image";

export default function Loading() {
    return (
        <main className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image src="/load2.gif" alt="loading" width={150} height={150} className="Loading" />
        </main>
    )
}