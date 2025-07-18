import { useEffect, useRef } from "react";

export default function SideBar({ children, isOpenSidebar, onOpenSideBar }) {
  const sidebarRef = useRef(null);

  useEffect(
    function () {
      function hanldeClick(e) {
        if (e.code === "Escape") onOpenSideBar(false);
      }

      document.body.addEventListener("keydown", hanldeClick);

      return function () {
        document.body.removeEventListener("keydown", hanldeClick);
      };
    },
    [sidebarRef]
  );

  return (
    <aside
      className={`sidebar ${isOpenSidebar ? "active" : ""}`}
      ref={sidebarRef}
    >
      {children}
    </aside>
  );
}
