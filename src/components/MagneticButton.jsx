import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

// Reusable magnetic button/link that gently follows the cursor.
export function MagneticButton({ as = 'button', className = '', children, ...props }) {
  const shouldReduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 })

  function handleMouseMove(event) {
    if (shouldReduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5

    x.set(relativeX * 10)
    y.set(relativeY * 10)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const MotionComponent = motion[as] || motion.button

  return (
    <MotionComponent
      {...props}
      className={className}
      style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {children}
    </MotionComponent>
  )
}
