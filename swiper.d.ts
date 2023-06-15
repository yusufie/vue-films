declare module 'swiper' {
  import { NavigationOptions, PaginationOptions } from 'swiper';

  export interface SwiperOptions {
    navigation?: NavigationOptions;
    pagination?: PaginationOptions;
  }
}