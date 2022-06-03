import expect from 'expect';





describe("jobs", function () {
  // before(async function() {
  //   await insert.jobs([{
  //     id: 1,

  //   }])
  // })
  it("returns all jobs", function () {});
  it("returns all jobs that have salary");
});

it("synchronous passing test", async () => {
  await prisma.aNZSCO.deleteMany();

  // This test passes because it does not throw an exception.
  await prisma.aNZSCO.create({ data: { id: 1 } });

  const lines = await prisma.aNZSCO.findMany({});
  expect(lines).toHaveLength(1);
});
