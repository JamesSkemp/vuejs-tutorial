import Party from '@/models/Party';
import { attackOpponent, processAttackTurn, getShortDetails, setInitialTurn } from './CharacterUtilities';
import Character from '@/models/Character';
import { sortBySpeed } from './CharacterSortUtilities';
import { sortByPartyId } from './PartySortUtilities';
import { PartyState } from './Enums';

/**
 * Combine multiple parties together. Returns true if parties are combined.
 *
 * @param parties Parties to combine together.
 * @returns {boolean} True if the parties have been combined.
 */
export function combineParties(parties: Party[]): boolean {
	// TODO should probably verify that they're at least in the same location and possibly that they're not in battle (?) before combining
	// Filter the parties to just those with characters in them.
	parties = sortByPartyId(parties.filter(p => p && p.mainCharacters && p.mainCharacters.length > 0));
	if (parties.length > 1) {
		for (let i = 1; i < parties.length; i++) {
			while (parties[i].mainCharacters.length > 0) {
				const partyMember = parties[i].mainCharacters[0];
				console.log(partyMember);
				parties[i].mainCharacters.splice(0, 1);
				addMainCharacter(parties[0], partyMember);
			}
		}
		return true;
	}
	return false;
}

/**
 * Check whether a party has living main characters.
 *
 * @param party Party to check.
 * @returns {boolean} True if the party has living main characters.
 */
export function partyHasLivingMainCharacters(party: Party): boolean {
	return party.mainCharacters.filter(c => c.currentHealth > 0).length > 0;
}

/**
 * Check whether a party has living opponents.
 *
 * @param party Party to check.
 * @returns {boolean} True if the party has living opponents.
 */
export function partyHasLivingOpponents(party: Party): boolean {
	return party.opponents.filter(c => c.currentHealth > 0).length > 0;
}

/**
 * Check if a party has an ongoing battle.
 *
 * @param party Party to check.
 * @returns {boolean} True if the party has both living main characters and opponents.
 */
export function partyHasOngoingBattle(party: Party): boolean {
	return partyHasLivingMainCharacters(party) && partyHasLivingOpponents(party);
}

/**
 * Resolve the world's current moment for a party.
 *
 * @param party Party to resolve.
 * @param currentMoment Current moment in the world.
 * @returns {string[]} Messages that could be output.
 */
export function resolvePartyMoment(party: Party, currentMoment: number): string[] {
	const messages: string[] = [];
	if (party.mainCharacters.length > 0) {
		if (party.opponents.length > 0) {
			if (party.state !== PartyState.InBattle) {
				party.mainCharacters.forEach(c => setInitialTurn(c, currentMoment));
				party.opponents.forEach(c => setInitialTurn(c, currentMoment));
				party.state = PartyState.InBattle;
			}

			let characters: Character[] = [];
			characters = characters.concat(party.mainCharacters);
			characters = characters.concat(party.opponents);

			//console.log(JSON.stringify(characters));
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

						processAttackTurn(character, currentMoment);
					}
				});
			}
		} else {
			console.log('no opponents');
			// TODO no battle
		}
	}
	// TODO handle combat being over

	return messages;
}

/**
 * Adds a character to a party, setting the individual's side as needed.
 *
 * @param party Party to add the main character to.
 * @param character Character to add.
 * @returns True if the character was added.
 */
export function addMainCharacter(party: Party, character: Character): boolean {
	// TODO may also want to resort party so melee > range > magic for order?
	character.side = 1;
	party.mainCharacters.push(character);
	// TODO verify that a character can be added
	return true;
}

/**
 * Adds an opponent to a party, setting the side as needed.
 *
 * @param party Party to add the opponent to.
 * @param opponent Opponent character to add.
 * @returns True if the opponent was added.
 */
export function addOpponent(party: Party, opponent: Character): boolean {
	opponent.side = 2;
	party.opponents.push(opponent);
	// TODO verify that an opponent can be added - can't add in limbo or in town
	// TODO verify party has heroes? or could a party of opponents be created? I think the latter ...
	return true;
}

// TODO start battle - populate opponents (?) and set initial turns - see resolvePartyMoment
