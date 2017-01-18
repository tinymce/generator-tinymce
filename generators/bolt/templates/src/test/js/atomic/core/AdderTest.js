test('atomic.core.AdderTest', [
	'tinymce.<%= camelName %>.core.Adder',
	'ephox.agar.api.RawAssertions'
], function (Adder, RawAssertions) {
	RawAssertions.assertEq('2 + 2 = 4', 4, Adder.addTwo(2));
});
