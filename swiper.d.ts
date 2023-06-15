declare module 'swiper' {
  import { Navigation, Pagination } from 'swiper/types';

  export default class Swiper {
static use(arg0: (typeof Swiper)[]) {
throw new Error('Method not implemented.');
}
    constructor(selector: string, options?: SwiperOptions);
  }

  export interface SwiperOptions {
    // Add your custom Swiper options here
    // For example:
    navigation?: Navigation;
    pagination?: Pagination;
    // ...
  }
}


declare module 'swiper/bundle' {
  import Swiper from 'swiper';

  export default Swiper;
}


declare module 'swiper/core' {
  export * from 'swiper';
  export { Navigation } from 'swiper';
  export { Pagination } from 'swiper';
  export { Autoplay } from 'swiper';
  export { EffectFade } from 'swiper';
  // add other modules here if needed
}