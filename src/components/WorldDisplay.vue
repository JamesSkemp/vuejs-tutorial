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
				<PartyDisplay v-for="party in this.$testWorld.parties" :party="party" :key="party.id" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PartyDisplay from './PartyDisplay.vue';
import World from '../models/World';
import { getUnusedPartyId, addPartyToWorld, disbandParty } from '../utilities/WorldUtilities';
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
		const testWorld: World = this.$testWorld;
		testWorld.parties = [];
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

		addPartyToWorld(testWorld, testParty);
		addPartyToWorld(testWorld);
		// Skip party id 2.
		addPartyToWorld(testWorld, new Party(4));
		addPartyToWorld(testWorld, new Party(3));

		console.log('sortbyhealth'); // should be 1, 2, 3, 4
		console.log(JSON.stringify(sortByHealth(testWorld.parties[0].mainCharacters)));
		console.log('getcharacterwithmosthealth'); // should be 1
		console.log(JSON.stringify(getCharacterWithHighestHealth(testWorld.parties[0].mainCharacters)));
		console.log('getcharacterwithleasthealth'); // should be 3
		console.log(JSON.stringify(getCharacterWithLowestHealth(testWorld.parties[0].mainCharacters)));
		console.log('highestMagic'); // should be null
		console.log(JSON.stringify(getCharacterWithHighestMagic(testWorld.parties[0].mainCharacters)));
		// TODO add additional item checks above and below
		console.log('sortbydodge'); // should be 4, 2, 1, 3
		console.log(JSON.stringify(sortByDodge(testWorld.parties[0].mainCharacters)));
		console.log('sortbyarmor'); // should be 2, 4, 1, 3 (only 2 first matters)
		console.log(JSON.stringify(sortByArmor(testWorld.parties[0].mainCharacters)));
		console.log('sortbyspeed'); // should be 3, 2, 4, 1
		console.log(JSON.stringify(sortBySpeed(testWorld.parties[0].mainCharacters)));

		console.log('getUnusedPartyId'); // should be 2
		console.log(getUnusedPartyId(testWorld));

		console.log('disband party');
		console.log(JSON.stringify(testWorld));
		console.log(disbandParty(testWorld, testWorld.parties[0]));
		console.log(JSON.stringify(testWorld));

		console.log('combine parties');
		console.log(JSON.stringify(testWorld.parties));
		console.log(combineParties([testWorld.parties[0], testWorld.parties[1], testWorld.parties[2], testWorld.parties[6]]));
		console.log(JSON.stringify(testWorld.parties));

		/*
		console.log('');
		console.log(JSON.stringify());
		*/

		console.log(testWorld);

		// Since we're using a global, force vue to update.
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
