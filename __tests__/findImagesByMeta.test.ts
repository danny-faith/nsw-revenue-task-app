import { findImagesByMetaData } from "../src/app/utils/utils";

describe("findImagesByMeta", () => {
  describe("there are no images", () => {
    it("should throw an error", () => {
      const images = undefined as unknown as PropsImage[];

      expect(() => {
        findImagesByMetaData("Daniel", "author", images);
      }).toThrow("Error: Images must be provided or an empty array");
    });
  });
});
