import compareValues from "./compareValues";

const SAMPLE_DATA = [
  { text: "test", sort: 1 },
  { text: "test", sort: 0 },
  { text: "test", sort: 9 }
];

const SORTED_DATA_ASCENDING = [
  { text: "test", sort: 0 },
  { text: "test", sort: 1 },
  { text: "test", sort: 9 }
];

const SORTED_DATA_DESCENDING = [
  { text: "test", sort: 9 },
  { text: "test", sort: 1 },
  { text: "test", sort: 0 }
];

describe("compareValues", () => {
  it("should format data properly", () => {
    expect(SAMPLE_DATA.sort(compareValues("sort"))).to.eql(
      SORTED_DATA_ASCENDING
    );
  });
  it("should format data properly", () => {
    expect(SAMPLE_DATA.sort(compareValues("sort", "Descending"))).to.eql(
      SORTED_DATA_DESCENDING
    );
  });
});
