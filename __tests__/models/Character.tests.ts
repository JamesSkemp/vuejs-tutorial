import Character from "@/models/Character";

const character3 = new Character(3, true);

test('Character 3 name', () => {
	expect(character3.modelType).toBe(3);
});

test('Character 3 health', () => {
	console.log(character3);
	expect(character3.currentHealth).toBe(27);
});

test('Character 3 melee and range attack counts are 1', () => {
	console.log(character3.baseStats.melee.attacks);
	console.log(character3.baseStats.range.attacks);
	expect(character3.baseStats.melee.attacks.length === 1 && character3.baseStats.range.attacks.length === 1).toBe(true);
});
