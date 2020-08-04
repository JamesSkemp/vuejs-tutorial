import CharacterData from "@/data/CharacterData";

test('Character data has adventurer data', () => {
	expect(CharacterData.Adventurers.length).toBeGreaterThan(0);
});

test('Character data has opponent data', () => {
	expect(CharacterData.Opponents.length).toBeGreaterThan(0);
});
