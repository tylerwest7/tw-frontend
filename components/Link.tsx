import { useEffect, useContext } from "react";
import NextLink, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, memo } from "react";
import { AppContext } from "@/app/layout";

const Link = memo(
  (props: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const lenis = useContext(AppContext)?.lenis;

    useEffect(() => {
      const handleLinkClick = (e: MouseEvent) => {
        if (
          (!props.target || props.target === "_self") &&
          props.scroll !== false
        ) {
          e.preventDefault();
          lenis?.scrollTo(0, {
            immediate: true,
          });

          // Use window.location.href to navigate
          window.location.href = props.href as unknown as string;
        }
      };

      const linkElement = document.querySelector(
        `a[href="${props.href}"]`
      ) as HTMLAnchorElement | null;

      if (linkElement) {
        linkElement.addEventListener("click", handleLinkClick);
        return () => {
          linkElement.removeEventListener("click", handleLinkClick);
        };
      }
    }, [props.href, lenis]);

    return <NextLink {...props} />;
  }
);

export default Link;
