import React from 'react'

interface ShapeRendererProps {
  shapes: string[]
  colors: string[]
  size?: 'small' | 'medium' | 'large'
}

const ShapeRenderer: React.FC<ShapeRendererProps> = ({ shapes, colors, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20'
  }

  const colorMap: Record<string, string> = {
    blue: '#3B82F6',
    red: '#EF4444',
    green: '#10B981',
    purple: '#A855F7',
    orange: '#F97316',
    cyan: '#06B6D4',
    pink: '#EC4899',
    yellow: '#EAB308',
    indigo: '#6366F1'
  }

  const renderShape = (shape: string, color: string, index: number) => {
    const fillColor = colorMap[color] || '#6B7280'
    const baseClass = `${sizeClasses[size]} flex-shrink-0`

    // Handle different shape types
    if (shape.includes('circle')) {
      const isFilled = shape.includes('filled')
      const isOutline = shape.includes('outline')

      return (
        <div key={index} className={`${baseClass} rounded-full ${isFilled ? '' : 'border-4'}`}
          style={{
            backgroundColor: isFilled || (!isOutline && !isFilled) ? fillColor : 'transparent',
            borderColor: isOutline ? fillColor : 'transparent'
          }}
        />
      )
    }

    if (shape.includes('square')) {
      return (
        <div key={index} className={baseClass}
          style={{ backgroundColor: fillColor }}
        />
      )
    }

    if (shape.includes('triangle')) {
      return (
        <div key={index} className={`${baseClass} relative`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 90,90 10,90" fill={fillColor} />
          </svg>
        </div>
      )
    }

    if (shape.includes('pentagon')) {
      return (
        <div key={index} className={`${baseClass} relative`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,35 80,85 20,85 5,35" fill={fillColor} />
          </svg>
        </div>
      )
    }

    if (shape.includes('hexagon')) {
      return (
        <div key={index} className={`${baseClass} relative`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill={fillColor} />
          </svg>
        </div>
      )
    }

    if (shape.includes('arrow')) {
      const direction = shape.split('-')[1] // up, down, left, right
      const rotations: Record<string, number> = {
        up: 0,
        right: 90,
        down: 180,
        left: 270
      }

      return (
        <div key={index} className={`${baseClass} relative`}>
          <svg viewBox="0 0 100 100" className="w-full h-full"
            style={{ transform: `rotate(${rotations[direction]}deg)` }}>
            <polygon points="50,10 70,40 60,40 60,90 40,90 40,40 30,40" fill={fillColor} />
          </svg>
        </div>
      )
    }

    if (shape.includes('dot')) {
      const count = parseInt(shape.split('-')[0]) || 1

      return (
        <div key={index} className={`${baseClass} flex flex-wrap gap-1 items-center justify-center p-2`}>
          {Array.from({ length: Math.min(count, 16) }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: fillColor }}
            />
          ))}
        </div>
      )
    }

    // Default fallback
    return (
      <div key={index} className={`${baseClass} rounded-lg`}
        style={{ backgroundColor: fillColor }}
      />
    )
  }

  return (
    <div className="flex items-center gap-4 flex-wrap justify-center p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/20">
      {shapes.map((shape, index) => renderShape(shape, colors[index], index))}
      <div className="text-3xl text-purple-400 font-bold">?</div>
    </div>
  )
}

export default ShapeRenderer
