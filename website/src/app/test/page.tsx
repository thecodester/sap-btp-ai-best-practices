"use client";

import Navbar from "@/components/navigation/NavBar";
import { useState } from "react";

export default function TestPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h1 className="mb-4">Bootstrap Components Test Page</h1>

        {/* Buttons */}
        <section className="mb-5">
          <h2 className="h4 mb-3">Buttons</h2>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-success">Success</button>
            <button className="btn btn-danger">Danger</button>
            <button className="btn btn-warning">Warning</button>
            <button className="btn btn-info">Info</button>
            <button className="btn btn-light">Light</button>
            <button className="btn btn-dark">Dark</button>
            <button className="btn btn-link">Link</button>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-5">
          <h2 className="h4 mb-3">Cards</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">Some quick example text for the card.</p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">Another card with some content.</p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">A third card with different content.</p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section className="mb-5">
          <h2 className="h4 mb-3">Forms</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="select" className="form-label">
                Select
              </label>
              <select className="form-select" id="select">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Checkbox</label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="checkbox1" />
                <label className="form-check-label" htmlFor="checkbox1">
                  Default checkbox
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </section>

        {/* Alerts */}
        <section className="mb-5">
          <h2 className="h4 mb-3">Alerts</h2>
          <div className="alert alert-primary" role="alert">
            A simple primary alert—check it out!
          </div>
          <div className="alert alert-secondary" role="alert">
            A simple secondary alert—check it out!
          </div>
          <div className="alert alert-success" role="alert">
            A simple success alert—check it out!
          </div>
          <div className="alert alert-danger" role="alert">
            A simple danger alert—check it out!
          </div>
          <div className="alert alert-warning" role="alert">
            A simple warning alert—check it out!
          </div>
          <div className="alert alert-info" role="alert">
            A simple info alert—check it out!
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-5">
          <h2 className="h4 mb-3">Tabs</h2>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className={`nav-link ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")} type="button" role="tab">
                Home
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={`nav-link ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")} type="button" role="tab">
                Profile
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={`nav-link ${activeTab === "contact" ? "active" : ""}`} onClick={() => setActiveTab("contact")} type="button" role="tab">
                Contact
              </button>
            </li>
          </ul>
          <div className="tab-content p-3 border border-top-0">
            <div className={`tab-pane fade ${activeTab === "home" ? "show active" : ""}`} role="tabpanel">
              Home content
            </div>
            <div className={`tab-pane fade ${activeTab === "profile" ? "show active" : ""}`} role="tabpanel">
              Profile content
            </div>
            <div className={`tab-pane fade ${activeTab === "contact" ? "show active" : ""}`} role="tabpanel">
              Contact content
            </div>
          </div>
        </section>

        {/* Progress Bars */}
        <section className="mb-5">
          <h2 className="h4 mb-3">Progress Bars</h2>
          <div className="progress mb-3">
            <div className="progress-bar" role="progressbar" style={{ width: "0%" }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
          <div className="progress mb-3">
            <div className="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
          <div className="progress mb-3">
            <div className="progress-bar" role="progressbar" style={{ width: "50%" }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
          <div className="progress mb-3">
            <div className="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: "100%" }} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-5">
          <h2 className="h4 mb-3">Badges</h2>
          <div className="d-flex gap-2 flex-wrap">
            <span className="badge bg-primary">Primary</span>
            <span className="badge bg-secondary">Secondary</span>
            <span className="badge bg-success">Success</span>
            <span className="badge bg-danger">Danger</span>
            <span className="badge bg-warning text-dark">Warning</span>
            <span className="badge bg-info text-dark">Info</span>
            <span className="badge bg-light text-dark">Light</span>
            <span className="badge bg-dark">Dark</span>
          </div>
        </section>

        {/* Text Components */}
        <section className="mb-5">
          <h2 className="h4 mb-3">Text Components</h2>

          {/* Headings */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Headings</h3>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
          </div>

          {/* Display Headings */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Display Headings</h3>
            <h1 className="display-1">Display 1</h1>
            <h1 className="display-2">Display 2</h1>
            <h1 className="display-3">Display 3</h1>
            <h1 className="display-4">Display 4</h1>
            <h1 className="display-5">Display 5</h1>
            <h1 className="display-6">Display 6</h1>
          </div>

          {/* Lead Text */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Lead Text</h3>
            <p className="lead">This is a lead paragraph. It stands out from regular paragraphs.</p>
          </div>

          {/* Regular Text */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Regular Text</h3>
            <p>
              This is a regular paragraph with some text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>
            <p>This is another paragraph to demonstrate spacing between paragraphs.</p>
          </div>

          {/* Text Utilities */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Text Utilities</h3>
            <p className="text-primary">Primary text color</p>
            <p className="text-secondary">Secondary text color</p>
            <p className="text-success">Success text color</p>
            <p className="text-danger">Danger text color</p>
            <p className="text-warning">Warning text color</p>
            <p className="text-info">Info text color</p>
            <p className="text-light bg-dark">Light text color</p>
            <p className="text-dark">Dark text color</p>
          </div>

          {/* Text Alignment */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Text Alignment</h3>
            <p className="text-start">Left aligned text</p>
            <p className="text-center">Center aligned text</p>
            <p className="text-end">Right aligned text</p>
          </div>

          {/* Text Transform */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Text Transform</h3>
            <p className="text-lowercase">LOWERCASED TEXT</p>
            <p className="text-uppercase">uppercased text</p>
            <p className="text-capitalize">capitalized text</p>
          </div>

          {/* Font Weight and Style */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Font Weight and Style</h3>
            <p className="fw-bold">Bold text</p>
            <p className="fw-bolder">Bolder text</p>
            <p className="fw-semibold">Semibold text</p>
            <p className="fw-normal">Normal text</p>
            <p className="fw-light">Light text</p>
            <p className="fw-lighter">Lighter text</p>
            <p className="fst-italic">Italic text</p>
            <p className="fst-normal">Normal font style</p>
          </div>

          {/* Text Decoration */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Text Decoration</h3>
            <p className="text-decoration-underline">Underlined text</p>
            <p className="text-decoration-line-through">Line-through text</p>
            <p className="text-decoration-none">No decoration text</p>
          </div>

          {/* Blockquotes */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Blockquotes</h3>
            <blockquote className="blockquote">
              <p>A well-known quote, contained in a blockquote element.</p>
            </blockquote>
            <blockquote className="blockquote">
              <p>A well-known quote, contained in a blockquote element.</p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </div>

          {/* Lists */}
          <div className="mb-4">
            <h3 className="h5 mb-2">Lists</h3>
            <ul className="list-unstyled">
              <li>Unstyled list item 1</li>
              <li>Unstyled list item 2</li>
              <li>Unstyled list item 3</li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">Inline list item 1</li>
              <li className="list-inline-item">Inline list item 2</li>
              <li className="list-inline-item">Inline list item 3</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
