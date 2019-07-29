import React from 'react'

export default function closeRemoveButton({ ariaLabel, fn, fnParam, text }) {
  return (
    <span
      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
      type="button"
      aria-label={ariaLabel}
      className="p-0 bg-0 text-primary"
      onClick={() => (fnParam ? fn(!fnParam) : fn())}
    >
      {text}
    </span>
  )
}
