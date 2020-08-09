import Party from '@/models/Party';
import { attackOpponent, processAttackTurn, getShortDetails, setInitialTurn } from './CharacterUtilities';
import Character from '@/models/Character';
import { sortBySpeed } from './CharacterSortUtilities';
import { sortByPartyId } from './PartySortUtilities';
import { PartyState } from './Enums';
import { checkForEncounter, getLocation, getLocationOpponent } from './LocationUtilities';
import LocationData from '@/data/LocationData';
import { randomNumberInRange } from './GeneralUtilities';
import BattleLog from '@/models/BattleLog';

/**
 * Combine multiple parties together. Returns true if parties are combined.
 *
 * @param parties Parties to combine together.
 * @param currentMoment Current world moment.
 * @returns {boolean} True if the parties have been combined.
 */
export function combineParties(parties: Party[], currentMoment: number): boolean {
	// TODO should probably verify that they're at least in the same location and possibly that they're not in battle (?) before combining
	// Filter the parties to just those with characters in them.
	parties = sortByPartyId(parties.filter(p => p && p.mainCharacters && p.mainCharacters.length > 0));
	if (parties.length > 1) {
		for (let i = 1; i < parties.length; i++) {
			while (parties[i].mainCharacters.length > 0) {
				const partyMember = parties[i].mainCharacters[0];
				console.log(partyMember);
				parties[i].mainCharacters.splice(0, 1);
				addMainCharacter(parties[0], partyMember, currentMoment);
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
		/* TODO party moment resolving looks something like ...
			1. Combat. Not in combat? Check for an encounter. In combat? Continue it.
			2. Travel/explore location. A battle pauses travel/exploration.
			3. Searching for a party? Search.
			4. Resting? Rest.
		*/
		/**
		 * If the party participated in combat this moment their available actions later in the turn are different.
		 */
		const participatedInCombat = resolvePartyCombat(party, currentMoment);

		if (!participatedInCombat && party.state === PartyState.PostBattle) {
			// TODO determine what they should be doing - there should be a function that will return this - exploring? resting? searching? traveling?
		}

		// TODO remove hardcoded change and possibly move this
		if (party.location === 0 && currentMoment > 5) {
			party.location = 1;
		}

		// TODO actual change for travel/explore
		if (!participatedInCombat) {
			// TODO
		}

		// TODO search for a party?

		// TODO rest?
	}

	return messages;
}

/**
 * Adds a character to a party, setting the individual's side as needed.
 *
 * @param party Party to add the main character to.
 * @param character Character to add.
 * @param currentMoment Current world moment.
 * @returns True if the character was added.
 */
export function addMainCharacter(party: Party, character: Character, currentMoment: number): boolean {
	// TODO may also want to resort party so melee > range > magic for order?
	character.side = 1;
	party.mainCharacters.push(character);
	party.journal.addEntry(currentMoment, `Adventurer added. ${character.name} (${character.id})`)
	// TODO verify that a character can be added
	return true;
}

/**
 * Adds one of the starting adventurer's to a party. Useful when first creating a world.
 *
 * @param party Party to add the adventurer to.
 * @param currentMoment Current world moment.
 * @returns True if the character was added.
 */
export function addStartingAdventurer(party: Party, currentMoment: number): boolean {
	// TODO move this into a data file?
	const startingAdventurerOptions = [1, 2, 3];

	const firstAdventurer = new Character(startingAdventurerOptions[Math.floor(Math.random() * startingAdventurerOptions.length)], true);
	firstAdventurer.id = 1;

	addMainCharacter(party, firstAdventurer, currentMoment);
	return true;
}

/**
 * Adds an opponent to a party, setting the side as needed.
 *
 * @param party Party to add the opponent to.
 * @param opponent Opponent character to add.
 * @param currentMoment Current world moment.
 * @returns True if the opponent was added.
 */
export function addOpponent(party: Party, opponent: Character, currentMoment: number): boolean {
	opponent.side = 2;
	party.opponents.push(opponent);
	party.journal.addEntry(currentMoment, `Opponent added. ${opponent.name} (${opponent.id})`);
	// TODO verify that an opponent can be added - can't add in limbo or in town
	// TODO verify party has adventurers? or could a party of opponents be created? I think the latter ...
	return true;
}

/**
 * Determine if a party should be or is in combat.
 *
 * @param party Party to resolve.
 * @param currentMoment Current world moment.
 * @returns True if combat took place, false if it did not.
 */
export function resolvePartyCombat(party: Party, currentMoment: number): boolean {
	// If they're not in combat already, see if combat should be triggered.
	if (party.opponents.length === 0 && party.state !== PartyState.PostBattle) {
		if (!LocationData.LocationsWithoutEncounters.find(id => id === party.location)) {
			const location = getLocation(party.location);
			let encounterModifier = 0;

			// Add a random delay before we start increasing the encounter modifier based upon how long they've been at the location.
			// TODO set to something other than static value
			if (party.lastBattleMoment + randomNumberInRange(2, 5) >= currentMoment) {
				// TODO static value?
				encounterModifier += Math.floor(party.timeAtLocation / 5);
			}
			// TODO rate modifier based upon progress, in the area or the world?
			if (checkForEncounter(location, encounterModifier)) {
				// TODO max opponents size
				const opponentIds = getLocationOpponent(location, 1, party.mainCharacters.length);
				if (opponentIds.length > 0) {
					opponentIds.forEach(o => {
						addOpponent(party, new Character(o), currentMoment);
					});
				}
			}
		}
	}

	// Resolve combat, if needed.
	if (party.opponents.length > 0) {
		if (party.state !== PartyState.InBattle) {
			party.mainCharacters.forEach(c => {
				c.side = 1;
				setInitialTurn(c, 0);
			});
			party.opponents.forEach(c => {
				c.side = 2;
				setInitialTurn(c, 0);
			});
			party.state = PartyState.InBattle;
			party.battleLog = new BattleLog();
			party.battleLog.currentMoment = currentMoment;
			party.battleLog.messages = [];
		}

		// Add everyone to a single group that we can sort.
		let characters: Character[] = [];
		characters = characters.concat(party.mainCharacters);
		characters = characters.concat(party.opponents);

		let continueBattle = true;
		let currentTurn = 0;

		while (continueBattle) {
			const charactersActingThisTurn = sortBySpeed(characters.filter(c =>
				c.currentHealth > 0 && c.nextAttack <= currentTurn
			));

			if (charactersActingThisTurn.length > 0) {
				// TODO if a character is slowed the turn they are supposed to go, do they still go? I think the answer is yes since this is effectively them acting at the same time ... or maybe we need to do a check anyway ...
				charactersActingThisTurn.forEach(character => {
					if (continueBattle) {
						// Verify that they should still be going.
						if (character.nextAttack <= currentTurn) {
							party.battleLog.messages.push({ turn: currentTurn, message: `Character going: ${getShortDetails(character)}` });
							// TODO determine target - stop early if there's no one left alive?
							const opponents = characters.filter(c =>
								c.side !== character.side && c.currentHealth > 0
							);
							if (opponents.length === 0) {
								party.battleLog.messages.push({ turn: currentTurn, message: `Battle over. ${character.side === 1 ? 'Adventurers' : 'Opponents'} won.`});
								party.state = PartyState.PostBattle;
								continueBattle = false;
							} else {
								// TODO character may have targetting priorities?
								const targetOpponent = opponents[0];
								party.battleLog.messages.push({ turn: currentTurn, message: JSON.stringify(attackOpponent(character, targetOpponent))});

								processAttackTurn(character, currentTurn);
							}
						}
					}
				});
			}
			currentTurn++;
			// TODO end early if currentTurn is above a certain number?
			if (currentTurn > 9999) {
				continueBattle = false;
				party.battleLog.messages.push({ turn: currentTurn, message: 'Battle over due to too many turns.'});
			}
		}
		party.lastBattleMoment = currentMoment;
		return true;
	} else {
		return false;
	}
}

// TODO start battle - populate opponents (?) and set initial turns - see resolvePartyMoment
