import { useEffect } from "react";

const useAnimateSections = (transitionStyle = "opacity 0.5s") => {
  useEffect(() => {
    const animatedSections = new Set();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const animateSection = entry.target;
        const childElements = Array.from(
          animateSection.querySelectorAll<HTMLElement>(":scope > *")
        );

        if (entry.isIntersecting && !animatedSections.has(animateSection)) {
          animatedSections.add(animateSection);
          childElements.forEach((element, index) => {
            element.style.transition = `${transitionStyle}, transform 0.5s`;
            element.style.transitionDelay = `${index * 200}ms`;
            element.style.transform = "translateY(0)";
            element.style.opacity = "1";
          });
        } else if (
          !entry.isIntersecting &&
          !animatedSections.has(animateSection)
        ) {
          childElements.forEach((element) => {
            element.style.transition = `${transitionStyle}, transform 0.5s`;
            element.style.transitionDelay = "0ms";
            element.style.transform = "translateY(100px)"; // Change starting translateY to 100px
            element.style.opacity = "0";
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });

    const animateSections =
      document.querySelectorAll<HTMLElement>("#animateSection");
    animateSections.forEach((animateSection) => {
      const childElements = Array.from(
        animateSection.querySelectorAll<HTMLElement>(":scope > *")
      );

      childElements.forEach((element) => {
        element.style.transition = `${transitionStyle}, transform 0.5s`;
        element.style.transitionDelay = "0ms";
        element.style.transform = "translateY(100px)"; // Change starting translateY to 100px
        element.style.opacity = "0";
      });

      observer.observe(animateSection);
    });

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures one-time execution

  return null; // The hook doesn't need to return anything meaningful
};

export default useAnimateSections;
