import { getLocationOpponent } from "@/utilities/LocationUtilities"
import LocationData from '@/data/LocationData';

test('Starting town returns no opponents', () => {
	const location = LocationData.Locations[0];

	expect(getLocationOpponent(location, 1, 5).length).toBe(0);
});

test('First non-town location returns two opponents', () => {
	const location = LocationData.Locations[1];

	expect(getLocationOpponent(location, 2, 2).length).toBe(2);
});
