import { getLocationOpponent, getLocation, getLocationById } from "@/utilities/LocationUtilities"
import LocationData from '@/data/LocationData';

test('Starting town returns no opponents', () => {
	const location = LocationData.Locations[0];

	expect(getLocationOpponent(location, 1, 5).length).toBe(0);
});

test('First non-town location returns two opponents', () => {
	const location = LocationData.Locations[1];

	expect(getLocationOpponent(location, 2, 2).length).toBe(2);
});

test('Location index 1 is Village Outskirts', () => {
	expect(getLocation(1).shortName).toEqual('Village Outskirts');
});

test('Location index -2 is starting area', () => {
	expect(getLocation(-2).id).toBe(0);
});

test('Location index 1000 is last area', () => {
	expect(getLocation(1000).id).toBe(120);
});

test('Location id 10 is Village Outskirts', () => {
	expect(getLocationById(10).shortName).toEqual('Village Outskirts');
});
