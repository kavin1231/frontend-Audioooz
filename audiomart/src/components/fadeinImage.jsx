/* eslint-disable jsx-a11y/alt-text */
import { LazyMotion, domAnimation, m, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const animationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const FadeInImage = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const animationControls = useAnimation();

  useEffect(() => {
    if (isLoaded) {
      animationControls.start("visible");
    }
  }, [isLoaded, animationControls]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        animate={animationControls}
        initial="hidden"
        transition={{ duration: 0.5, ease: "easeOut" }}
        variants={animationVariants}
      >
        {/* Replace this with next/image if in Next.js */}
        <img {...props} onLoad={() => setIsLoaded(true)} />
      </m.div>
    </LazyMotion>
  );
};

export default FadeInImage;
