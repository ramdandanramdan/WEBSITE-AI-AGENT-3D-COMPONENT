'use client'

import { Suspense, lazy, useEffect, useRef, useCallback } from 'react'
import type { Application } from '@splinetool/runtime'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const appRef = useRef<Application | null>(null)

  const handleLoad = useCallback((splineApp: Application) => {
    appRef.current = splineApp
    splineApp.setGlobalEvents(true)

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = splineApp.canvas
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      canvas.dispatchEvent(new PointerEvent('pointermove', {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        pointerId: 1,
        pointerType: 'mouse',
      }))

      canvas.dispatchEvent(new MouseEvent('mousemove', {
        clientX: x,
        clientY: y,
        bubbles: true,
      }))
    }

    window.addEventListener('mousemove', handleMouseMove)
    appRef.current = splineApp
  }, [])

  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
          onLoad={handleLoad}
        />
      </Suspense>
    </div>
  )
}
