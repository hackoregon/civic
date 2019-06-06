import civicFormat from "./civicFormat";

describe("civicFormat", () => {
  it("should format numbers correctly", () => {
    expect(civicFormat.numeric(0.1)).to.eql("0");
    expect(civicFormat.numeric(0.5)).to.eql("1");
    expect(civicFormat.numeric(1000)).to.eql("1,000");
    expect(civicFormat.numeric(1500)).to.eql("1,500");
    expect(civicFormat.numeric(1000000)).to.eql("1 million");
    expect(civicFormat.numeric(7300000)).to.eql("7.3 million");
    expect(civicFormat.numeric(-7300000)).to.eql("-7.3 million");
    expect(civicFormat.numeric(73000000000)).to.eql("73 billion");
  });

  it("should abbriviate numbers correctly", () => {
    expect(civicFormat.numericShort(0.1)).to.eql("0");
    expect(civicFormat.numericShort(0.5)).to.eql("1");
    expect(civicFormat.numericShort(1000)).to.eql("1k");
    expect(civicFormat.numericShort(1500)).to.eql("1.5k");
    expect(civicFormat.numericShort(1000000)).to.eql("1m");
    expect(civicFormat.numericShort(7300000)).to.eql("7.3m");
    expect(civicFormat.numericShort(-7300000)).to.eql("-7.3m");
    expect(civicFormat.numericShort(73000000000)).to.eql("73b");
  });

  it("takes decimal, changes to percentage", () => {
    expect(civicFormat.decimalToPercent(0)).to.eql("0%");
    expect(civicFormat.decimalToPercent(0.3456)).to.eql("34.6%");
    expect(civicFormat.decimalToPercent(1.3456)).to.eql("134.6%");
    expect(civicFormat.decimalToPercent(-1.3456)).to.eql("-134.6%");
    expect(civicFormat.decimalToPercent(1)).to.eql("100%");
    expect(civicFormat.decimalToPercent(10)).to.eql("1,000%");
    expect(civicFormat.decimalToPercent(100)).to.eql("10,000%");
    expect(civicFormat.decimalToPercent(1000)).to.eql("100,000%");
    expect(civicFormat.decimalToPercent(10000)).to.eql("1,000,000%");
    expect(civicFormat.decimalToPercent(-10000)).to.eql("-1,000,000%");
  });

  it("should format percentages correctly", () => {
    expect(civicFormat.percentage(0.75)).to.eql("75%");
    expect(civicFormat.percentage(0.2379)).to.eql("24%");
  });

  it("should format dollars correctly", () => {
    expect(civicFormat.dollars(12)).to.eql("$12");
    expect(civicFormat.dollars(230.5)).to.eql("$231");
    expect(civicFormat.dollars(7300000)).to.eql("$7.3 million");
  });
});
