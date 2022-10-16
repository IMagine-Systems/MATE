import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function NoProfileImageSvg() {
  return (
    <Svg width={60} height={60} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30Z"
        fill="#D9D9D9"
      />
      <Path
        d="M39.45 20.95c0 5.494-4.455 9.949-9.95 9.949-5.495 0-9.95-4.455-9.95-9.95 0-5.495 4.455-9.949 9.95-9.949 5.495 0 9.95 4.454 9.95 9.95ZM45.505 42.579c0 5.495-7.166 6.92-16.005 6.92-8.84 0-16.006-1.425-16.006-6.92s7.166-9.95 16.006-9.95 16.005 4.455 16.005 9.95Z"
        fill="#fff"
      />
      <Path
        d="M60 50.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
        fill="#007AFF"
      />
      <Path
        d="M51.88 53.68h1.308v-2.544h2.424v-1.26h-2.424V47.32H51.88v2.556h-2.424v1.26h2.424v2.544Z"
        fill="#fff"
      />
    </Svg>
  );
}
