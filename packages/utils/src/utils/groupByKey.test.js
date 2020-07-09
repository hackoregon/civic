import groupByKey from "./groupByKey";

const SAMPLE_DATA = [
  { name: "Poodle", x: "2017", y: 7 },
  { name: "Terrier", x: "2017", y: 2 },
  { name: "Bulldog", x: "2017", y: 3 },
  { name: "Poodle", x: "2018", y: 2 },
  { name: "Terrier", x: "2018", y: 5 },
  { name: "Bulldog", x: "2018", y: 4 },
  { name: "Poodle", x: "2019", y: 1 },
  { name: "Terrier", x: "2019", y: 2 },
  { name: "Bulldog", x: "2019", y: 3 }
];

const FORMATTED_DATA = [
  [
    { name: "Poodle", x: "2017", y: 7 },
    { name: "Poodle", x: "2018", y: 2 },
    { name: "Poodle", x: "2019", y: 1 }
  ],
  [
    { name: "Terrier", x: "2017", y: 2 },
    { name: "Terrier", x: "2018", y: 5 },
    { name: "Terrier", x: "2019", y: 2 }
  ],
  [
    { name: "Bulldog", x: "2017", y: 3 },
    { name: "Bulldog", x: "2018", y: 4 },
    { name: "Bulldog", x: "2019", y: 3 }
  ]
];

const UNSTRUCTURED_DATA = [
  { name: "Poodle", x: "2017", y: 7 },
  { name: "Terrier", x: "2019", y: 2 },
  { name: "Poodle", x: "2018", y: 2 },
  { name: "Terrier", x: "2018", y: 5 },
  { name: "Poodle", x: "2019", y: 1 },
  { name: "Bulldog", x: "2018", y: 4 },
  { name: "Terrier", x: "2017", y: 2 },
  { name: "Bulldog", x: "2017", y: 3 },
  { name: "Bulldog", x: "2019", y: 3 },
  { name: "Poodle", x: "2035", y: 10 }
];

const FORMATTED_UNSTRUCTURED_DATA = [
  [
    { name: "Poodle", x: "2017", y: 7 },
    { name: "Poodle", x: "2018", y: 2 },
    { name: "Poodle", x: "2019", y: 1 },
    { name: "Poodle", x: "2035", y: 10 }
  ],
  [
    { name: "Terrier", x: "2017", y: 2 },
    { name: "Terrier", x: "2018", y: 5 },
    { name: "Terrier", x: "2019", y: 2 }
  ],
  [
    { name: "Bulldog", x: "2017", y: 3 },
    { name: "Bulldog", x: "2018", y: 4 },
    { name: "Bulldog", x: "2019", y: 3 }
  ]
];

describe("groupByKey", () => {
  it("should format data properly", () => {
    expect(groupByKey(SAMPLE_DATA, "name", "x")).to.eql(FORMATTED_DATA);
  });

  it("should format unstructured data properly", () => {
    expect(groupByKey(UNSTRUCTURED_DATA, "name", "x")).to.eql(
      FORMATTED_UNSTRUCTURED_DATA
    );
  });
});
