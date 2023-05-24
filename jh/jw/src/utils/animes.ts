import type { AnimeParams } from 'animejs'

export const animeSlideLeftDelay = (className = '.anime-item', restOptions?: AnimeParams) => anime({
  targets: className,
  opacity: [0, 1],
  translateX: [400, 0],
  delay: anime.stagger(50),
  ...restOptions,
})

export const animeFadeInDelay = (className = '.anime-item', restOptions?: AnimeParams) => anime({
  targets: className,
  opacity: [0, 1],
  delay: anime.stagger(50),
  ...restOptions,
})

export const animePopup = (className = '.anime-item', restOptions?: AnimeParams) => anime({
  targets: className,
  opacity: [0, 1],
  scale: [0, 1],
  translateX: ['-50%', '-50%'],
  delay: anime.stagger(50),
  ...restOptions,
})

