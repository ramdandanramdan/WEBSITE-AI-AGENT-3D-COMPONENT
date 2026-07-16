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

    const canvas = splineApp.canvas
    if (!canvas) return

    const emit = (type: string, init: any) => {
      try {
        canvas.dispatchEvent(new (window as any)[type](type, init))
      } catch {}
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      emit('PointerEvent', {
        type: 'pointermove',
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        pointerId: 1,
        pointerType: 'mouse',
      })
      emit('MouseEvent', {
        type: 'mousemove',
        clientX: e.clientX - rect.left,
        clientY: e.clientY - rect.top,
        bubbles: true,
      })
    }

    const handleMouseEnter = () => {
      emit('MouseEvent', { type: 'mouseenter', bubbles: true })
    }

    const handleMouseDown = (e: MouseEvent) => {
      emit('PointerEvent', {
        type: 'pointerdown',
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        pointerId: 1,
        pointerType: 'mouse',
        button: e.button,
        buttons: e.buttons,
      })
    }

    const handleMouseUp = (e: MouseEvent) => {
      emit('PointerEvent', {
        type: 'pointerup',
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        pointerId: 1,
        pointerType: 'mouse',
        button: e.button,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true })
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
