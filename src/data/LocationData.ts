import Location from '@/models/Location';

export default class LocationData {
	/**
	 * Locations in the game.
	 */
	public static Locations: Location[] = [
		{
			id: 0,
			shortName: "Village",
			asset: "town-1",
			encounterRate: { checkTime: 0, chance: 0 },
			opponents: []
		},
		{
			id: 10,
			shortName: "Village Outskirts",
			asset: "-",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: [
				{ id: 1, rarity: 40 },
				{ id: 2, rarity: 40 },
				{ id: 5, rarity: 10 },
				{ id: 3, rarity: 10 }
			]
		},
		{
			id: 20,
			shortName: "Training Forest",
			asset: "forest",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		},
		{
			id: 30,
			shortName: "Marsh of Smells",
			asset: "marsh",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		},
		{
			id: 40,
			shortName: "Forest of Urk",
			asset: "forest",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		},
		{
			id: 50,
			shortName: "Ruins of Decay",
			asset: "ruin",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		},
		{
			id: 60,
			shortName: "Cemetary of Life",
			asset: "cemetery",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		},
		{
			id: 70,
			shortName: "Thief's Dungeon",
			asset: "dungeon-2",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		},
		{
			id: 80,
			shortName: "Dark Forest",
			asset: "forest",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		},
		{
			id: 90,
			shortName: "Cave of Danger",
			asset: "cave",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		},
		{
			id: 100,
			shortName: "Deep Dungeon",
			asset: "dungeon-3",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		},
		{
			id: 110,
			shortName: "Fallen Altar",
			asset: "altar",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		},
		{
			id: 120,
			shortName: "The Great Unknown",
			asset: "wasteland",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		}
	];
	/*
	Template for adding a new location:
		,
		{
			id: -10,
			shortName: "",
			asset: "-",
			encounterRate: { checkTime: 4, chance: 25 },
			opponents: []
		}
	*/

	/**
	 * For ease, the locations (by index) that will never have an encounter.
	 */
	public static LocationsWithoutEncounters = [0]
}
