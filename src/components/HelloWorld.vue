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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DiceRoll, DiceRoller, Dice } from 'rpg-dice-roller';
import World from '../models/World';
import Character from '../models/Character';
import StatModification from '../models/StatModification';

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

  created() {
	console.log('created');
	console.log(this.$world);
  }

  beforeDestroy() {
	clearInterval(this.timer);
  }

  startTimer() {
	this.timer = setInterval(() => {
		console.log('timer');
	}, 1000);
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
		// TODO handle party setting better
		character1.party = 1;
		// TODO remove temporary boosts - added for testing
		character1.statMods.meleeModifications.push(new StatModification(2, 1));
		character1.statMods.dodgeModifications.push(new StatModification(1, 4));
		character1.statMods.speedModifications.push(new StatModification(-1, 1));
		character1.setInitialTurn();
		character1.id = world.generateNextChracterId();

		world.mainCharacters.push(character1);

		console.log(character1);
	}

	console.log(JSON.stringify(world));

	this.diceRoll = '';
	// Battle should always start at turn 0 and then increase until it hits a character's next turn. This allows characters to go first in some battles (surprise, skill).
	let turns = 0;

	// TODO pass id and possibly override object?
	const character2 = new Character();
	character2.party = 2;
	character2.baseStats.health = 10;
	character2.currentHealth = 10;
	character2.baseStats.melee.attacks[0].damage = '1d4';
	character2.setInitialTurn();
	console.log(character2.nextAttack);

	const rpgDiceRoller = new DiceRoller();

	let damageRoll: DiceRoll;
	let damageTotal = 0;
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
	characters = characters.sort((n1, n2) => {
		// First order by their next attack.
		let speedCheck = n2.nextAttack - n1.nextAttack;
		if (speedCheck === 0) {
			// If there's a tie we'll compare modified speed stats.
			speedCheck = n2.getCurrentSpeed() - n1.getCurrentSpeed();
			if (speedCheck === 0) {
				// If those are the same compare base stats.
				speedCheck = n2.baseStats.speed - n1.baseStats.speed;
			}
		}

		return speedCheck;
	});

	console.log(JSON.stringify(characters));
	// TODO start counting up

	let continueBattle = true;
	console.log('start battle');

	// TODO should actually loop through characters by speed instead; those with smaller speed go first
	let whileLoopNumber = 0;
	while (continueBattle)
	{
		whileLoopNumber++;
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
		const charactersActingThisTurn = characters.filter(c =>
			c.currentHealth > 0 && c.nextAttack <= world.currentMoment
		).sort((n1, n2) => {
			// First order by their next attack.
			let speedCheck = n2.nextAttack - n1.nextAttack;
			if (speedCheck === 0) {
			// If there's a tie we'll compare modified speed stats.
				speedCheck = n2.getCurrentSpeed() - n1.getCurrentSpeed();
				if (speedCheck === 0) {
					// If those are the same compare base stats.
					speedCheck = n2.baseStats.speed - n1.baseStats.speed;
				}
			}
			return speedCheck;
		});

		console.log(JSON.stringify(charactersActingThisTurn));

		if (charactersActingThisTurn.length > 0) {
			// TODO if a character is slowed the turn they are supposed to go, do they still go? I think the answer is yes since this is effectively them acting at the same time ... or maybe we need to do a check anyway ...
			charactersActingThisTurn.forEach(character => {
				// Verify that they should still be going.
				if (character.nextAttack <= world.currentMoment) {
					this.diceRoll += '<strong>Character going: ' + character + '</strong><br />';
					// TODO determine target - stop early if there's no one left alive?
					const opponent = characters.filter(c =>
						c.party !== character.party && c.currentHealth > 0
					)[0];

					console.log(opponent);

					if (character.checkMelee())
					{
						this.diceRoll += 'Character hit<br />';
						damageRoll = rpgDiceRoller.roll(character.baseStats.melee.attacks[0].damage);
						if (damageRoll.total > 0)
						{
							this.diceRoll += 'Damage of ' + damageRoll.total + '<br />';
							damageTotal = damageRoll.total;
							if (opponent.checkDodge()) {
								damageTotal = Math.ceil(damageTotal / 2);
								this.diceRoll += 'Damage halved to ' + damageTotal + '<br />';
							}
							else
							{
								this.diceRoll += 'Dodge failed.' + '<br />';
							}
							opponent.takeDamage(damageTotal);
							this.diceRoll += 'Current health ' + opponent.currentHealth + '<br />';
						}
					}
					else
					{
						this.diceRoll += 'Attack missed ' + '<br />';
					}

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
