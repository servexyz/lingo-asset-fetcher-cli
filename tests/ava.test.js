import test from "ava";
import { honesty } from "npm-starter-sample-module";

test("ava is working", t => {
  t.pass();
});

test("es2017 in ava is working", async t => {
  const bar = Promise.resolve("bar");

  t.is(await bar, "bar");
});

test("remote npm module import is working", t => {
  t.truthy(honesty());
});
