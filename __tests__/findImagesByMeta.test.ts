import { findImagesByMetaData } from "../src/app/utils/utils";
import allImages from "./fixtures/allImages.json";

describe("findImagesByMeta", () => {
  describe("there are no images", () => {
    it("should throw an error", () => {
      const images = undefined as unknown as PropsImage[];

      expect(() => {
        findImagesByMetaData("Daniel", "author", images);
      }).toThrow("Error: Images must be provided or an empty array");
    });
  });

  describe("no match", () => {
    it("should return an empty array", () => {
      const res = findImagesByMetaData(
        "Someone named Esperdrille",
        "author",
        allImages
      );

      expect(res).toEqual([]);
    });
  });

  describe("a single match", () => {
    it("should return an array of one item", () => {
      const res = findImagesByMetaData("Rodrigo Melo", "author", allImages);

      const expected = [
        {
          id: "32",
          author: "Rodrigo Melo",
          width: 4032,
          height: 3024,
          url: "https://unsplash.com/photos/eG3k60PrTGY",
          download_url: "https://picsum.photos/id/32/4032/3024",
        },
      ];

      expect(res).toEqual(expected);
    });
  });

  describe("seven matches", () => {
    it.todo("should return an array seven items");
  });
});
