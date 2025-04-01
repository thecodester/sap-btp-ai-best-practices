"use client";

import { useState } from "react";

export default function TestPage() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <div className="container py-5">
        <h1 className="mb-4">SAP Horizon Theme Components</h1>

        {/* Text Elements */}
        <section className="mb-5">
          <h2>Text Elements</h2>
          <div className="card mb-4">
            <div className="card-body">
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

              {/* Text Colors */}
              <div className="mb-4">
                <h3 className="h5 mb-2">Text Colors</h3>
                <p className="text-primary">Primary text color</p>
                <p className="text-secondary">Secondary text color</p>
                <p className="text-success">Success text color</p>
                <p className="text-danger">Danger text color</p>
                <p className="text-warning">Warning text color</p>
                <p className="text-info">Info text color</p>
                <p className="text-muted">Muted text color</p>
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
                <div className="mb-3">
                  <h4 className="h6">Unordered List</h4>
                  <ul>
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                    <li>Fourth item</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h4 className="h6">Ordered List</h4>
                  <ol>
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                    <li>Fourth item</li>
                  </ol>
                </div>
                <div className="mb-3">
                  <h4 className="h6">Nested Lists</h4>
                  <ul>
                    <li>
                      First level item 1
                      <ul>
                        <li>Second level item 1</li>
                        <li>Second level item 2</li>
                      </ul>
                    </li>
                    <li>
                      First level item 2
                      <ol>
                        <li>Second level item 1</li>
                        <li>Second level item 2</li>
                      </ol>
                    </li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h4 className="h6">Unstyled List</h4>
                  <ul className="list-unstyled">
                    <li>Unstyled list item 1</li>
                    <li>Unstyled list item 2</li>
                    <li>Unstyled list item 3</li>
                  </ul>
                </div>
                <div>
                  <h4 className="h6">Inline List</h4>
                  <ul className="list-inline">
                    <li className="list-inline-item">Inline list item 1</li>
                    <li className="list-inline-item">Inline list item 2</li>
                    <li className="list-inline-item">Inline list item 3</li>
                  </ul>
                </div>
              </div>

              {/* Code */}
              <div className="mb-4">
                <h3 className="h5 mb-2">Code</h3>
                <code>Inline code</code>
                <pre className="bg-light p-3 rounded">
                  <code>{`<div>Block code</div>`}</code>
                </pre>
              </div>

              {/* Abbreviations */}
              <div className="mb-4">
                <h3 className="h5 mb-2">Abbreviations</h3>
                <p>
                  <abbr title="attribute">attr</abbr>
                </p>
                <p>
                  <abbr title="HyperText Markup Language" className="initialism">
                    HTML
                  </abbr>
                </p>
              </div>

              {/* Text Selection */}
              <div className="mb-4">
                <h3 className="h5 mb-2">Text Selection</h3>
                <p className="user-select-all">This paragraph will be entirely selected when clicked by the user.</p>
                <p className="user-select-auto">This paragraph has the default select behavior.</p>
                <p className="user-select-none">This paragraph will not be selectable when clicked by the user.</p>
              </div>

              {/* Text Truncation */}
              <div className="mb-4">
                <h3 className="h5 mb-2">Text Truncation</h3>
                <div className="row">
                  <div className="col-4">
                    <p className="text-truncate">This is a very long text that will be truncated with an ellipsis when it reaches the end of its container.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-5">
          <h2>Typography</h2>
          <div className="card mb-4">
            <div className="card-body">
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <h4>Heading 4</h4>
              <h5>Heading 5</h5>
              <h6>Heading 6</h6>
              <p className="lead">Lead paragraph text</p>
              <p>Regular paragraph text</p>
              <small>Small text</small>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-5">
          <h2>Buttons</h2>
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-primary">Primary Button</button>
                <button className="btn btn-secondary">Secondary Button</button>
                <button className="btn btn-success">Success Button</button>
                <button className="btn btn-danger">Danger Button</button>
                <button className="btn btn-warning">Warning Button</button>
                <button className="btn btn-info">Info Button</button>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary">Outline Primary</button>
                <button className="btn btn-outline-secondary">Outline Secondary</button>
                <button className="btn btn-outline-success">Outline Success</button>
                <button className="btn btn-outline-danger">Outline Danger</button>
                <button className="btn btn-outline-warning">Outline Warning</button>
                <button className="btn btn-outline-info">Outline Info</button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-5">
          <h2>Cards</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-header">Card Header</div>
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">Some quick example text for the card.</p>
                  <button className="btn btn-primary">Go somewhere</button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card without Header</h5>
                  <p className="card-text">Another example of card content.</p>
                  <button className="btn btn-secondary">Action</button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-header bg-primary text-white">Colored Header</div>
                <div className="card-body">
                  <h5 className="card-title">Card with Colored Header</h5>
                  <p className="card-text">Example with a colored header.</p>
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section className="mb-5">
          <h2>Forms</h2>
          <div className="card mb-4">
            <div className="card-body">
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
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="textarea" className="form-label">
                    Textarea
                  </label>
                  <textarea className="form-control" id="textarea" rows={3}></textarea>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="check" />
                  <label className="form-check-label" htmlFor="check">
                    Check me out
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-5">
          <h2>Tabs</h2>
          <div className="card mb-4">
            <div className="card-body">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "tab1" ? "active" : ""}`} onClick={() => setActiveTab("tab1")} type="button" role="tab">
                    Tab 1
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "tab2" ? "active" : ""}`} onClick={() => setActiveTab("tab2")} type="button" role="tab">
                    Tab 2
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "tab3" ? "active" : ""}`} onClick={() => setActiveTab("tab3")} type="button" role="tab">
                    Tab 3
                  </button>
                </li>
              </ul>
              <div className="tab-content mt-3">
                <div className={`tab-pane ${activeTab === "tab1" ? "active" : ""}`}>Content for Tab 1</div>
                <div className={`tab-pane ${activeTab === "tab2" ? "active" : ""}`}>Content for Tab 2</div>
                <div className={`tab-pane ${activeTab === "tab3" ? "active" : ""}`}>Content for Tab 3</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tables */}
        <section className="mb-5">
          <h2>Tables</h2>
          <div className="card mb-4">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                    <th>Header 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Data 1</td>
                    <td>Data 2</td>
                    <td>Data 3</td>
                  </tr>
                  <tr>
                    <td>Data 4</td>
                    <td>Data 5</td>
                    <td>Data 6</td>
                  </tr>
                  <tr>
                    <td>Data 7</td>
                    <td>Data 8</td>
                    <td>Data 9</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Alerts */}
        <section className="mb-5">
          <h2>Alerts</h2>
          <div className="card mb-4">
            <div className="card-body">
              <div className="alert alert-primary" role="alert">
                This is a primary alert
              </div>
              <div className="alert alert-secondary" role="alert">
                This is a secondary alert
              </div>
              <div className="alert alert-success" role="alert">
                This is a success alert
              </div>
              <div className="alert alert-danger" role="alert">
                This is a danger alert
              </div>
              <div className="alert alert-warning" role="alert">
                This is a warning alert
              </div>
              <div className="alert alert-info" role="alert">
                This is an info alert
              </div>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-5">
          <h2>Badges</h2>
          <div className="card mb-4">
            <div className="card-body">
              <span className="badge bg-primary me-2">Primary</span>
              <span className="badge bg-secondary me-2">Secondary</span>
              <span className="badge bg-success me-2">Success</span>
              <span className="badge bg-danger me-2">Danger</span>
              <span className="badge bg-warning me-2">Warning</span>
              <span className="badge bg-info me-2">Info</span>
            </div>
          </div>
        </section>

        {/* Progress Bars */}
        <section className="mb-5">
          <h2>Progress Bars</h2>
          <div className="card mb-4">
            <div className="card-body">
              <div className="progress mb-3">
                <div className="progress-bar" role="progressbar" style={{ width: "25%" }}></div>
              </div>
              <div className="progress mb-3">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: "50%" }}></div>
              </div>
              <div className="progress">
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "75%" }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Dropdowns */}
        <section className="mb-5">
          <h2>Dropdowns</h2>
          <div className="card mb-4">
            <div className="card-body">
              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" onClick={() => setShowDropdown(!showDropdown)}>
                  Dropdown
                </button>
                <ul className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Modals */}
        <section className="mb-5">
          <h2>Modals</h2>
          <div className="card mb-4">
            <div className="card-body">
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Launch Modal
              </button>
            </div>
          </div>

          {showModal && (
            <div className="modal show d-block" tabIndex={-1}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Modal Title</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>Modal body text goes here.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Tooltips */}
        <section className="mb-5">
          <h2>Tooltips</h2>
          <div className="card mb-4">
            <div className="card-body">
              <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
                Tooltip on top
              </button>
              <button type="button" className="btn btn-secondary ms-2" data-bs-toggle="tooltip" data-bs-placement="right" title="Tooltip on right">
                Tooltip on right
              </button>
            </div>
          </div>
        </section>

        {/* Popovers */}
        <section className="mb-5">
          <h2>Popovers</h2>
          <div className="card mb-4">
            <div className="card-body">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="popover"
                title="Popover title"
                data-bs-content="And here's some amazing content. It's very engaging. Right?"
              >
                Click to toggle popover
              </button>
            </div>
          </div>
        </section>

        {/* Spinners */}
        <section className="mb-5">
          <h2>Spinners</h2>
          <div className="card mb-4">
            <div className="card-body">
              <div className="spinner-border text-primary me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-border text-secondary me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-border text-success me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-border text-danger me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-border text-warning me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </section>

        {/* Toasts */}
        <section className="mb-5">
          <h2>Toasts</h2>
          <div className="card mb-4">
            <div className="card-body">
              <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                  <strong className="me-auto">Bootstrap</strong>
                  <small>11 mins ago</small>
                  <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">Hello, world! This is a toast message.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pagination */}
        <section className="mb-5">
          <h2>Pagination</h2>
          <div className="card mb-4">
            <div className="card-body">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="mb-5">
          <h2>Breadcrumbs</h2>
          <div className="card mb-4">
            <div className="card-body">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Library</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </section>

        {/* List Groups */}
        <section className="mb-5">
          <h2>List Groups</h2>
          <div className="card mb-4">
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item active">Active item</li>
                <li className="list-group-item">Second item</li>
                <li className="list-group-item">Third item</li>
                <li className="list-group-item disabled">Disabled item</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Accordion */}
        <section className="mb-5">
          <h2>Accordion</h2>
          <div className="card mb-4">
            <div className="card-body">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                      Accordion Item #1
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">This is the first accordion item&apos;s content.</div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                      Accordion Item #2
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">This is the second accordion item&apos;s content.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
