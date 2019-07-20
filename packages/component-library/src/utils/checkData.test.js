import checkData from "./checkData";

describe("checkData", () => {
  it("should add an error for invalid types", () => {
    expect(checkData({}, ["doorKey", "houseKey"])).to.eql({
      allKeysValid: false,
      error: true
    });
    expect(checkData({ keyType: "door" }, "doorKey")).to.eql({
      allKeysValid: false,
      error: true
    });
    expect(checkData({}, ["doorKey", "houseKey"])).to.eql({
      allKeysValid: false,
      error: true
    });
  });

  it("should work for a simple test case", () => {
    expect(
      checkData(
        [
          { keyType: "door", lockType: "door" },
          { keyType: "car", lockType: "plane" }
        ],
        ["keyType"]
      )
    ).to.eql({
      allKeysValid: true,
      error: false,
      keyType: { valid: 2, total: 2 }
    });
  });

  it("should ignore unchecked keys", () => {
    expect(
      checkData(
        [
          { keyType: "door", lockType: "door", junk: "trunk" },
          { keyType: "car", lockType: "plane" }
        ],
        ["keyType"]
      )
    ).to.eql({
      allKeysValid: true,
      error: false,
      keyType: { valid: 2, total: 2 }
    });
  });

  it("should handle multiple keys", () => {
    expect(
      checkData(
        [
          { keyType: "door", lockType: "door", junk: "trunk" },
          { keyType: "car", lockType: "plane" }
        ],
        ["keyType", "lockType"]
      )
    ).to.eql({
      allKeysValid: true,
      error: false,
      keyType: { valid: 2, total: 2 },
      lockType: { valid: 2, total: 2 }
    });
  });

  it("should handle invalid data properly", () => {
    expect(
      checkData(
        [
          { keyType: "door", lockType: "door", junk: "trunk" },
          { keyType: "car", lockType: "plane" }
        ],
        ["keyType", "lockType", "junk"]
      )
    ).to.eql({
      allKeysValid: false,
      error: false,
      keyType: { valid: 2, total: 2 },
      lockType: { valid: 2, total: 2 },
      junk: { valid: 1, total: 2 }
    });
  });

  it("should handle invalid keys properly", () => {
    expect(
      checkData(
        [
          { keyType: "door", lockType: "door", junk: "trunk" },
          { keyType: "car", lockType: "plane" }
        ],
        ["keyType", "lockType", "category"]
      )
    ).to.eql({
      allKeysValid: false,
      error: false,
      keyType: { valid: 2, total: 2 },
      lockType: { valid: 2, total: 2 },
      category: { valid: 0, total: 2 }
    });
  });
});
