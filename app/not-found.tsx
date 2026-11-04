import Link from "next/link";
import { Header } from "./components";

export default function NotFound() {
    return (<>

        <Header />

        <main className="not-found-page">
            <Link href="/" className="not-found-link">
                <picture>
                    <source
                        media="(max-width: 767px)"
                        srcSet="/images/404-mobile.jpg"
                    />

                    <img
                        src="/images/404-desktop.jpg"
                        alt="404 - Oops! This Page Took a Chai Break!"
                        className="not-found-image"
                    />
                </picture>
            </Link>
        </main>
    </>
    );
}