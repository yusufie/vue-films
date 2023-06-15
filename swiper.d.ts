declare module 'swiper' {
    import { Swiper as SwiperClass, SwiperOptions } from 'swiper/swiper-bundle.esm';
  
    export class Swiper extends SwiperClass {
      constructor(container: string | HTMLElement, options?: SwiperOptions);
    }
  
    export default Swiper;
  }
  