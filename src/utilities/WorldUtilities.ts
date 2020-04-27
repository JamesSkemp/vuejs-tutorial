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
		let newParty = new Party(getUnusedPartyId(world));
		world.parties.push(newParty);
		return newParty.id;
	}
}

export function getUnusedPartyId(world: World): number {
	if (world.parties.length === 0) {
		return 0;
	}
	let sortedParties = sortPartiesById(world);
	let minId = sortedParties[0].id;
	if (minId > 0) {
		return 0;
	}
	let unusedId = 1;
	for (let party of sortedParties) {
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
				let partyMember = party.mainCharacters[1];
				party.mainCharacters.splice(1, 1);

				let newParty = new Party(-1);
				newParty.mainCharacters.push(partyMember);

				addPartyToWorld(world, newParty);
			}
			return true;
		}
	}
	return false;
}

export function createNewTestWorldForSingleBattle(character: Character, opponent: Character): World {
	let newWorld: World = new World();

	let newParty = new Party(0);
	newParty.mainCharacters.push(character);
	newParty.opponents.push(opponent);

	newWorld.parties.push(newParty);

	return newWorld;
}

// TODO function to switch character from one party to another
// TODO disband party
// TODO combine parties
// TODO fix sort order of parties so they're by id?
