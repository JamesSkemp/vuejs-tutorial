<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
	<button v-on:click="rollDice">Roll dice</button>
	<p>{{ diceRoll }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DiceRoll, DiceRoller, Dice } from 'rpg-dice-roller';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  diceRoll = "";

  rollDice(): void {
	const rpgDiceRoller = new DiceRoller();
	const roll = rpgDiceRoller.roll('1d20');
	const roll2 = new DiceRoll('1d20');
	this.diceRoll = roll;
	this.diceRoll += ' |---| ' + roll2;
	console.log(roll);
	console.log(roll2);
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
