const spare = require("../../util/spare");

describe("spare", () => {
  it("converts number graviton to spare", () => {
    const result = spare.graviton_to_spare(1000000);

    expect(result).toBe(0.000001);
  });
  it("converts string graviton to spare", () => {
    const result = spare.graviton_to_spare("1000000");

    expect(result).toBe(0.000001);
  });
  it("converts number graviton to spare string", () => {
    const result = spare.graviton_to_spare_string(1000000);

    expect(result).toBe("0.000001");
  });
  it("converts string graviton to spare string", () => {
    const result = spare.graviton_to_spare_string("1000000");

    expect(result).toBe("0.000001");
  });
  it("converts number spare to graviton", () => {
    const result = spare.spare_to_graviton(0.000001);

    expect(result).toBe(1000000);
  });
  it("converts string spare to graviton", () => {
    const result = spare.spare_to_graviton("0.000001");

    expect(result).toBe(1000000);
  });
  it("converts number graviton to colouredcoin", () => {
    const result = spare.graviton_to_colouredcoin(1000000);

    expect(result).toBe(1000);
  });
  it("converts string graviton to colouredcoin", () => {
    const result = spare.graviton_to_colouredcoin("1000000");

    expect(result).toBe(1000);
  });
  it("converts number graviton to colouredcoin string", () => {
    const result = spare.graviton_to_colouredcoin_string(1000000);

    expect(result).toBe("1,000");
  });
  it("converts string graviton to colouredcoin string", () => {
    const result = spare.graviton_to_colouredcoin_string("1000000");

    expect(result).toBe("1,000");
  });
  it("converts number colouredcoin to graviton", () => {
    const result = spare.colouredcoin_to_graviton(1000);

    expect(result).toBe(1000000);
  });
  it("converts string colouredcoin to graviton", () => {
    const result = spare.colouredcoin_to_graviton("1000");

    expect(result).toBe(1000000);
  });
});
