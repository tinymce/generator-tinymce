test(
  'atomic.tinymce.plugins.<%= camelName %>.core.AdderTest',
  [
    'tinymce.plugins.<%= camelName %>.core.Adder',
    'ephox.agar.api.RawAssertions'
  ],
  function (Adder, RawAssertions) {
    RawAssertions.assertEq('2 + 2 = 4', 4, Adder.addTwo(2));
  }
);
