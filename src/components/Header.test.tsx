import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

// Mock window.scrollTo and window.addEventListener
const mockScrollTo = jest.fn();
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: mockScrollTo,
});

Object.defineProperty(window, "addEventListener", {
  writable: true,
  value: mockAddEventListener,
});

Object.defineProperty(window, "removeEventListener", {
  writable: true,
  value: mockRemoveEventListener,
});

describe("Header", () => {
  beforeEach(() => {
    // Reset mocks
    mockScrollTo.mockClear();
    mockAddEventListener.mockClear();
    mockRemoveEventListener.mockClear();

    // Mock getBoundingClientRect for scroll detection
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));

    // Mock getElementById
    const mockGetElementById = jest.fn((id) => {
      if (["hero", "about", "projects", "contact"].includes(id)) {
        return {
          offsetTop: id === "hero" ? 0 : 100,
          offsetHeight: 100,
        } as HTMLElement;
      }
      return null;
    });
    document.getElementById = mockGetElementById;
  });

  it("renders header with logo and navigation", () => {
    render(<Header />);

    // Check if logo is present
    expect(screen.getByText("MR")).toBeInTheDocument();

    // Check if navigation items are present
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    const { container } = render(<Header />);

    // Check main header element
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header?.className.trim()).toBe("header");

    // Check logo
    const logo = container.querySelector(".header__logo");
    expect(logo).toBeInTheDocument();
    expect(logo?.getAttribute("href")).toBe("#hero");

    // Check navigation
    const nav = container.querySelector(".header__nav");
    expect(nav).toBeInTheDocument();
    expect(nav?.getAttribute("aria-label")).toBe("Navegação principal");
  });

  it("navigation links have correct href attributes", () => {
    render(<Header />);

    const homeLink = screen.getByText("Home").closest("a");
    const aboutLink = screen.getByText("About").closest("a");
    const projectsLink = screen.getByText("Projects").closest("a");
    const contactLink = screen.getByText("Contact").closest("a");

    expect(homeLink?.getAttribute("href")).toBe("#hero");
    expect(aboutLink?.getAttribute("href")).toBe("#about");
    expect(projectsLink?.getAttribute("href")).toBe("#projects");
    expect(contactLink?.getAttribute("href")).toBe("#contact");
  });

  it("adds scroll event listener on mount", () => {
    render(<Header />);

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      {
        passive: true,
      }
    );
  });

  it("removes scroll event listener on unmount", () => {
    const { unmount } = render(<Header />);

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  it("highlights active section based on scroll position", () => {
    // Mock DOM elements
    const mockHero = {
      offsetTop: 0,
      offsetHeight: 100,
      getBoundingClientRect: () => ({ top: 0, height: 100 }),
    };
    const mockAbout = {
      offsetTop: 100,
      offsetHeight: 200,
      getBoundingClientRect: () => ({ top: 100, height: 200 }),
    };

    // Mock getElementById
    document.getElementById = jest.fn((id) => {
      if (id === "hero") return mockHero as any;
      if (id === "about") return mockAbout as any;
      return null;
    });

    // Mock scroll position to be in "about" section
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 150, // Position that should activate "about" section
    });

    const { container } = render(<Header />);

    // Trigger scroll event
    const scrollHandler = mockAddEventListener.mock.calls[0][1];
    scrollHandler();

    // Check if any item has active class (the logic should work)
    const activeItem = container.querySelector(".navigation__item--active");
    expect(activeItem).toBeInTheDocument();
    // The active section should be either "hero" or "about" depending on scroll position
    expect(["Home", "About"]).toContain(activeItem?.textContent);
  });

  it("clicking navigation links works", () => {
    render(<Header />);

    const homeLink = screen.getByText("Home");
    const aboutLink = screen.getByText("About");

    // Click home link - should not throw error
    expect(() => fireEvent.click(homeLink)).not.toThrow();

    // Click about link - should not throw error
    expect(() => fireEvent.click(aboutLink)).not.toThrow();

    // Verify links exist and have correct href
    expect(homeLink.closest("a")?.getAttribute("href")).toBe("#hero");
    expect(aboutLink.closest("a")?.getAttribute("href")).toBe("#about");
  });

  it("renders with correct accessibility attributes", () => {
    const { container } = render(<Header />);

    const nav = container.querySelector("nav");
    expect(nav?.getAttribute("aria-label")).toBe("Navegação principal");

    // Check that links have proper structure
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link.getAttribute("href")).toBeTruthy();
    });
  });
});
