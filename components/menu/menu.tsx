import { useEffect, useRef, useState } from "react";

interface MenuProps {
  menu: boolean;
}

interface ChildrenVisibilityState {
  [index: number]: number;
}

export default function Menu(props: MenuProps) {
  const [childrenVisibility, setChildrenVisibility] =
    useState<ChildrenVisibilityState>({});
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const menuDiv = menuRef.current;
    if (!menuDiv) return;

    const allItems = menuDiv.querySelectorAll("*");

    if (props.menu) {
      setChildrenVisibility((prevState) => {
        const newState: ChildrenVisibilityState = { ...prevState };
        allItems.forEach((child, index) => {
          newState[index] = 1;
        });
        return newState;
      });
    } else {
      allItems.forEach((child, index) => {
        setChildrenVisibility((prevState) => ({ ...prevState, [index]: 0 }));
      });
    }
  }, [props.menu]);

  return (
    <div>
      <div className="fixed right-0">
        <h1 className="pl-8 pr-8 mr-6 mt-6 pt-4 pb-4 border border-white rounded-full bg-black">
          Menu
        </h1>
      </div>
      <div
        ref={menuRef}
        id="menu"
        className="h-screen w-screen bg-black fixed top-0 left-0 right-0 bottom-0 flex items-center flex-wrap"
        style={{
          transform: props.menu ? "translateY(0)" : "translateY(-100vh)",
          transition: "1s",
        }}
      >
        <ul className="pl-8 text-4xl self-end">
          <li
            style={{
              opacity: childrenVisibility[0] || 0,
              transition: "opacity 0.5s ease-in-out",
              transitionDelay: "0s",
            }}
          >
            Home
          </li>
          <li
            style={{
              opacity: childrenVisibility[1] || 0,
              transition: "opacity 0.5s ease-in-out",
              transitionDelay: "0.25s",
            }}
          >
            Work
          </li>
          <li
            style={{
              opacity: childrenVisibility[2] || 0,
              transition: "opacity 0.5s ease-in-out",
              transitionDelay: "0.5s",
            }}
          >
            About
          </li>
        </ul>
        <div className="p-8 self-end">
          <h1
            style={{
              opacity: childrenVisibility[3] || 0,
              transition: "opacity 0.5s ease-in-out",
              transitionDelay: "0.75s",
            }}
          >
            tyler@tylerwest.co
          </h1>
          <h1
            style={{
              opacity: childrenVisibility[4] || 0,
              transition: "opacity 0.5s ease-in-out",
              transitionDelay: "1s",
            }}
          >
            Grand Rapids, MI Local time 10:03am
          </h1>
          <ul className="inline-block w-screen flex gap-4">
            <li
              style={{
                opacity: childrenVisibility[5] || 0,
                transition: "opacity 0.5s ease-in-out",
                transitionDelay: "1.25s",
              }}
            >
              Instagram
            </li>
            <li
              style={{
                opacity: childrenVisibility[6] || 0,
                transition: "opacity 0.5s ease-in-out",
                transitionDelay: "1.5s",
              }}
            >
              Linkedin
            </li>
            <li
              style={{
                opacity: childrenVisibility[7] || 0,
                transition: "opacity 0.5s ease-in-out",
                transitionDelay: "1.75s",
              }}
            >
              Behance
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
