<template>
	<div class="partyBlock">
		<h2>{{ partyHeading }}</h2>
		<div>
			State: {{ stateText }}
			<div v-if="party.mainCharacters.length > 0">
				<h3>Main characters ({{ party.mainCharacters.length }})</h3>
				<div>
					<CharacterDisplay v-for="character in party.mainCharacters" :character="character" :key="character.id" />
				</div>
			</div>
			<div v-else>
				<p>There are no characters in this party.</p>
			</div>
			<div v-if="party.opponents.length > 0">
				<h3>Opponents</h3>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CharacterDisplay from './CharacterDisplay';
import Party from '../models/Party';
import { partyStateToText } from '../utilities/Enums'
@Component({
	components: {
		CharacterDisplay
	}
})

export default class PartyDisplay extends Vue {
	@Prop() private party!: Party;
	partyHeading: string;
	stateText = '';

	created() {
		this.partyHeading = `Party ${this.party.id}`;
		this.stateText = partyStateToText(this.party.state);
	}
}
</script>

<style scoped>
	.partyBlock {
		/*display:inline-block;
		vertical-align:top;
		width:45%;*/
	}
</style>
