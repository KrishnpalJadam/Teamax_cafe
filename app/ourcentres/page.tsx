import { Header, Footer } from "../components";
import OurCentresContent from "./components";

export default function OurCentresPage() {
    return (
        <>
            <Header active="/our-centres" />
            <OurCentresContent />
            <Footer />
        </>
    );
}