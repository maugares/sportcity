import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchData, getClubsInfo } from "../fetchData";

describe("fetchData", () => {
  let mockAxios: MockAdapter;
  beforeEach(() => (mockAxios = new MockAdapter(axios)));
  afterEach(() => mockAxios.reset());

  describe("fetchData", () => {
    it("returns data when request is successful", async () => {
      const data = { result: "success" };
      mockAxios.onGet("http://test.com").reply(200, data);

      const result = await fetchData({ url: "http://test.com" });
      expect(result).toEqual(data);
    });

    it("throws error when request fails", async () => {
      mockAxios.onGet("http://test.com").reply(500);

      await expect(fetchData({ url: "http://test.com" })).rejects.toThrow();
    });

    it("sends request with correct headers", async () => {
      const data = { result: "success" };
      mockAxios.onGet("http://test.com").reply(function (config) {
        expect(config.headers).toMatchObject({
          Accept: "application/json, text/plain, */*",
          Origin: "http://yourdomain.com",
          "X-Requested-With": "XMLHttpRequest",
        });
        return [200, data];
      });

      await fetchData({ url: "http://test.com" });
    });
  });

  describe("getClubsInfo", () => {
    it("returns clubs when request is successful", async () => {
      const data = {
        1: {
          id: 1,
          name: "Club 1",
          address: "Address 1",
          city: "City 1",
          postalCode: "PostalCode 1",
          latitude: "Latitude 1",
          longitude: "Longitude 1",
          cms: { slug: "Slug 1" },
        },
      };
      mockAxios.onGet("https://www.sportcity.nl/api/clubs").reply(200, data);

      const result = await getClubsInfo();
      expect(result).toEqual([
        {
          id: 1,
          name: "Club 1",
          address: "Address 1",
          city: "City 1",
          postalCode: "PostalCode 1",
          latitude: "Latitude 1",
          longitude: "Longitude 1",
          slug: "Slug 1",
        },
      ]);
    });

    it("throws error when request fails", async () => {
      mockAxios.onGet("https://www.sportcity.nl/api/clubs").reply(500);

      await expect(getClubsInfo()).rejects.toThrow();
    });

    it("returns empty array when no clubs are found", async () => {
      mockAxios.onGet("https://www.sportcity.nl/api/clubs").reply(200, {});

      const result = await getClubsInfo();
      expect(result).toEqual([]);
    });
  });
});
