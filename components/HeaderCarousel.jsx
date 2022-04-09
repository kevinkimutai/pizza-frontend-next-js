import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

import styles from "../styles/HeaderCarousel.module.css";

const carousel = [
  {
    img: "/images/banner-img-1.jpg",
    heading: "Welcome to Pizza Kenya",
  },
  {
    img: "/images/banner-img-2.jpg",
    heading: "Deliciously Good",
  },
  {
    img: "/images/banner-img-3.jpg",
    heading: "Free Delivery across CBD",
  },
];

function HeaderCarousel() {
  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {carousel.map(({ img, heading }, i) => (
          <SwiperSlide key={i}>
            <div className={styles.wrapper}>
              <Image src={img} layout="fill" objectFit="cover" alt="" />
              <div className={styles.banner}>
                <h1 className={styles.bannerHeading}>{heading}</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nobis, error.
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeaderCarousel;
