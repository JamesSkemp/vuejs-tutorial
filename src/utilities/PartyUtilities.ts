import Party from '@/models/Party';
import { attackOpponent, processTurn, getShortDetails } from './CharacterUtilities';
import Character from '@/models/Character';
import { sortBySpeed } from './CharacterSortUtilities';
import { sortByPartyId } from './PartySortUtilities';

/**
 * Combine multiple parties together. Returns true if parties are combined.
 * @param parties Parties to combine together.
 */
export function combineParties(parties: Party[]): boolean {
	// Filter the parties to just those with characters in them.
	parties = sortByPartyId(parties.filter(p => p && p.mainCharacters && p.mainCharacters.length > 0));
	if (parties.length > 1) {
		for (let i = 1; i < parties.length; i++) {
			while (parties[i].mainCharacters.length > 0) {
				const partyMember = parties[i].mainCharacters[0];
				console.log(partyMember);
				parties[i].mainCharacters.splice(0, 1);

				parties[0].mainCharacters.push(partyMember);
			}
		}
		return true;
	}
	return false;
}

export function partyHasLivingMainCharacters(party: Party): boolean {
	return party.mainCharacters.filter(c => c.currentHealth > 0).length > 0;
}

export function partyHasLivingOpponents(party: Party): boolean {
	return party.opponents.filter(c => c.currentHealth > 0).length > 0;
}

export function partyHasOngoingBattle(party: Party) {
	return partyHasLivingMainCharacters(party) && partyHasLivingOpponents(party);
}

export function resolvePartyMoment(party: Party, currentMoment: number): string[] {
	const messages: string[] = [];
	if (party.mainCharacters.length > 0) {
		if (party.opponents.length > 0) {
			let characters: Character[] = [];
			characters = characters.concat(party.mainCharacters);
			characters = characters.concat(party.opponents);

			//console.log(JSON.stringify(characters.filter(c => c.currentHealth > 0 && c.nextAttack <= currentMoment)));
			const charactersActingThisTurn = sortBySpeed(characters.filter(c =>
				c.currentHealth > 0 && c.nextAttack <= currentMoment
			));
	
			if (charactersActingThisTurn.length > 0) {
				//console.log(JSON.stringify(charactersActingThisTurn));
			}
	
			if (charactersActingThisTurn.length > 0) {
				// TODO if a character is slowed the turn they are supposed to go, do they still go? I think the answer is yes since this is effectively them acting at the same time ... or maybe we need to do a check anyway ...
				charactersActingThisTurn.forEach(character => {
					// Verify that they should still be going.
					if (character.nextAttack <= currentMoment) {
						messages.push('<strong>Character going: ' + getShortDetails(character) + '</strong>');
						// TODO determine target - stop early if there's no one left alive?
						const opponent = characters.filter(c =>
							c.side !== character.side && c.currentHealth > 0
						)[0];
	
						//console.log(opponent);
	
						messages.push(JSON.stringify(attackOpponent(character, opponent)));
	
						processTurn(character, currentMoment);
					}
				});
			}
		}
	}
	return messages;
}

// TODO function to add Character to party (and set side accordingly)
