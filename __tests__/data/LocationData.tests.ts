import LocationData from "@/data/LocationData"

test('No encounter locations includes first location', () => {
	expect(LocationData.LocationsWithoutEncounters[0]).toEqual(0);
});
