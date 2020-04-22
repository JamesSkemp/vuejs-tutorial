<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
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
		<input type="number" v-model="healthMin" value="" /> -
		<input type="number" v-model="healthMax" value="" />
		<br />
		Attack:
		<input type="number" v-model="attackMin" value="" /> -
		<input type="number" v-model="attackMax" value="" />
		<br />
		Dodge:
		<input type="number" v-model="dodgeMin" value="" /> -
		<input type="number" v-model="dodgeMax" value="" />
		<br />
		Armor:
		<input type="number" v-model="armorMin" value="" /> -
		<input type="number" v-model="armorMax" value="" />
		<br />
		Speed:
		<input type="number" v-model="speedMin" value="" /> -
		<input type="number" v-model="speedMax" value="" />
		<br />
		Times to test:
		<input type="number" v-model="testTimes" value="" />
		<br />
		<button v-on:click="test">Test cases</button>
		<div v-html="testResults"></div>
	</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DiceRoll, DiceRoller } from 'rpg-dice-roller';
import World from '../models/World';
import Character from '../models/Character';
import StatModification from '../models/StatModification';
import { getShortBaseStats, sortBySpeed, attackOpponent, getSuperShortBaseStats } from '../utilities/CharacterUtilities';
import { createNewTestWorldForSingleBattle } from '../utilities/WorldUtilities';
import { resolvePartyMoment, partyHasOngoingBattle, partyHasLivingMainCharacters } from '../utilities/PartyUtilities';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  currentMoment = 0;
  endlessMode = false;
  timesRun = 0;
  timesRun2 = 0;
  diceRoll = "";
  finalResults: string[] = [];
  finalResultsShort: string[] = [];
  timer = -1;
  healthMin = 30;
  healthMax = 30;
  attackMin = 5;
  attackMax = 14;
  dodgeMin = 5;
  dodgeMax = 8;
  armorMin = 0;
  armorMax = 2;
  speedMin = 8;
  speedMax = 12;
  /**
   * Number of times to test each stat option.
   */
  testTimes = 10;
  testResults: string[] = [];
  finalResultShortLength = 0;

  created() {
	console.log('created');
	console.log(this.$world);

	this.attackMin = 12;
	this.dodgeMin = 7;
	this.armorMax = 1;
	this.speedMin = 10;
  }

  beforeDestroy() {
	clearInterval(this.timer);
  }

  startTimer() {
	this.timer = setInterval(() => {
		console.log('timer');
	}, 1000);
  }

  test(): void {
	const world: World = this.$world;
	for (let health = this.healthMin; health <= this.healthMax; health += 5) {
		//this.testResults.push(`Starting health ${health}`);
		for (let attack = this.attackMin; attack <= this.attackMax; attack++) {
			//this.testResults.push(`Starting attack ${attack}`);
			for (let dodge = this.dodgeMin; dodge <= this.dodgeMax; dodge++) {
				//this.testResults.push(`Starting dodge ${dodge}`);
				for (let armor = this.armorMin; armor <= this.armorMax; armor++) {
					//this.testResults.push(`Starting armor ${armor}`);
					for (let speed = this.speedMin; speed <= this.speedMax; speed++) {
						// Loop through x number of times.
						for (let runTime = 0; runTime < this.testTimes; runTime++) {

							const testCharacter = new Character();
							testCharacter.id = world.generateNextChracterId();
							testCharacter.side = 1;
							testCharacter.baseStats.health = health;
							testCharacter.baseStats.melee.value = attack;
							testCharacter.baseStats.dodge = dodge;
							testCharacter.baseStats.armor = armor;
							testCharacter.baseStats.speed = speed;
							testCharacter.setInitialTurn();

							const testOpponent = new Character();
							testOpponent.side = 2;
							testOpponent.baseStats.health = 10;
							testOpponent.currentHealth = 10;
							testOpponent.baseStats.melee.attacks[0].damage = '1d4';
							testOpponent.setInitialTurn();

							const testWorld = createNewTestWorldForSingleBattle(testCharacter, testOpponent);

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
									console.log(testWorld);
									break;
								}

								const partiesMoment = resolvePartyMoment(testWorld.parties[0], testWorld.currentMoment);

								if (partiesMoment.length > 0) {
									this.testResults.push(partiesMoment);
									turns++;
								}

								// TODO have this loop through all living characters and make sure only one party is represented
								if (partyHasOngoingBattle(testWorld.parties[0])) {
									testWorld.startNextMoment();
								} else {
									continueBattle = false;
									break;
								}
							}

							this.testResults.push(`Character ${JSON.stringify(getShortBaseStats(testCharacter))}`);

							this.finalResultsShort.push(`Character ${getSuperShortBaseStats(testCharacter)}, Time ${runTime}, Turns ${turns}, Heroes won ${partyHasLivingMainCharacters(testWorld.parties[0])}`);

							//this.testResults.push(JSON.stringify(testWorld));
						}
					}
				}
			}
		}
	}
	this.finalResultShortLength = this.finalResultsShort.length;
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

	let roll: DiceRoll | DiceRoll[];
	let damageRoll: DiceRoll | DiceRoll[];
	let dodgeRoll: DiceRoll | DiceRoll[];
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
	const world: World = this.$world;
	this.currentMoment = world.currentMoment;

	console.log(world);
	console.log(world.mainCharacters);
	if (world.mainCharacters.length === 0) {
		// Determine characters that are participating in the battle.
		const character1 = new Character();
		character1.id = world.generateNextChracterId();
		// TODO handle party setting better
		character1.side = 1;
		// TODO remove temporary boosts - added for testing
		character1.statMods.meleeModifications.push(new StatModification(2, 1));
		character1.statMods.dodgeModifications.push(new StatModification(1, 4));
		character1.statMods.speedModifications.push(new StatModification(-1, 1));
		character1.setInitialTurn();

		world.mainCharacters.push(character1);

		console.log(character1);
	}

	console.log(JSON.stringify(world));

	this.diceRoll = '';
	// Battle should always start at turn 0 and then increase until it hits a character's next turn. This allows characters to go first in some battles (surprise, skill).
	let turns = 0;

	// TODO pass id and possibly override object?
	const character2 = new Character();
	character2.side = 2;
	character2.baseStats.health = 10;
	character2.currentHealth = 10;
	character2.baseStats.melee.attacks[0].damage = '1d4';
	character2.setInitialTurn();
	console.log(character2.nextAttack);

	const rpgDiceRoller = new DiceRoller();

	let damageRoll: DiceRoll;
	// TODO sort by final stats
	// TODO will need to create battle group with just the characters fighting
	let characters: Character[] = [];
	characters = characters.concat(world.mainCharacters);
	characters.push(character2);

	console.log(JSON.stringify(characters));
	// Set the initial turn on all characters in the battle to the current moment.
	characters.forEach(character => {
		character.setInitialTurn(world.currentMoment);
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
					this.diceRoll += '<strong>Character going: ' + character.getShortDetails() + '</strong><br />';
					// TODO determine target - stop early if there's no one left alive?
					const opponent = characters.filter(c =>
						c.side !== character.side && c.currentHealth > 0
					)[0];

					console.log(opponent);

					this.diceRoll += JSON.stringify(attackOpponent(character, opponent)) + '<br />';

					character.processTurn(world.currentMoment);

				}
			});
			turns++;
		}

		// TODO have this loop through all living characters and make sure only one party is represented
		if (world.mainCharacters[0].currentHealth > 0 && character2.currentHealth > 0) {
			world.startNextMoment();
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
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
