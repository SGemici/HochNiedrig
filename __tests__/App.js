import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import App from "../App.tsx";

// Note: test renderer must be required after react-native.

it("renders correctly", () => {
  const app = renderer.create(<App />);
  expect(app).not.toBeNull();
});
