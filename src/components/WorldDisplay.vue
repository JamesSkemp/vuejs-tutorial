<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<h2>World</h2>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<button v-on:click="startNewWorld">Start new world</button>
			</div>
			<div class="col">
				<button v-on:click="populateTestWorld">Populate test world</button>
			</div>
			<div class="col">
				<button v-on:click="loadWorld">Load world (test-only)</button>
			</div>
		</div>
		<div class="row" v-if="world && world.parties.length > 0">
			<div class="col">
				<button v-if="world && world.parties.length > 0" v-on:click="saveWorld">Save world</button>
			</div>
			<div class="col">
				<button v-on:click="cleanParties">Remove empty parties</button>
			</div>
			<div class="col">
				Sorting options:<br />
				<button v-on:click="displaySortByHealth">Sort by health</button>
				<button v-on:click="displaySortByDodge">Sort by dodge</button>
				<button v-on:click="displaySortByArmor">Sort by armor</button>
				<button v-on:click="displaySortBySpeed">Sort by speed</button>
			</div>
		</div>
		<div class="row">
			<div class="col">
			</div>
			<div class="col">
			</div>
			<div class="col">
			</div>
		</div>
		<div class="row">
			<div style="text-align:left;">
				<div>
					<br /><br />
					<div v-html="worldMessages"></div>
				</div>
				<template v-if="world && world.parties.length > 0">
					<p>Total parties: {{world.parties.length}}</p>
					<p>Current moment: {{ worldMoment }}</p>
					<button v-on:click="increaseTime">Increase time</button>
					<button v-on:click="toggleAutoTime">Toggle auto-time</button>
					<div v-if="world && world.parties.length > 0">
						<PartyDisplay v-for="party in world.parties" :world="world" :party="party" :key="party.id" v-on:party-disbanded="refreshDisplay" />
					</div>
				</template>
				<button v-on:click="refreshDisplay">Refresh display</button>
				<br />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PartyDisplay from './PartyDisplay.vue';
import World from '../models/World';
import { getUnusedPartyId, addPartyToWorld, removeEmptyParties, startNextMoment, createNewWorld } from '../utilities/WorldUtilities';
import { addMainCharacter } from '../utilities/PartyUtilities';
import Party from '../models/Party';
import { getCharacterWithHighestHealth, getCharacterWithLowestHealth, getCharacterWithHighestMagic } from '../utilities/CharacterFilterUtilities';
import { sortBySpeed, sortByHealth, sortByDodge, sortByArmor } from '../utilities/CharacterSortUtilities';
import Character from '../models/Character';
import StatModification from '../models/StatModification';
import { getLatestJournalEntries } from '@/utilities/JournalUtilities';

type EquivalenceResult = { equivalent: boolean, differences: string[] }

@Options({
	components: {
		PartyDisplay
	}
})

export default class WorldDisplay extends Vue {
	// TODO save and load this
	world: World = new World();
	worldMoment = -1;
	worldMessages = '';
	timer: number = -1;
	// TODO should this be stored on the world? probably not since the world should just run
	timerRunning = false;

	created(): void {
		console.log('WorldDisplay created!');
		this.worldMoment = this.world.currentMoment;
	}

	startNewWorld(): void {
		// Clear the current world.
		this.world = createNewWorld();
		this.worldMoment = this.world.currentMoment;
		this.worldMessages = "New world started.";

		console.log(this.world);
	}

	populateTestWorld(): void {
		this.world.parties = [];
		const testParty = new Party(0);
		const testParty4 = new Party(4);

		const testCharacter1 = new Character(-1, true);
		testCharacter1.id = 1;
		addMainCharacter(testParty, testCharacter1, this.world.currentMoment);

		const testCharacter2 = new Character(-1, true);
		testCharacter2.id = 2;
		testCharacter2.currentHealth = 26;
		testCharacter2.statMods.speedModifications.push(new StatModification(-2, 1));
		testCharacter2.statMods.dodgeModifications.push(new StatModification(2, 1));
		testCharacter2.baseStats.armor = 1;
		addMainCharacter(testParty, testCharacter2, this.world.currentMoment);

		const testCharacter3 = new Character(-1, true);
		testCharacter3.id = 3;
		testCharacter3.baseStats.health = 27;
		testCharacter3.currentHealth = 26;
		testCharacter3.baseStats.speed = 8;
		addMainCharacter(testParty4, testCharacter3, this.world.currentMoment);

		const testCharacter4 = new Character(-1, true);
		testCharacter4.id = 4;
		testCharacter4.currentHealth = 0;
		testCharacter4.baseStats.speed = 9;
		testCharacter4.baseStats.dodge = 8;
		addMainCharacter(testParty, testCharacter4, this.world.currentMoment);

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
		//this.$forceUpdate();
	}

	cleanParties(): void {
		removeEmptyParties(this.world);
		console.log('cleanParties');
		//this.$forceUpdate();
	}

	displaySortByHealth(): void {
		sortByHealth(this.world.parties[0].mainCharacters);
		console.log('sort by health');
		//this.$forceUpdate();
	}

	displaySortByDodge(): void {
		sortByDodge(this.world.parties[0].mainCharacters);
		console.log('sort by dodge');
		//this.$forceUpdate();
	}

	displaySortByArmor(): void {
		sortByArmor(this.world.parties[0].mainCharacters);
		console.log('sort by armor');
		//this.$forceUpdate();
	}

	displaySortBySpeed(): void {
		sortBySpeed(this.world.parties[0].mainCharacters);
		console.log('sort by speed');
		// TODO all of the forceUpdate calls need to be removed
		//this.$forceUpdate();
	}

	increaseTime(): void {
		startNextMoment(this.world);
		this.worldMessages = JSON.stringify(getLatestJournalEntries(this.world.journal));
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

	/**
	 * Start or stop automatic time, depending upon current state.
	 */
	toggleAutoTime(): void {
		// TODO switch to having this running by default?
		if (this.timerRunning) {
			clearInterval(this.timer);
		} else {
			this.timer = setInterval(this.increaseTime, 5000);
		}
		this.timerRunning = !this.timerRunning;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isEquivalent(a: any, b: any): EquivalenceResult {
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

	beforeDestroy(): void {
		clearInterval(this.timer);
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
