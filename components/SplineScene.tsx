'use client';

import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Spline scene="https://prod.spline.design/vEfWrRD-zL3z9TdR/scene.splinecode" />
    </div>
  );
}