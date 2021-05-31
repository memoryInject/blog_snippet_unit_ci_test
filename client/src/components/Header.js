import { useRef, useEffect, useState } from "react";
import M from "materialize-css";
const Header = () => {
  const [hover, setHover] = useState(true);
  const elems = useRef(null);
  useEffect(() => {
    if (hover === true) {
      setHover(false);
    }
    M.Sidenav.init(elems.current);
  }, [hover]);

  return (
    <>
      <nav className="deep-purple darken-2 nav-extended">
        <div className="container">
          <div className="nav-wrapper">
            <a
              href="#!"
              className="brand-logo"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              BLOG SNIPPET
            </a>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="#!">
                  <span
                    className="material-icons"
                    style={{ position: "relative", top: "6px" }}
                  >
                    article
                  </span>{" "}
                  My Blogs
                </a>
              </li>
              <li>
                <a href="#!">
                  <span
                    className="material-icons"
                    style={{ position: "relative", top: "6px" }}
                  >
                    person
                  </span>{" "}
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="#!">My Blogs</a>
        </li>
        <li>
          <a href="#!">Login</a>
        </li>
      </ul>
    </>
  );
};

export default Header;
