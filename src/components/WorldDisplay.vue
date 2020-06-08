<template>
	<b-container>
		<b-row>
			<b-col>
				<h2>World</h2>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<button v-on:click="populateTestWorld">Populate test world</button>
			</b-col>
			<b-col>
				<button v-on:click="loadWorld">Load world (test-only)</button>
			</b-col>
		</b-row>
		<b-row v-if="world && world.parties.length > 0">
			<b-col>
				<button v-if="world && world.parties.length > 0" v-on:click="saveWorld">Save world</button>
			</b-col>
			<b-col>
				<button v-on:click="cleanParties">Remove empty parties</button>
			</b-col>
			<b-col>
				Sorting options:<br />
				<button v-on:click="displaySortByHealth">Sort by health</button>
				<button v-on:click="displaySortByDodge">Sort by dodge</button>
				<button v-on:click="displaySortByArmor">Sort by armor</button>
				<button v-on:click="displaySortBySpeed">Sort by speed</button>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
			</b-col>
			<b-col>
			</b-col>
			<b-col>
			</b-col>
		</b-row>
		<b-row>
			<div style="text-align:left;">
				<div>
					<br /><br />
					<div v-html="worldMessages"></div>
				</div>
				<template v-if="world && world.parties.length > 0">
					<p>Total parties: {{world.parties.length}}</p>
					<p>Current moment: {{ worldMoment }}</p>
					<button v-on:click="increaseTime">Increase time</button>
					<button v-on:click="startBattle">Start a battle</button>
					<div v-if="world && world.parties.length > 0">
						<PartyDisplay v-for="party in world.parties" :world="world" :party="party" :key="party.id" v-on:party-disbanded="refreshDisplay" />
					</div>
				</template>
				<button v-on:click="refreshDisplay">Refresh display</button>
				<br />
			</div>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PartyDisplay from './PartyDisplay.vue';
import World from '../models/World';
import { getUnusedPartyId, addPartyToWorld, removeEmptyParties, startNextMoment } from '../utilities/WorldUtilities';
import { addMainCharacter } from '../utilities/PartyUtilities';
import Party from '../models/Party';
import { getCharacterWithHighestHealth, getCharacterWithLowestHealth, getCharacterWithHighestMagic } from '../utilities/CharacterFilterUtilities';
import { sortBySpeed, sortByHealth, sortByDodge, sortByArmor } from '../utilities/CharacterSortUtilities';
import Character from '../models/Character';
import StatModification from '../models/StatModification';

type EquivalenceResult = { equivalent: boolean, differences: string[] }

@Component({
	components: {
		PartyDisplay
	}
})

export default class WorldDisplay extends Vue {
	// TODO save and load this
	world: World = new World();
	worldMoment = -1;
	worldMessages = '';

	created(): void {
		console.log('WorldDisplay created');
		this.worldMoment = this.world.currentMoment;
	}

	populateTestWorld(): void {
		this.world.parties = [];
		const testParty = new Party(0);
		const testParty4 = new Party(4);

		const testCharacter1 = new Character();
		testCharacter1.id = 1;
		addMainCharacter(testParty, testCharacter1);

		const testCharacter2 = new Character();
		testCharacter2.id = 2;
		testCharacter2.currentHealth = 26;
		testCharacter2.statMods.speedModifications.push(new StatModification(-2, 1));
		testCharacter2.statMods.dodgeModifications.push(new StatModification(2, 1));
		testCharacter2.baseStats.armor = 1;
		addMainCharacter(testParty, testCharacter2);

		const testCharacter3 = new Character();
		testCharacter3.id = 3;
		testCharacter3.baseStats.health = 27;
		testCharacter3.currentHealth = 26;
		testCharacter3.baseStats.speed = 8;
		addMainCharacter(testParty4, testCharacter3);

		const testCharacter4 = new Character();
		testCharacter4.id = 4;
		testCharacter4.currentHealth = 0;
		testCharacter4.baseStats.speed = 9;
		testCharacter4.baseStats.dodge = 8;
		addMainCharacter(testParty, testCharacter4);

		addPartyToWorld(this.world, testParty);
		addPartyToWorld(this.world);
		// Skip party id 2.
		addPartyToWorld(this.world, testParty4);
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

		/*console.log('combine parties');
		console.log(JSON.stringify(this.world.parties));
		console.log(combineParties([this.world.parties[0], this.world.parties[1], this.world.parties[2], this.world.parties[6]]));
		console.log(JSON.stringify(this.world.parties));*/

		/*
		console.log('');
		console.log(JSON.stringify());
		*/

		console.log(this.world);
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
		// TODO all of the forceUpdate calls need to be removed
		this.$forceUpdate();
	}

	increaseTime(): void {
		this.worldMessages = JSON.stringify(startNextMoment(this.world));
		this.worldMoment = this.world.currentMoment;
		//this.$forceUpdate();
	}

	saveWorld(): boolean {
		localStorage.setItem('mainWorld', JSON.stringify(this.world));
		console.log(localStorage.getItem('mainWorld'));
		return true;
	}

	loadWorld(): boolean {
		const savedData = localStorage.getItem('mainWorld');
		if (savedData) {
			const savedWorld = JSON.parse(savedData.toString());

			console.log(this.isEquivalent(this.world, savedWorld));
			// TODO actually load world - world may need to be manually added, but remaining items just assigned over?
		}

		return false;
	}

	startBattle(): void {
		// TODO start battle
	}

	isEquivalent(a, b): EquivalenceResult {
		// Create arrays of property names
		const aProps = Object.getOwnPropertyNames(a);
		const bProps = Object.getOwnPropertyNames(b);

		let equivalent = true;
		const differences: string[] = [];

		// If number of properties is different,
		// objects are not equivalent
		if (aProps.length != bProps.length) {
			equivalent = false;
		}

		for (let i = 0; i < aProps.length; i++) {
			const propName = aProps[i];

			// If values of same property are not equal,
			// objects are not equivalent
			if (a[propName] !== b[propName]) {
				differences.push(propName);
				equivalent = false;
			}
		}

		// If we made it this far, objects
		// are considered equivalent
		return { equivalent, differences };
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
