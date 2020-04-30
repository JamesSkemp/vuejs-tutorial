<template>
	<div style="text-align:left;">
		<div>
			<button v-on:click="populateTestWorld">Populate test world</button>
			<br /><br />
		</div>
		<h2>World</h2>
		<template v-if="world">
			<p>{{ worldText }}</p>
			<div v-if="$testWorld && $testWorld.parties.length > 0">
				<PartyDisplay v-for="party in this.$testWorld.parties" :world="world" :party="party" :key="party.id" v-on:party-disbanded="refreshDisplay" />
			</div>
		</template>
		<button v-on:click="refreshDisplay">Refresh display</button>
		<button v-on:click="cleanParties">Remove empty parties</button>
		<br />
		<button v-on:click="displaySortByHealth">Sort by health</button>
		<button v-on:click="displaySortByDodge">Sort by dodge</button>
		<button v-on:click="displaySortByArmor">Sort by armor</button>
		<button v-on:click="displaySortBySpeed">Sort by speed</button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PartyDisplay from './PartyDisplay.vue';
import World from '../models/World';
import { getUnusedPartyId, addPartyToWorld, disbandParty, removeEmptyParties } from '../utilities/WorldUtilities';
import { combineParties } from '../utilities/PartyUtilities';
import Party from '../models/Party';
import { getCharacterWithHighestHealth, getCharacterWithLowestHealth, getCharacterWithHighestMagic } from '../utilities/CharacterFilterUtilities';
import { sortBySpeed, sortByHealth, sortByDodge, sortByArmor } from '../utilities/CharacterSortUtilities';
import Character from '../models/Character';
import StatModification from '../models/StatModification';

@Component({
	components: {
		PartyDisplay
	}
})

export default class WorldDisplay extends Vue {
	@Prop() world!: World;
	worldText = '';

	created() {
		console.log('WorldDisplay created');
		this.worldText = `Current moment: ${this.world.currentMoment}`;
	}

	populateTestWorld(): void {
		this.world.parties = [];
		const testParty= new Party(0);

		const testCharacter1 = new Character();
		testCharacter1.id = 1;
		testParty.mainCharacters.push(testCharacter1);

		const testCharacter2 = new Character();
		testCharacter2.id = 2;
		testCharacter2.currentHealth = 26;
		testCharacter2.statMods.speedModifications.push(new StatModification(-2, 1));
		testCharacter2.statMods.dodgeModifications.push(new StatModification(2, 1));
		testCharacter2.baseStats.armor = 1;
		testParty.mainCharacters.push(testCharacter2);

		const testCharacter3 = new Character();
		testCharacter3.id = 3;
		testCharacter3.baseStats.health = 27;
		testCharacter3.currentHealth = 26;
		testCharacter3.baseStats.speed = 8;
		testParty.mainCharacters.push(testCharacter3);

		const testCharacter4 = new Character();
		testCharacter4.id = 4;
		testCharacter4.currentHealth = 0;
		testCharacter4.baseStats.speed = 9;
		testCharacter4.baseStats.dodge = 8;
		testParty.mainCharacters.push(testCharacter4);

		addPartyToWorld(this.world, testParty);
		addPartyToWorld(this.world);
		// Skip party id 2.
		addPartyToWorld(this.world, new Party(4));
		addPartyToWorld(this.world, new Party(3));

		console.log('getcharacterwithmosthealth'); // should be 1
		console.log(JSON.stringify(getCharacterWithHighestHealth(this.world.parties[0].mainCharacters)));
		console.log('getcharacterwithleasthealth'); // should be 3
		console.log(JSON.stringify(getCharacterWithLowestHealth(this.world.parties[0].mainCharacters)));
		console.log('highestMagic'); // should be null
		console.log(JSON.stringify(getCharacterWithHighestMagic(this.world.parties[0].mainCharacters)));
		// TODO add additional item checks above and below

		console.log('getUnusedPartyId'); // should be 2
		console.log(getUnusedPartyId(this.world));

		console.log('combine parties');
		console.log(JSON.stringify(this.world.parties));
		console.log(combineParties([this.world.parties[0], this.world.parties[1], this.world.parties[2], this.world.parties[6]]));
		console.log(JSON.stringify(this.world.parties));

		/*
		console.log('');
		console.log(JSON.stringify());
		*/

		console.log(this.world);

		this.$testWorld = this.world;

		console.log(JSON.stringify(this.$testWorld));

		// Since we're using a global, force vue to update.
		this.$forceUpdate();
	}

	refreshDisplay(): void {
		this.$forceUpdate();
	}

	cleanParties(): void {
		removeEmptyParties(this.world);
		console.log('cleanParties');
		this.$forceUpdate();
	}

	displaySortByHealth(): void {
		sortByHealth(this.world.parties[0].mainCharacters);
		console.log('sort by health');
		this.$forceUpdate();
	}

	displaySortByDodge(): void {
		sortByDodge(this.world.parties[0].mainCharacters);
		console.log('sort by dodge');
		this.$forceUpdate();
	}

	displaySortByArmor(): void {
		sortByArmor(this.world.parties[0].mainCharacters);
		console.log('sort by armor');
		this.$forceUpdate();
	}

	displaySortBySpeed(): void {
		sortBySpeed(this.world.parties[0].mainCharacters);
		console.log('sort by speed');
		this.$forceUpdate();
	}
}
</script>

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
