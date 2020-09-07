import World from '@/models/World';
import Party from '@/models/Party';
import Character from '@/models/Character';
import { sortPartiesById } from './WorldSortUtilities';
import { PartyState } from './Enums';
import { sortByCharacterId } from './CharacterSortUtilities';
import { addMainCharacter, resolvePartyMoment, addOpponent, addStartingAdventurer } from './PartyUtilities';

/**
 * Create a new world, populated with a random starting character.
 *
 * @returns A world, populated with a single party.
 */
export function createNewWorld(): World {
	const newWorld = new World();
	newWorld.journal.addEntry(newWorld.currentMoment, "A new world has been created.");

	// TODO utility?
	const firstParty = new Party(0);
	firstParty.location = 0;
	addStartingAdventurer(firstParty, newWorld.currentMoment);
	addPartyToWorld(newWorld, firstParty);

	newWorld.journal.addEntry(newWorld.currentMoment, "A starting adventurer has been added to the world.");

	return newWorld;
}

/**
 * Start the next moment in a world.
 *
 * @param world World to start the next moment in.
 */
export function startNextMoment(world: World): void {
	if (!world.isPaused) {
		world.currentMoment++;
		world.journal.addEntry(world.currentMoment, "Starting moment.");
		world.parties.forEach(party => {
			resolvePartyMoment(party, world.currentMoment);
		});
	}
}

/**
 * Initializes and returns next character id.
 *
 * @param world World to generate character in.
 * @returns New character's id.
 */
export function generateNextCharacterId(world: World): number {
	world.nextCharacterId++;
	return world.nextCharacterId;
}

/**
 * Adds a party to a world. Returns the party id of the added party.
 *
 * @param world World to add the party to.
 * @param party Optional party to add to the world. If not provided one will be created. If provided but it doesn't include a valid id, one will be set.
 * @returns {number} Party's id.
 */
export function addPartyToWorld(world: World, party?: Party): number {
	if (party) {
		if (party.id < 0) {
			party.id = getUnusedPartyId(world);
		}
		world.parties.push(party);
		world.journal.addEntry(world.currentMoment, 'Party added to world');
		return party.id;
	} else {
		const newParty = new Party(getUnusedPartyId(world));
		world.parties.push(newParty);
		world.journal.addEntry(world.currentMoment, 'New party added to world');
		return newParty.id;
	}
}

/**
 * Get the first unused party id in a World.
 *
 * @param world World to check.
 * @returns Return first unused party id.
 */
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
 *
 * @param world World that contains the party and will contain the new parties.
 * @param party Party to disband/split up.
 * @returns {boolean} True if the party was disbanded.
 */
export function disbandParty(world: World, party: Party): boolean {
	if (party.mainCharacters.length > 0) {
		// TODO may have different states that allow disbanding
		if (party.state === PartyState.AtLocationTown) {
			world.journal.addEntry(world.currentMoment, 'Party is being disbanded.');
			sortByCharacterId(party.mainCharacters);

			while (party.mainCharacters.length > 1) {
				const partyMember = party.mainCharacters[1];
				party.mainCharacters.splice(1, 1);

				const newParty = new Party(-1);
				addMainCharacter(newParty, partyMember, world.currentMoment);
				newParty.location = party.location;

				addPartyToWorld(world, newParty);
			}
			return true;
		}
	}
	return false;
}

/**
 * Testing functionality. Creates a new test world with characters and opponents.
 *
 * @param characters Main characters to add to the world.
 * @param opponents Opponents to add to the world.
 * @returns Test world.
 */
export function createNewTestWorldForSingleBattle(characters: Character[], opponents: Character[]): World {
	const newWorld: World = new World();

	const newParty = new Party(0);
	characters.forEach(character => {
		addMainCharacter(newParty, character, newWorld.currentMoment);
	});

	opponents.forEach(opponent => {
		addOpponent(newParty, opponent, newWorld.currentMoment);
	});

	addPartyToWorld(newWorld, newParty);

	return newWorld;
}

/**
 * Loop through all parties and remove those that are empty of characters. This also loops through and fixes the party ids so that they contain no gaps in numbering.
 *
 * @param world World to update.
 */
export function removeEmptyParties(world: World): void {
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
 *
 * @param world World to update.
 */
export function fixPartyIds(world: World): void {
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
