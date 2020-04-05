<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
	<button v-on:click="rollDice">Roll dice - {{ timesRun }}</button>
	<button v-on:click="rollDice2">Roll dice 2 - {{ timesRun2 }}</button>
	<div v-html="diceRoll"></div>
	<div v-html="finalResults"></div>
	<div v-html="finalResultsShort"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DiceRoll, DiceRoller, Dice } from 'rpg-dice-roller';
import Character from '../models/Character';
import StatModification from '../models/StatModification';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  timesRun = 0;
  timesRun2 = 0;
  diceRoll = "";
  finalResults: string[] = [];
  finalResultsShort: string[] = [];

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

	let roll: DiceRoll = null;
	let damageRoll: DiceRoll = null;
	let dodgeRoll: DiceRoll = null;
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
		roll = rpgDiceRoller.roll('1d20');
		if (roll.total <= characters[currentCharacter].melee)
		{
			this.diceRoll += 'Character hit<br />';
			damageRoll = rpgDiceRoller.roll(characters[currentCharacter].damage);
			if (damageRoll.total > 0)
			{
				this.diceRoll += 'Damage of ' + damageRoll.total + '<br />';
				damageTotal = damageRoll.total;
				dodgeRoll = rpgDiceRoller.roll('1d20');
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
	this.diceRoll = '';
	const rpgDiceRoller = new DiceRoller();

	const character1 = new Character();
	character1.statMods.meleeModifications.push(new StatModification(2, 1));
	character1.statMods.dodgeModifications.push(new StatModification(1, 4));
	const character2 = new Character();
	character2.baseStats.health = 10;
	character2.currentHealth = 10;
	character2.baseStats.melee.attacks[0].damage = '1d4';

	let damageRoll: DiceRoll = null;
	let currentCharacter = 0;
	let nextCharacter = 1;
	let damageTotal = 0;
	let turns = 0;
	const characters = [
		character1, character2
	];

	while (character1.currentHealth > 0 && character2.currentHealth > 0)
	{
		if (currentCharacter == 0) {
			turns++;
		}
		this.diceRoll += '<strong>Character going: ' + currentCharacter + '</strong><br />';
		if (characters[currentCharacter].checkMelee())
		{
			this.diceRoll += 'Character hit<br />';
			damageRoll = rpgDiceRoller.roll(characters[currentCharacter].baseStats.melee.attacks[0].damage);
			if (damageRoll.total > 0)
			{
				this.diceRoll += 'Damage of ' + damageRoll.total + '<br />';
				damageTotal = damageRoll.total;
				if (characters[nextCharacter].checkDodge()) {
					damageTotal = Math.ceil(damageTotal / 2);
					this.diceRoll += 'Damage halved to ' + damageTotal + '<br />';
				}
				else
				{
					this.diceRoll += 'Dodge failed.' + '<br />';
				}
				characters[nextCharacter].takeDamage(damageTotal);
				this.diceRoll += 'Current health ' + characters[nextCharacter].currentHealth + '<br />';
			}
		}
		else
		{
			this.diceRoll += 'Attack missed ' + '<br />';
		}

		characters[currentCharacter].processTurn();

		currentCharacter = nextCharacter;
		nextCharacter = currentCharacter + 1;
		if (nextCharacter > 1) {
			nextCharacter = 0;
		}
	}

	let finalResult = 'Turns ' + turns;
	finalResult += ' Char 1: ' + character1.currentHealth;
	finalResult += ' Char 2: ' + character2.currentHealth;

	const finalResultShort = turns + ',' + (character1.currentHealth > 0 ? 0 : 1);

	this.diceRoll += '' + '<br />';
	this.diceRoll += 'Total turns: ' + turns + '<br />';
	this.diceRoll += 'Character 1 final health: ' + character1.currentHealth + '<br />';
	this.diceRoll += 'Character 2 final health: ' + character2.currentHealth + '<br />';

	this.finalResults.push(finalResult);
	this.finalResultsShort.push(finalResultShort);

	console.log('Character 1 ');
	console.log(JSON.stringify(character1));
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
