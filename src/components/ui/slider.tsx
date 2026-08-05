import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export interface SliderItemProps {
  imagePath: string;
  alterText?: string;
}

export interface SliderProps {
  itemPerView?: number;
  space?: number;
  items: SliderItemProps[];
}

export function Slider({ itemPerView = 1, space = 0, items }: SliderProps) {
  return (
    <Swiper
      loop
      slidesPerView={itemPerView}
      spaceBetween={space}
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
      }}
    >
      {items.map((i) => (
        <SwiperSlide>
          <img
            src={i.imagePath}
            alt={i.alterText}
            className="w-100 vh-100"
            style={{ objectFit: 'cover', objectPosition: 'left' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
