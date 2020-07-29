import CharacterModel from '@/models/CharacterModel';
import Attack from '@/models/Attack';
import { AttackType } from '@/utilities/Enums';

export default class CharacterData {
	/**
	 * Hero character data, used when creating a new hero.
	 */
	public static Heroes: CharacterModel[] = [
		{
			id: 1,
			shortName: "Knife/sword",
			introText: "carry a short sword.",
			type: "1_7",
			baseStats: {
				health: 30,
				melee: {
					value: 14,
					attacks: [
						new Attack(0, "Basic", "1d6")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 6,
				armor: 0,
				speed: 10
			},
			preferredAttack: AttackType.Melee
		},
		{
			id: 2,
			shortName: "Spear",
			introText: "lean heavily on their spear.",
			type: "2_9",
			baseStats: {
				health: 30,
				melee: {
					value: 12,
					attacks: [
						new Attack(0, "Basic", "1d6+1")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 7,
				armor: 0,
				speed: 10
			},
			preferredAttack: AttackType.Melee
		},
		{
			id: 3,
			shortName: "Bow",
			introText: "hold their bow in one hand, and an arrow in the other.",
			type: "2_1",
			baseStats: {
				health: 27,
				melee: {
					value: 10,
					attacks: [
						new Attack(0, "Basic", "1d6")
					]
				},
				range: {
					value: 12,
					attacks: [
						new Attack(0, "Basic", "1d6")
					]
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 5,
				armor: 0,
				speed: 9
			},
			preferredAttack: AttackType.Range
		},
		{
			id: 4,
			shortName: "Long Sword",
			introText: "hold their heavy sword high.",
			type: "1_3",
			baseStats: {
				health: 30,
				melee: {
					value: 14,
					attacks: [
						new Attack(0, "Basic", "1d6+1")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 5,
				armor: 0,
				speed: 10
			},
			preferredAttack: AttackType.Melee
		},
		{
			id: 5,
			shortName: "Thrower? Thief?",
			introText: "have one hand within their cloak.",
			type: "1_6",
			baseStats: {
				health: 24,
				melee: {
					value: 11,
					attacks: [
						new Attack(0, "Basic", "1d4")
					]
				},
				range: {
					value: 11,
					attacks: [
						new Attack(0, "Basic", "1d4")
					]
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 7,
				armor: 0,
				speed: 9
			},
			preferredAttack: AttackType.Range
		},
		{
			id: 6,
			shortName: "Mace and Shield",
			introText: "rhythmically knock a mace against a shield.",
			type: "2_16",
			baseStats: {
				health: 30,
				melee: {
					value: 12,
					attacks: [
						new Attack(0, "Basic", "1d6")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 6,
				armor: 1,
				speed: 10
			},
			preferredAttack: AttackType.Melee
		},
		{
			id: 7,
			shortName: "Healer",
			introText: "carry a long walking staff.",
			type: "1_5",
			baseStats: {
				health: 27,
				melee: {
					value: 11,
					attacks: [
						new Attack(0, "Basic", "1d4+1")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 12,
					attacks: [
						new Attack(0, "Basic", "1d4")
					]
				},
				dodge: 6,
				armor: 0,
				speed: 10
			},
			preferredAttack: AttackType.Magic
		},
		{
			id: 8,
			shortName: "Mage",
			introText: "carry a book.",
			type: "1_10",
			baseStats: {
				health: 27,
				melee: {
					value: 8,
					attacks: [
						new Attack(0, "Basic", "1d4")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 14,
					attacks: [
						new Attack(0, "Basic", "1d6")
					]
				},
				dodge: 6,
				armor: 0,
				speed: 10
			},
			preferredAttack: AttackType.Magic
		},
		{
			id: 9,
			shortName: "Defender",
			introText: "take measured steps behind their shield.",
			type: "1_1",
			baseStats: {
				health: 36,
				melee: {
					value: 12,
					attacks: [
						new Attack(0, "Basic", "1d6+1")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 4,
				armor: 2,
				speed: 11
			},
			preferredAttack: AttackType.Melee
		},
		{
			id: 10,
			shortName: "Heavy Archer",
			introText: "gently swing a dead bird.",
			type: "2_4",
			baseStats: {
				health: 33,
				melee: {
					value: 10,
					attacks: [
						new Attack(0, "Basic", "1d4")
					]
				},
				range: {
					value: 14,
					attacks: [
						new Attack(0, "Basic", "1d6+2", 1)
					]
				},
				magic: {
					value: 6,
					attacks: []
				},
				dodge: 5,
				armor: 1,
				speed: 12
			},
			preferredAttack: AttackType.Range
		},
		{
			id: 11,
			shortName: "Dervish",
			introText: "carry two short blades.",
			type: "1_8",
			baseStats: {
				health: 27,
				melee: {
					value: 12,
					attacks: [
						new Attack(0, "Basic", "1d6")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 6,
				armor: 0,
				speed: 7
			},
			preferredAttack: AttackType.Melee
		},
		{
			id: 12,
			shortName: "Axe and Shield",
			introText: "have an axe resting against their shoulder.",
			type: "1_4",
			baseStats: {
				health: 33,
				melee: {
					value: 12,
					attacks: [
						new Attack(0, "Basic", "1d6")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 6,
				armor: 1,
				speed: 10
			},
			preferredAttack: AttackType.Melee
		},
		{
			id: 13,
			shortName: "Spear and Shield",
			introText: "bow their head slightly as they enter town.",
			type: "1_11",
			baseStats: {
				health: 30,
				melee: {
					value: 12,
					attacks: [
						new Attack(0, "Basic", "1d6")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 6,
				armor: 1,
				speed: 10
			},
			preferredAttack: AttackType.Melee
		},
		{
			id: 14,
			shortName: "Elementalist",
			introText: "open and close their hands.",
			type: "1_17",
			baseStats: {
				health: 27,
				melee: {
					value: 10,
					attacks: [
						new Attack(0, "Basic", "1d4")
					]
				},
				range: {
					value: 8,
					attacks: []
				},
				magic: {
					value: 12,
					attacks: [
						new Attack(0, "Basic", "1d4+2")
					]
				},
				dodge: 7,
				armor: 0,
				speed: 10
			},
			preferredAttack: AttackType.Magic
		},
		{
			id: 15,
			shortName: "Cleric",
			introText: "smile as they pass others.",
			type: "2_12",
			baseStats: {
				health: 27,
				melee: {
					value: 10,
					attacks: [
						new Attack(0, "Basic", "1d4")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 14,
					attacks: [
						new Attack(0, "Basic", "1d4")
					]
				},
				dodge: 6,
				armor: 0,
				speed: 10
			},
			preferredAttack: AttackType.Magic
		}
	]
}

/*
Template for adding a new character:

		{
			id: -1,
			shortName: "",
			introText: "",
			type: "_"
			baseStats: {
				health: 30,
				melee: {
					value: 12,
					attacks: [
						new Attack(0, "Basic", "1d6")
					]
				},
				range: {
					value: 10,
					attacks: []
				},
				magic: {
					value: 0,
					attacks: []
				},
				dodge: 6,
				armor: 0,
				speed: 10
			}
		}
*/
