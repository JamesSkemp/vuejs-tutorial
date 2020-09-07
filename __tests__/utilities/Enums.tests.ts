import { attackPreferenceToText, AttackType, desireToText, Desire, partyStateToText, PartyState } from "@/utilities/Enums";

describe('Verify all attack preferences/types', () => {
	test('Attack type magic', () => {
		expect(attackPreferenceToText(AttackType.Magic)).toEqual('Magic');
	});
	test('Attack type melee', () => {
		expect(attackPreferenceToText(AttackType.Melee)).toEqual('Melee');
	});
	test('Attack type range', () => {
		expect(attackPreferenceToText(AttackType.Range)).toEqual('Range');
	});
});

describe('Verify all desires', () => {
	test('Desire rest', () => {
		expect(desireToText(Desire.Rest)).toEqual('Rest');
	});
});

describe('Verify all party states', () => {
	test('Party at town', () => {
		expect(partyStateToText(PartyState.AtLocationTown)).toEqual('At Town');
	});
});
