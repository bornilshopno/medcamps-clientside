import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import FeedbackSection from "./FeedbackSection/FeedbackSection";
import PopularSection from "./Popularsection/PopularSection";
import Subscribe from "./Subscribe/Subscribe";


const Home = () => {
    return (
        <div>
             <Helmet>
                <title>MedCamps || Home</title>
            </Helmet>
            <div className="max-h-[75vh]">
            <Banner/>
            </div>
            <PopularSection/>
            <FeedbackSection/>
            <Subscribe/>
        </div>
    );
};

export default Home;