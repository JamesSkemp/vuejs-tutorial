<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<h3>Party {{party.id}}</h3>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<button v-on:click="displayDisbandParty">Disband party</button>
			</div>
			<div class="col">
				<button v-on:click="addOpponent">Add an opponent</button>
			</div>
			<div class="col">
				<button v-on:click="displaySortHealth">Sort by health</button>
				<button v-on:click="displaySortDodge">Sort by dodge</button>
				<button v-on:click="displaySortArmor">Sort by armor</button>
				<button v-on:click="displaySortSpeed">Sort by speed</button>
			</div>
		</div>
		<div class="row">
			<div>
				State: {{ stateText }}<br />
				Location: {{ party.location }}
				<div v-html="JSON.stringify(party.journal)"></div>
				<div v-html="JSON.stringify(party.battleLog)"></div>
				<div v-if="party.mainCharacters.length > 0">
					<h4>Main characters ({{ party.mainCharacters.length }})</h4>
					<div>
						<CharacterDisplay v-for="character in party.mainCharacters" :party="party" :character="character" :key="character.id" />
					</div>
				</div>
				<div v-else>
					<p>There are no characters in this party.</p>
				</div>
				<div v-if="party.opponents.length > 0">
					<h4>Opponents</h4>
					<div>
						<CharacterDisplay v-for="opponent in party.opponents" :party="party" :character="opponent" :key="opponent.id" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CharacterDisplay from './CharacterDisplay.vue';
import Party from '../models/Party';
import { partyStateToText } from '../utilities/Enums'
import { disbandParty } from '../utilities/WorldUtilities';
import World from '../models/World';
import { sortBySpeed, sortByHealth, sortByDodge, sortByArmor } from '../utilities/CharacterSortUtilities';
import { addOpponent } from '../utilities/PartyUtilities';
import Character from '../models/Character';
@Options({
	components: {
		CharacterDisplay
	},
	props: {
		world: World,
		party: Party
	}
})

export default class PartyDisplay extends Vue {
	world!: World;
	party!: Party;
	stateText = '';

	created(): void {
		this.stateText = partyStateToText(this.party.state);
	}

	displayDisbandParty(): void {
		disbandParty(this.world, this.party);
		//this.$forceUpdate();
		this.$emit('party-disbanded', this.party.id);
	}

	displaySortHealth(): void {
		sortByHealth(this.party.mainCharacters);
		//this.$forceUpdate();
	}

	displaySortDodge(): void {
		sortByDodge(this.party.mainCharacters);
		//this.$forceUpdate();
	}

	displaySortArmor(): void {
		sortByArmor(this.party.mainCharacters);
		//this.$forceUpdate();
	}

	displaySortSpeed(): void {
		sortBySpeed(this.party.mainCharacters);
		//this.$forceUpdate();
	}

	addOpponent(): void {
		const opponent = new Character(-1);
		opponent.baseStats.health = 10;
		opponent.currentHealth = 10;
		opponent.baseStats.melee.attacks[0].damage = '1d4';

		addOpponent(this.party, opponent, this.world.currentMoment);
		//this.$forceUpdate();
	}
}
</script>

<style scoped>
</style>
