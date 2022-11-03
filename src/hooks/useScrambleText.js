import { useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import usePrefersReducedMotion from './usePrefersReducedMotion'

const useScrambleText = () => {
  const prefersReducedMotion = usePrefersReducedMotion()

  gsap.registerPlugin(ScrambleTextPlugin)
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const textWrappers = document.querySelectorAll('.scrambleTextWrapper')
    textWrappers.forEach(wrapper => {
      let cloned
      const text = wrapper.querySelector('.scrambleText')

      if (text.nodeName === 'H1') {
        cloned = document.createElement('span')
        cloned.innerHTML = text.innerHTML
        cloned.classList = text.classList
      } else {
        cloned = text.cloneNode(true)
      }

      cloned.classList.add('is-cloned')
      cloned.setAttribute('aria-hidden', 'true')
      wrapper.appendChild(cloned)

      const lines = cloned.querySelectorAll('.line')
      lines.forEach(line =>
        gsap.to(line, {
          duration: prefersReducedMotion ? 0 : 1.2,
          scrambleText: {
            text: line.innerHTML,
            chars: '!@#$%&/=*',
          },
          scrollTrigger: {
            scroller: '.mainWrapper',
            trigger: wrapper,
            start: 'top 75%',
          },
        }),
      )

      gsap.to(lines, {
        opacity: 1,
        duration: prefersReducedMotion ? 0 : 0.6,
        stagger: 0.2,
        scrollTrigger: {
          scroller: '.mainWrapper',
          trigger: wrapper,
          start: 'top 75%',
        },
      })
    })
  }, [])
}

export default useScrambleText
