import World from '@/models/World';
import Party from '@/models/Party';
import Character from '@/models/Character';

export function createNewTestWorldForSingleBattle(character: Character, opponent: Character): World {
	let newWorld: World = new World();

	let newParty = new Party(0);
	newParty.mainCharacters.push(character);
	newParty.opponents.push(opponent);

	newWorld.parties.push(newParty);

	return newWorld;
}

// TODO function to switch character from one party to another
