import React from 'react'
import { Carousel } from 'flowbite-react';

const MovieCarousal = () => {
  return (
    <div className="w-[95%] mx-auto mt-10 h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src="https://collider.com/wp-content/uploads/dark-knight-rises-movie-poster-banner-catwoman.jpg" alt="..." />
        <img src="https://www.etherapeutics.co.uk/application/themes/design_portfolio/img/placeholder-banner.jpg" alt="..." />
        <img src="https://w0.peakpx.com/wallpaper/700/371/HD-wallpaper-joker-movie-8k-banner.jpg" alt="..." />
        <img src="https://img.freepik.com/premium-vector/blue-abstract-vector-long-banner-minimal-background-with-arrows-copy-space-text-social-media-cover-web-banner-template_181182-38747.jpg" alt="..." />
        <img src="https://preview.redd.it/made-this-anime-banner-in-pixlr-v0-eni9yujjzvxa1.jpg?auto=webp&s=8b871c713fdb41aaf0c08702857ba0e8464534cf" alt="..." />
      </Carousel>
    </div>
  )
}

export default MovieCarousal