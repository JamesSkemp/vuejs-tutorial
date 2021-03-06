<template>
	<div class="container">
		<button v-on:click="startTimer">Start timer - {{ timer }}</button>
		<button v-on:click="rollDice">Roll dice - {{ timesRun }}</button>
		<button v-on:click="rollDice2">Roll dice 2 - {{ timesRun2 }}</button>
		<br />
		<input type="checkbox" id="endlessMode" value="true" v-model="endlessMode" />
		<label for="endlessMode">Endless Mode</label>
		<div>{{ currentMoment }}</div>
		<div v-html="diceRoll"></div>
		<div v-html="finalResults"></div>
		<div v-html="finalResultsShort"></div>
		<div>Final results short length: {{ finalResultShortLength }}</div>
		<div>
			Health:
			<input type="number" v-model.number="healthMin" /> -
			<input type="number" v-model.number="healthMax" />
			<br />
			Attack:
			<input type="number" v-model.number="attackMin" /> -
			<input type="number" v-model.number="attackMax" />
			<br />
			Dodge:
			<input type="number" v-model.number="dodgeMin" /> -
			<input type="number" v-model.number="dodgeMax" />
			<br />
			Armor:
			<input type="number" v-model.number="armorMin" /> -
			<input type="number" v-model.number="armorMax" />
			<br />
			Speed:
			<input type="number" v-model.number="speedMin" /> -
			<input type="number" v-model.number="speedMax" />
			<br />
			Damage:
			<input type="text" v-model="damage" />
			<br />
			Opponent health:
			<input type="number" v-model.number="opponentHealth" />
			<br />
			Opponent attack:
			<input type="number" v-model.number="opponentAttack" />
			<br />
			Opponent damage:
			<input type="text" v-model="opponentDamage" />
			<br />
			Opponent dodge:
			<input type="number" v-model.number="opponentDodge" />
			<br />
			Opponent armor:
			<input type="number" v-model.number="opponentArmor" />
			<br />
			Opponent speed:
			<input type="number" v-model.number="opponentSpeed" />
			<br />
			Times to test:
			<input type="number" v-model.number="testTimes" />
			<br />
			<button v-on:click="test">Test cases</button>
			<button v-on:click="clearTestResults">Clear test results</button>
			<div v-html="testResults"></div>
		</div>
		<div>
			<h2>Console World Testing</h2>
			Test character max health:
			<input type="number" v-model.number="testCharacterMaxHealth" />
			<br />
			Test character current health:
			<input type="number" v-model.number="testCharacterCurrentHealth" />
			<br />
			Test character melee:
			<input type="number" v-model.number="testCharacterMelee" />
			<br />
			Test character range:
			<input type="number" v-model.number="testCharacterRange" />
			<br />
			Test character magic:
			<input type="number" v-model.number="testCharacterMagic" />
			<br />
			Test character dodge:
			<input type="number" v-model.number="testCharacterDodge" />
			<br />
			Test character armor:
			<input type="number" v-model.number="testCharacterArmor" />
			<br />
			Test character speed:
			<input type="number" v-model.number="testCharacterSpeed" />
			<br />
			Test character damage:
			<input type="text" v-model="testCharacterDamage" />
			<br />
			<button v-on:click="addTestCharacter">Add test character</button>
		</div>

		<div v-html="dataDumps"></div>
		<div v-html="dataOutput"></div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { DiceRoll, DiceRoller } from 'rpg-dice-roller';
import World from '../models/World';
import Character from '../models/Character';
import StatModification from '../models/StatModification';
import { attackOpponent, getSuperShortBaseStats, revive, processAttackTurn, getShortDetails, setInitialTurn, getShortBaseStats } from '../utilities/CharacterUtilities';
import { createNewTestWorldForSingleBattle, startNextMoment, generateNextCharacterId } from '../utilities/WorldUtilities';
import { resolvePartyMoment, partyHasOngoingBattle, partyHasLivingMainCharacters } from '../utilities/PartyUtilities';
import { getCharacterWithHighestHealth } from '../utilities/CharacterFilterUtilities';
import { sortBySpeed, sortByHealth } from '../utilities/CharacterSortUtilities';
import { addMeleeModification, addDodgeModification, addSpeedModification } from '../utilities/StatModificationUtilities';
import CharacterData from '../data/CharacterData';
import { getBaseStatsPoints, getBaseStatAttacks } from '../utilities/BaseStatsUtilities';
import { attackPreferenceToText } from '../utilities/Enums';

@Options({})

export default class TestingControl extends Vue {
	currentMoment = 0;
	endlessMode = false;
	timesRun = 0;
	timesRun2 = 0;
	diceRoll = "";
	finalResults: string[] = [];
	finalResultsShort: string[] = [];
	timer = -1;
	healthMin = 24;
	healthMax = 36;
	attackMin = 5;
	attackMax = 14;
	dodgeMin = 5;
	dodgeMax = 8;
	armorMin = 0;
	armorMax = 2;
	speedMin = 8;
	speedMax = 12;
	damage = '1d6';
	opponentHealth = 10;
	opponentAttack = 12;
	opponentDamage = '1d4';
	opponentDodge = 6;
	opponentArmor = 0;
	opponentSpeed = 10;
	/**
	 * Number of times to test each stat option.
	 */
	testTimes = 10;
	testResults: string[] = [];
	finalResultShortLength = 0;
	testCharacterMaxHealth = 30;
	testCharacterCurrentHealth = 30;
	testCharacterMelee = 12;
	testCharacterRange = 10;
	testCharacterMagic = 0;
	testCharacterDodge = 6;
	testCharacterArmor = 0;
	testCharacterSpeed = 10;
	testCharacterDamage = '1d6';

	dataDumps: string[] = [];
	dataOutput = "";

	created(): void {
		console.log('component created');

		/*this.attackMin = 12;
		this.dodgeMin = 7;
		this.armorMax = 1;
		this.speedMin = 10;*/
		this.dataOutput = "";
		this.dataOutput += "<table><tbody>";
		CharacterData.Adventurers.forEach(adventurer => {
			this.dataDumps.push(`${adventurer.id} ${adventurer.shortName} ${getShortBaseStats(adventurer)}<br />`);
			this.dataOutput += `<tr><td>${adventurer.id}</td><td>${adventurer.shortName}</td><td>${getShortBaseStats(adventurer)}</td></tr>`
		});
		this.dataOutput += "</tbody></table>";
		this.dataOutput += "<h3>Balancing Testing</h3>";
		this.dataOutput += "<table><thead><tr><th>Id</th>Short Name<th></th><th>Health</th><th>Melee</th><th>Range</th><th>Magic</th><th>Dodge</th><th>Armor</th><th>Speed</th><th>Points</th></tr></thead><tbody>";

		let adventurerPoints: number[] = [];

		CharacterData.Adventurers.forEach(adventurer => {
			const adventurerPointTotal = getBaseStatsPoints(adventurer.baseStats);
			adventurerPoints.push(adventurerPointTotal);

			this.dataOutput += `<tr><td rowspan="3" class="balancing-row-id">${adventurer.id}</td><td rowspan="3" class="balancing-row-id">${adventurer.shortName}</td><td>${adventurer.baseStats.health}</td><td>${adventurer.baseStats.melee.value}</td><td>${adventurer.baseStats.range.value}</td><td>${adventurer.baseStats.magic.value}</td><td>${adventurer.baseStats.dodge}</td><td>${adventurer.baseStats.armor}</td><td>${adventurer.baseStats.speed}</td><td rowspan="3">${adventurerPointTotal}</td></tr>`;
			this.dataOutput += `<tr><td rowspan="2"></td><td>${getBaseStatAttacks(adventurer.baseStats.melee)}</td><td>${getBaseStatAttacks(adventurer.baseStats.range)}</td><td>${getBaseStatAttacks(adventurer.baseStats.magic)}</td><td colspan="3"></td></tr>`;
			this.dataOutput += `<tr><td colspan="3">Preferred Attack: ${attackPreferenceToText(adventurer.preferredAttack)}</td><td colspan="3"></td></tr>`;
		});
		this.dataOutput += "</tbody></table>";
		console.log('adventurerPoints');
		console.log(adventurerPoints.sort());
	}

	beforeDestroy(): void {
		clearInterval(this.timer);
	}

	startTimer(): void {
		this.timer = setInterval(() => {
			console.log('timer');
		}, 1000);
	}

	clearTestResults(): void {
		this.finalResultsShort = [];
	}

	test(): void {
		const world: World = new World();
		const totalMomentsWon: number[] = [];
		const totalMomentsLost: number[] = [];
		for (let health = this.healthMin; health <= this.healthMax; health++) {
			if (health % 3 !== 0) {
				continue;
			}
			console.log(health);
			//this.testResults.push(`Starting health ${health}`);
			for (let attack = this.attackMin; attack <= this.attackMax; attack++) {
				console.log(attack);
				//this.testResults.push(`Starting attack ${attack}`);
				for (let dodge = this.dodgeMin; dodge <= this.dodgeMax; dodge++) {
					//this.testResults.push(`Starting dodge ${dodge}`);
					for (let armor = this.armorMin; armor <= this.armorMax; armor++) {
						//this.testResults.push(`Starting armor ${armor}`);
						for (let speed = this.speedMin; speed <= this.speedMax; speed++) {
							// Loop through x number of times.
							for (let runTime = 0; runTime < this.testTimes; runTime++) {

								const testCharacter = new Character(-1, true);
								testCharacter.id = generateNextCharacterId(world);
								testCharacter.side = 1;
								testCharacter.baseStats.health = health;
								testCharacter.baseStats.melee.value = attack;
								testCharacter.baseStats.melee.attacks[0].damage = this.damage;
								testCharacter.baseStats.dodge = dodge;
								testCharacter.baseStats.armor = armor;
								testCharacter.baseStats.speed = speed;
								setInitialTurn(testCharacter);

								const testOpponent = new Character(-1);
								testOpponent.side = 2;
								testOpponent.baseStats.health = this.opponentHealth;
								testOpponent.currentHealth = this.opponentHealth;
								testOpponent.baseStats.melee.value = this.opponentAttack
								testOpponent.baseStats.melee.attacks[0].damage = this.opponentDamage;
								testOpponent.baseStats.dodge = this.opponentDodge;
								testOpponent.baseStats.armor = this.opponentArmor;
								testOpponent.baseStats.speed = this.opponentSpeed;
								setInitialTurn(testOpponent);

								const testWorld = createNewTestWorldForSingleBattle([testCharacter], [testOpponent]);

								let continueBattle = true;
								let turns = 0;
								console.log('start battle');

								// TODO should actually loop through characters by speed instead; those with smaller speed go first
								let whileLoopNumber = 0;
								while (continueBattle)
								{
									whileLoopNumber++;
									if (whileLoopNumber > 500) {
										console.log('more than 500 turns');
										this.finalResultsShort.push(`[ENDED EARLY] Character ${getSuperShortBaseStats(testCharacter)}, Time ${runTime}, Turns ${turns}, Adventurer health ${testWorld.parties[0].mainCharacters[0].currentHealth}, Opponent health ${testWorld.parties[0].opponents[0].currentHealth}`);
										//console.log(testWorld);
										totalMomentsLost.push(whileLoopNumber);
										break;
									}

									resolvePartyMoment(testWorld.parties[0], testWorld.currentMoment);

									//this.testResults.push(testWorld.parties[].journal.entries);
									turns++;

									// TODO have this loop through all living characters and make sure only one party is represented
									if (partyHasOngoingBattle(testWorld.parties[0])) {
										startNextMoment(testWorld);
									} else {
										continueBattle = false;
										break;
									}
								}

								//this.testResults.push(`Character ${JSON.stringify(getShortBaseStats(testCharacter))}`);
								if (!partyHasLivingMainCharacters(testWorld.parties[0])) {
									this.finalResultsShort.push(`Character ${getSuperShortBaseStats(testCharacter)}, Time ${runTime}, Turns ${turns} / ${whileLoopNumber}, Adventurers won ${partyHasLivingMainCharacters(testWorld.parties[0])}`);
									totalMomentsLost.push(whileLoopNumber);
								} else {
									totalMomentsWon.push(whileLoopNumber);
								}

								//this.testResults.push(JSON.stringify(testWorld));
							}
						}
					}
				}
			}
		}
		this.finalResultShortLength = this.finalResultsShort.length;
		//console.log(totalMomentsWon);
		//console.log(totalMomentsLost);

		window['slTotalMoments'] = { 'won': totalMomentsWon, 'lost': totalMomentsLost };
		console.log(window['slTotalMoments']);
	}

	rollDice(): void {
		this.diceRoll = '';
		const rpgDiceRoller = new DiceRoller();

		const character1StartingStats = {
			health: 30,
			melee: 12,
			range: 10,
			magic: 0,
			dodge: 6,
			armor: 0,
			damage: '1d6',
			currentHealth: 30
		};
		const character2StartingStats = {
			health: 10,
			melee: 12,
			range: 10,
			magic: 0,
			dodge: 6,
			armor: 0,
			damage: '1d4',
			currentHealth: 10
		};

		let roll: DiceRoll;
		let damageRoll: DiceRoll;
		let dodgeRoll: DiceRoll;
		let currentCharacter = 0;
		let nextCharacter = 1;
		let damageTotal = 0;
		let turns = 0;
		const characters = [
			character1StartingStats, character2StartingStats
		];

		while (character1StartingStats.currentHealth > 0 && character2StartingStats.currentHealth > 0)
		{
			if (currentCharacter == 0) {
				turns++;
			}
			this.diceRoll += '<strong>Character going: ' + currentCharacter + '</strong><br />';
			roll = rpgDiceRoller.roll('1d20')[0];
			if (roll.total <= characters[currentCharacter].melee)
			{
				this.diceRoll += 'Character hit<br />';
				damageRoll = rpgDiceRoller.roll(characters[currentCharacter].damage)[0];
				if (damageRoll.total > 0)
				{
					this.diceRoll += 'Damage of ' + damageRoll.total + '<br />';
					damageTotal = damageRoll.total;
					dodgeRoll = rpgDiceRoller.roll('1d20')[0];
					this.diceRoll += 'Dodge of ' + dodgeRoll.total + '<br />';
					if (dodgeRoll.total <= characters[nextCharacter].dodge) {
						damageTotal = Math.ceil(damageTotal / 2);
						this.diceRoll += 'Damage halved to ' + damageTotal + '<br />';
					}
					else
					{
						this.diceRoll += 'Dodge failed.' + '<br />';
					}
					if (characters[nextCharacter].armor > 0)
					{
						damageTotal -= characters[nextCharacter].armor;
						this.diceRoll += 'Armor reduces damage to ' + damageTotal + '<br />';
					}
					if (damageTotal < 0)
					{
						damageTotal = 0;
					}
					characters[nextCharacter].currentHealth -= damageTotal;
					this.diceRoll += 'Current health ' + characters[nextCharacter].currentHealth + '<br />';
				}
			}
			else
			{
				this.diceRoll += 'Attack missed ' + '<br />';
			}

			currentCharacter = nextCharacter;
			nextCharacter = currentCharacter + 1;
			if (nextCharacter > 1) {
				nextCharacter = 0;
			}
		}

		let finalResult = 'Turns ' + turns;
		finalResult += ' Char 1: ' + character1StartingStats.currentHealth;
		finalResult += ' Char 2: ' + character2StartingStats.currentHealth;

		const finalResultShort = turns + ',' + (character1StartingStats.currentHealth > 0 ? 0 : 1);

		this.diceRoll += '' + '<br />';
		this.diceRoll += 'Total turns: ' + turns + '<br />';
		this.diceRoll += 'Character 1 final health: ' + character1StartingStats.currentHealth + '<br />';
		this.diceRoll += 'Character 2 final health: ' + character2StartingStats.currentHealth + '<br />';

		this.finalResults.push(finalResult);
		this.finalResultsShort.push(finalResultShort);

		console.log('Character 1 ');
		console.log(character1StartingStats);
		console.log('Character 2 ');
		console.log(character2StartingStats);

		console.log(rpgDiceRoller);

		// Roll a 1d20 to see if the character hits.

		// Check to see if the attack is dodged.

		// Roll for attack damage.

		// Subtract armor from damage.

		// Remove health for damage.


		const roll2 = rpgDiceRoller.roll('1d20');
		const roll3 = new DiceRoll('1d20');
		this.diceRoll += roll2;
		this.diceRoll += ' |---| ' + roll3;
		this.diceRoll += ' |---| ' + rpgDiceRoller.roll('d1-1+3');
		console.log(roll2);
		console.log(roll3);

		this.timesRun++;
	}

	rollDice2(): void {
		// TODO this should persist
		const world: World = new World();
		this.currentMoment = world.currentMoment;

		console.log(world);
		console.log(world.mainCharacters);
		if (world.mainCharacters.length === 0) {
			// Determine characters that are participating in the battle.
			const character1 = new Character(-1, true);
			character1.id = generateNextCharacterId(world);
			// TODO handle party setting better
			character1.side = 1;
			// TODO remove temporary boosts - added for testing
			addMeleeModification(character1.statMods, new StatModification(2, 1));
			addDodgeModification(character1.statMods, new StatModification(1, 4));
			addSpeedModification(character1.statMods, new StatModification(-1, 1));
			setInitialTurn(character1);

			world.mainCharacters.push(character1);

			console.log(character1);
		}

		console.log(JSON.stringify(world));

		this.diceRoll = '';
		// Battle should always start at turn 0 and then increase until it hits a character's next turn. This allows characters to go first in some battles (surprise, skill).
		let turns = 0;

		// TODO pass id and possibly override object?
		const character2 = new Character(-1);
		character2.side = 2;
		character2.baseStats.health = 10;
		character2.currentHealth = 10;
		character2.baseStats.melee.attacks[0].damage = '1d4';
		setInitialTurn(character2);
		console.log(character2.nextAttack);

		const rpgDiceRoller = new DiceRoller();

		// TODO sort by final stats
		// TODO will need to create battle group with just the characters fighting
		let characters: Character[] = [];
		characters = characters.concat(world.mainCharacters);
		characters.push(character2);

		console.log(JSON.stringify(characters));
		// Set the initial turn on all characters in the battle to the current moment.
		characters.forEach(character => {
			setInitialTurn(character, world.currentMoment);
		})

		console.log(JSON.stringify(characters));
		characters = sortBySpeed(characters);

		console.log(JSON.stringify(characters));
		// TODO start counting up

		let continueBattle = true;
		console.log('start battle');

		// TODO should actually loop through characters by speed instead; those with smaller speed go first
		let whileLoopNumber = 0;
		while (continueBattle)
		{
			whileLoopNumber++;
			this.diceRoll += `While loop number ${whileLoopNumber}<br />`;
			if (whileLoopNumber > 100) {
				console.log('more than 100 turns');
				console.log(world);
				console.log(JSON.stringify(characters));
				return;
			}

			/*characters.forEach(c => {
				console.log(c.nextAttack);
				console.log(c.currentHealth);
			});*/
			console.log(JSON.stringify(characters.filter(c => c.currentHealth > 0 && c.nextAttack <= world.currentMoment)));
			const charactersActingThisTurn = sortBySpeed(characters.filter(c =>
				c.currentHealth > 0 && c.nextAttack <= world.currentMoment
			));

			console.log(JSON.stringify(charactersActingThisTurn));

			if (charactersActingThisTurn.length > 0) {
				// TODO if a character is slowed the turn they are supposed to go, do they still go? I think the answer is yes since this is effectively them acting at the same time ... or maybe we need to do a check anyway ...
				charactersActingThisTurn.forEach(character => {
					// Verify that they should still be going.
					if (character.nextAttack <= world.currentMoment) {
						this.diceRoll += '<strong>Character going: ' + getShortDetails(character) + '</strong><br />';
						// TODO determine target - stop early if there's no one left alive?
						const opponent = characters.filter(c =>
							c.side !== character.side && c.currentHealth > 0
						)[0];

						console.log(opponent);

						this.diceRoll += JSON.stringify(attackOpponent(character, opponent)) + '<br />';

						processAttackTurn(character, world.currentMoment);
					}
				});
				turns++;
			}

			// TODO have this loop through all living characters and make sure only one party is represented
			if (world.mainCharacters[0].currentHealth > 0 && character2.currentHealth > 0) {
				startNextMoment(world);
			} else {
				continueBattle = false;
				break;
			}
		}

		let finalResult = 'Turns ' + turns;
		finalResult += ' Char 1: ' + world.mainCharacters[0].currentHealth;
		finalResult += ' Char 2: ' + character2.currentHealth;

		const finalResultShort = turns + ',' + (world.mainCharacters[0].currentHealth > 0 ? 0 : 1);

		this.diceRoll += '' + '<br />';
		this.diceRoll += 'Total turns: ' + turns + '<br />';
		this.diceRoll += 'Character 1 final health: ' + world.mainCharacters[0].currentHealth + '<br />';
		this.diceRoll += 'Character 2 final health: ' + character2.currentHealth + '<br />';

		this.finalResults.push(finalResult);
		this.finalResultsShort.push(finalResultShort);

		console.log('Character 1 ');
		console.log(JSON.stringify(world.mainCharacters[0]));
		console.log('Character 2 ');
		console.log(JSON.stringify(character2));

		console.log(rpgDiceRoller);

		// Roll a 1d20 to see if the character hits.

		// Check to see if the attack is dodged.

		// Roll for attack damage.

		// Subtract armor from damage.

		// Remove health for damage.

		this.timesRun2++;
		// TODO change to have the character rest, using turns as needed
		world.mainCharacters.forEach(character => {
			revive(character);
			character.isInBattle = false;
		});
	}

	addTestCharacter(): void {
		const testWorld: World = (window as any).$testWorld;

		const newCharacter = new Character(-1, true);
		newCharacter.baseStats.health = this.testCharacterMaxHealth;
		newCharacter.currentHealth = this.testCharacterCurrentHealth;
		newCharacter.baseStats.melee.value = this.testCharacterMelee;
		newCharacter.baseStats.melee.attacks[0].damage = this.testCharacterDamage;
		newCharacter.baseStats.range.value = this.testCharacterRange;
		newCharacter.baseStats.magic.value = this.testCharacterMagic;
		newCharacter.baseStats.dodge = this.testCharacterDodge;
		newCharacter.baseStats.armor = this.testCharacterArmor;
		newCharacter.baseStats.speed = this.testCharacterSpeed;

		testWorld.mainCharacters.push(newCharacter);

		console.log('sortbyhealth');
		console.log(JSON.stringify(sortByHealth(testWorld.mainCharacters)));
		console.log('getcharacterwithmosthealth');
		console.log(JSON.stringify(getCharacterWithHighestHealth(testWorld.mainCharacters)));
		console.log('sortbyspeed');
		console.log(JSON.stringify(sortBySpeed(testWorld.mainCharacters)));

		/*
		console.log('');
		console.log(JSON.stringify());
		*/

		console.log(testWorld);
	}
}
</script>

<style>
	.balancing-row-id {
		vertical-align: top;
	}
</style>
