import React from 'react'

const Logo = ({className}) => {
  return (
    <svg width="200" height="200" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"   className={className}>
  <defs>
    <path id="petal"
          d="M0,-110
             C 30,-95 50,-65 38,-30
             C 24,0 12,22 0,48
             C -12,22 -24,0 -38,-30
             C -50,-65 -30,-95 0,-110 Z" />
  </defs>


  <g id="petalGroup" transform="translate(200,160)" opacity="1">

    <g transform="rotate(0)" opacity="0">
      <use href="#petal" fill="#174193"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="0s" fill="freeze" />
    </g>

    <g transform="rotate(30)" opacity="0">
      <use href="#petal" fill="#0C6F9B"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="0.12s" fill="freeze" />
    </g>

    <g transform="rotate(60)" opacity="0">
      <use href="#petal" fill="#0C917C"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="0.24s" fill="freeze" />
    </g>

    <g transform="rotate(90)" opacity="0">
      <use href="#petal" fill="#19A85D"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="0.36s" fill="freeze" />
    </g>

    <g transform="rotate(120)" opacity="0">
      <use href="#petal" fill="#8FB632"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="0.48s" fill="freeze" />
    </g>

    <g transform="rotate(150)" opacity="0">
      <use href="#petal" fill="#F2C230"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="0.60s" fill="freeze" />
    </g>

    <g transform="rotate(180)" opacity="0">
      <use href="#petal" fill="#F49B21"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="0.72s" fill="freeze" />
    </g>

    <g transform="rotate(210)" opacity="0">
      <use href="#petal" fill="#EB5B22"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="0.84s" fill="freeze" />
    </g>

    <g transform="rotate(240)" opacity="0">
      <use href="#petal" fill="#CF2336"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="0.96s" fill="freeze" />
    </g>

    <g transform="rotate(270)" opacity="0">
      <use href="#petal" fill="#A2195C"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="1.08s" fill="freeze" />
    </g>

    <g transform="rotate(300)" opacity="0">
      <use href="#petal" fill="#6D2077"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="1.20s" fill="freeze" />
    </g>

    <g transform="rotate(330)" opacity="0">
      <use href="#petal" fill="#2F3F8F"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="1.32s" fill="freeze" />
    </g>

    <animate id="petalGroupFadeOut"
             attributeName="opacity"
             from="1" to="0"
             dur="0.4s"
             begin="1.7s"
             fill="freeze" />
  </g>
</svg>

  )
}

export default Logo