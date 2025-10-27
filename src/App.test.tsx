import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders main structure", () => {
    const { container } = render(React.createElement(App));

    expect(container.querySelector(".app")).toBeInTheDocument();
    expect(container.querySelector(".header")).toBeInTheDocument();
    expect(container.querySelector(".main")).toBeInTheDocument();
  });

  it("renders all sections (excluding projects)", () => {
    const { container } = render(React.createElement(App));

    expect(container.querySelector("#hero")).toBeInTheDocument();
    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(container.querySelector("#experience")).toBeInTheDocument();
    expect(container.querySelector("#writing")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });
});
