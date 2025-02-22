import { useQuery } from "@tanstack/react-query";
import SectionTitles from "../../../Components/SectionTitles";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { format } from "date-fns";
import 'swiper/css/autoplay'
import { Rating, ThinStar } from "@smastrom/react-rating";


const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#40b176',
    inactiveFillColor: '#D3D3D3'
}

const FeedbackSection = () => {
    const axiosSecurely = useAxiosSecure()
    const { data: feedbacks, isPending } = useQuery({
        queryKey: ["feedbacks"],
        queryFn: async () => {
            const res = await axiosSecurely.get("/feedbacks");
            return res.data
        }
    });
    return (
        <div>
            <SectionTitles heading={"Feedback & Ratings"} subHeading={"--feedback matters to have an overview--"}>
            </SectionTitles>

            <div className="py-10 ">
                <Swiper navigation={true} autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]} className="mySwiper">
                    {
                        feedbacks?.map(feedback =>
                            <SwiperSlide key={feedback._id}>
                                <div className="w-11/12 mx-auto flex flex-col justify-center mb-10">
                                    <FaQuoteLeft className="mx-auto mb-10 text-gray-300" />
                                    <Rating
                                        className="mx-auto"
                                        style={{ maxWidth: 180 }}
                                        value={feedback.rating}
                                        itemStyles={myStyles}
                                        readOnly
                                    />
                                    <h2 className="text-center text-2xl font-semibold pb-10">{feedback?.feedback}</h2>
                                    <FaQuoteRight className="mx-auto text-gray-300" />
                                    <div className="flex gap-2 text-sm italic justify-center">
                                        <h2 className="">{feedback?.participantName} 's feedback on {feedback?.campName}</h2>
                                        <p className=" text-sm">Dated: {feedback.date && format(new Date(feedback.date), 'P')}</p>


                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }

                </Swiper>
            </div>
        </div>
    );
};

export default FeedbackSection;