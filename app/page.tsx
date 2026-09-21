import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h1>
                Apunts PRO1{" "}
                <span className="font-normal text-lg text-foreground/60">
                    (2026 Primavera)
                </span>
            </h1>

            <p>
                Aquests apunts formaven part de la pàgina oficial de PRO1 durant
                els cursos 2024-2025 i 2025-2026. No estan complets, però el
                repositori està a{" "}
                <Link href="https://github.com/pauek/apunts-pro1">GitHub</Link> i
                s&apos;accepten pull requests.
            </p>

            <ol className="mt-8" start={0}>
                <li>
                    <Link href="00-linux">Introducció a Linux</Link>
                </li>
                <li>
                    <Link href="01-conceptes-basics">Conceptes Bàsics</Link>
                </li>
                <li>
                    <Link href="02-alternatives-i-iteracions">
                        Alternatives i Iteracions
                    </Link>
                </li>
                <li>
                    <Link href="03-sequencies">Seqüències</Link>
                </li>
                <li>
                    <Link href="04-esquemes">Esquemes</Link>
                </li>
                <li>
                    <Link href="05-recursivitat">Recursivitat</Link>
                </li>
                <li>
                    <Link href="06-vectors">Vectors</Link>
                </li>
            </ol>
        </main>
    );
}
