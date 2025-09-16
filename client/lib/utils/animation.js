export const ScrollAnimationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
}

export const TextSlideVariants = (duration = 3, y = 100) => {
  return {
  hidden: { 
    opacity: 0, 
    y: y 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: duration,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}
} 