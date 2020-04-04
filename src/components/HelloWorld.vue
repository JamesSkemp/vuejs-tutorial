<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
	<button v-on:click="rollDice">Roll dice</button>
	<div v-html="diceRoll"></div>
	<div v-html="finalResults"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DiceRoll, DiceRoller, Dice } from 'rpg-dice-roller';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  diceRoll = "";
  finalResults: string[] = [];

  rollDice(): void {
	this.diceRoll = '';
	const rpgDiceRoller = new DiceRoller();

	const character1StartingStats = {
		health: 20,
		melee: 12,
		range: 10,
		magic: 0,
		dodge: 6,
		armor: 0,
		damage: '1d6',
		currentHealth: 20
	};
	const character2StartingStats = {
		health: 10,
		melee: 12,
		range: 10,
		magic: 0,
		dodge: 6,
		armor: 1,
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

	this.diceRoll += '' + '<br />';
	this.diceRoll += 'Total turns: ' + turns + '<br />';
	this.diceRoll += 'Character 1 final health: ' + character1StartingStats.currentHealth + '<br />';
	this.diceRoll += 'Character 2 final health: ' + character2StartingStats.currentHealth + '<br />';

	this.finalResults.push(finalResult);

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
	console.log(roll2);
	console.log(roll3);
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
