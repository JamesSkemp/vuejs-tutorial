import World from '@/models/World';
import Party from '@/models/Party';
import Character from '@/models/Character';
import { sortPartiesById } from './WorldSortUtilities';
import { PartyState } from './Enums';
import { sortByCharacterId } from './CharacterSortUtilities';

export function startNextMoment(world: World): void {
	/*this.parties.forEach(party => {
		console.log(party);
	});*/
	// TODO handle isPaused
	// TODO this should probably do something with combat as well?
	world.currentMoment++;
}

/**
 * Initializes and returns next character id.
 */
export function generateNextCharacterId(world: World): number {
	world.nextCharacterId++;
	return world.nextCharacterId;
}

/**
 * Adds a party to a world. Returns the party id of the added party.
 * @param world World to add the party to.
 * @param party Optional party to add to the world. If not provided one will be created. If provided but it doesn't include a valid id, one will be set.
 */
export function addPartyToWorld(world: World, party?: Party): number {
	if (party) {
		if (party.id < 0) {
			party.id = getUnusedPartyId(world);
		}
		world.parties.push(party);
		return party.id;
	} else {
		const newParty = new Party(getUnusedPartyId(world));
		world.parties.push(newParty);
		return newParty.id;
	}
}

export function getUnusedPartyId(world: World): number {
	if (world.parties.length === 0) {
		return 0;
	}
	const sortedParties = sortPartiesById(world);
	const minId = sortedParties[0].id;
	if (minId > 0) {
		return 0;
	}
	let unusedId = 1;
	for (const party of sortedParties) {
		if (party.id > unusedId) {
			break;
		} else if (party.id === unusedId) {
			unusedId++;
		} else {
			continue;
		}
	}
	return unusedId;
}

/**
 * Breaks an existing party up so that each character has their own party. Requires the party to be at town.
 * @param world World that contains the party and will contain the new parties.
 * @param party Party to disband/split up.
 */
export function disbandParty(world: World, party: Party): boolean {
	if (party.mainCharacters.length > 0) {
		// TODO may have different states that allow disbanding
		if (party.state === PartyState.AtLocationTown) {
			sortByCharacterId(party.mainCharacters);

			while (party.mainCharacters.length > 1) {
				const partyMember = party.mainCharacters[1];
				party.mainCharacters.splice(1, 1);

				const newParty = new Party(-1);
				newParty.mainCharacters.push(partyMember);

				addPartyToWorld(world, newParty);
			}
			return true;
		}
	}
	return false;
}

export function createNewTestWorldForSingleBattle(character: Character, opponent: Character): World {
	const newWorld: World = new World();

	const newParty = new Party(0);
	newParty.mainCharacters.push(character);
	newParty.opponents.push(opponent);

	newWorld.parties.push(newParty);

	return newWorld;
}

/**
 * Loop through all parties and remove those that are empty of characters. This also loops through and fixes the party ids so that they contain no gaps in numbering.
 * @param world World to update.
 */
export function removeEmptyParties(world: World) {
	if (world.parties.length > 0) {
		for (let i = 0; i < world.parties.length; i++) {
			while (world.parties[i] && world.parties[i].mainCharacters.length === 0) {
				world.parties.splice(i, 1);
				console.log(`party ${i} removed`);
			}
		}
		fixPartyIds(world);
	}
}

/**
 * Fix all party ids in a world so they include no gaps.
 * @param world World to update.
 */
export function fixPartyIds(world: World) {
	if (world.parties.length > 0) {
		for (let i = 0; i < world.parties.length; i++) {
			if (world.parties[i].id !== i) {
				world.parties[i].id = i;
			}
		}
	}
}

// TODO function to switch character from one party to another - sort of done - workflow is disband party, then combine parties
// TODO functionality to remove empty parties
