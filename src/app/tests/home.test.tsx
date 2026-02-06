import { render } from "@testing-library/react";
import Page from "@/src/app/page";

describe("Home snapshot", () => {
  it("should match snapshot", () => {
    const { container } = render(<Page />);
    expect(container).toMatchSnapshot();
  });
});
