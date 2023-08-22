import React, { useRef, useEffect, useState } from "react";
import animationData from "../../public/lottie/arrow.json";
import lottie, { AnimationItem } from "lottie-web";

interface LottieAnimationProps {
  animHovered: boolean;
  index: any;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animHovered,
  index,
}) => {
  const animationContainerRef = useRef<HTMLDivElement | null>(null);
  const [animationInstances, setAnimationInstances] = useState<
    Array<AnimationItem | null>
  >([]);

  useEffect(() => {
    if (animationContainerRef.current) {
      const newInstance = lottie.loadAnimation({
        container: animationContainerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData: animationData,
      });

      setAnimationInstances((prevInstances) => {
        const instancesCopy = [...prevInstances];
        instancesCopy[index] = newInstance;
        return instancesCopy;
      });

      return () => {
        if (newInstance) {
          newInstance.destroy();
        }
      };
    }
  }, [index]);

  return (
    <div id={index} className="flex justify-end items-center color">
      <div ref={animationContainerRef} className="h-4 lg:h-9" />
    </div>
  );
};

export default LottieAnimation;
