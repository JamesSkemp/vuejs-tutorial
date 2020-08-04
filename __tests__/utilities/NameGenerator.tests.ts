import NameGenerator from "@/utilities/NameGenerator";

test('No name', () => {
	expect(NameGenerator.randomName(0, 0)).toBe('');
});

test('Name 0 and 1', () => {
	expect(NameGenerator.randomName(1, 1).length).toBeLessThanOrEqual(2);
});

test('Name starts with a uppercase letter', () => {
	const fakeName = NameGenerator.randomName(1, 5);
	const firstCharacter = fakeName.slice(0, 1);
	expect(firstCharacter).toBe(firstCharacter.toUpperCase());
});
