import photo1 from "../../../assets/banner-medCamp1.jpg"
import photo2 from "../../../assets/banner-medCamp2.jpg"
import photo3 from "../../../assets/banner-medCamp3.jpg"
import photo4 from "../../../assets/banner-medCamp4.jpg"
import photo5 from "../../../assets/banner-medCamp5.jpg"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'


// import required modules
import {Autoplay, EffectCube, Pagination } from 'swiper/modules';


const Banner = () => {
    return (
        <div className='max-h-[80vh] mb-10 bg-green-200'>
          <Swiper
            effect={'cube'}
            grabCursor={true}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            pagination={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay,EffectCube, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={photo1} className='max-h-[80vh] w-10/12 object-cover mx-auto relative' />
              <div className='absolute bottom-5 right-[8.33%] bg-white py-1 pl-1 rounded-l-lg text-white font-bold z-50'>
                <h2 className='text-base lg:text-3xl rounded-l-md bg-primary px-5 py-1 '>WE AIM TO SEE YOU SMILE...</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src={photo2} className='max-h-[80vh] w-10/12 object-cover mx-auto relative'/>
              <div className='absolute bottom-5 right-[8.33%] bg-white py-1 pl-1 rounded-l-lg text-white font-bold z-50'>
                <h2 className='text-base lg:text-3xl rounded-l-md bg-primary px-5 py-1 '>Bonding | Joy</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src={photo3} className='max-h-[80vh] w-10/12 object-cover mx-auto relative' />
              <div className='absolute bottom-5 right-[8.33%] bg-white py-1 pl-1 rounded-l-lg text-white font-bold z-50'>
                <h2 className='text-base lg:text-3xl rounded-l-md bg-primary px-5 py-1 '> PROFFESSIONALS AT DOORSTEPS</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src={photo4} className='max-h-[80vh] w-10/12 object-cover mx-auto relative'/>
              <div className='absolute bottom-5 right-[8.33%] bg-white py-1 pl-1 rounded-l-lg text-white font-bold z-50'>
                <h2 className='text-base lg:text-3xl rounded-l-md bg-primary px-5 py-1 '>AWARENESS |COUNSELLING |PREVENTION</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src={photo5} className='max-h-[80vh] w-10/12 object-cover mx-auto relative'/>
              <div className='absolute bottom-5 right-[8.33%] bg-white py-1 pl-1 rounded-l-lg text-white font-bold z-50'>
                <h2 className='text-base lg:text-3xl rounded-l-md bg-primary px-5 py-1 '>ALL ABOUT CARING THE SOCIETY</h2>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      );
};

export default Banner;