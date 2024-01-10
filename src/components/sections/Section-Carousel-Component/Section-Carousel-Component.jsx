import Slider from 'react-slick';
import classes from "./Section-Carousel-Component.module.css";

const SectionCarouselComponent = (props) => {

    const settings = {
        draggable: true,
        dots: false,
        infinite: true,
        autoplay: true,
        arrows: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnFocus: true,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
    };

    return (
        <div className={classes['section-carousel-component']}>
            <Slider {...settings}>
              {props.children}
            </Slider>
        </div>
    )
}

export default SectionCarouselComponent;