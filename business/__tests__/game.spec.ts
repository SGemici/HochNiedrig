import { exp } from "react-native-reanimated";
import { Game } from "../game";

describe("game", () => {
  describe("init", () => {
    it("creates first and second player", () => {
      const game = new Game();
      expect(game.firstPlayer).toBeDefined();
      expect(game.secondPlayer).toBeDefined();
    });
  });
});
