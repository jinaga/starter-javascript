const { JinagaTest } = require("jinaga");
const { User } = require("./user");
const { Domain, Visit } = require("./visit");

var j;

beforeEach(() => {
    j = JinagaTest.create({
        user: new User("publicKey"),
    });
});

test("Visit count is initially zero", async () => {
    const domain = new Domain('myapplication');
    const visits = await j.query(domain, j.for(Visit.inDomain));
    expect(visits.length).toBe(0);
});

test("Visit count increments to 1", async () => {
    const { userFact: user } = await j.login();
    const domain = new Domain('myapplication');
    await j.fact(new Visit(domain, user, new Date()));
    const visits = await j.query(domain, j.for(Visit.inDomain));
    expect(visits.length).toBe(1);
});
