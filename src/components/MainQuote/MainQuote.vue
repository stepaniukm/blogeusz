<template>
	<div class="w-full bg-leaves h-48 bg-center bg-half rounded-3xl flex">
		<div class="p-8 w-3/4">
			<TickIcon />
			<p class="font-worksans italic text-white my-2 text-xl">
				Ludzie sądzą, że informatyka to sztuka dla geniuszy, ale w rzeczywistości jest zupełnie
				odwrotnie. To praca wielu zwykłych ludzi, którzy razem tworzą coś większego, jak mur
				zbudowany z wielu małych kamieni.
			</p>
		</div>
		<div class="w-1/4 bg-olive rounded-3xl clipper flex items-center justify-center">
			<p class="font-worksans italic text-white flex flex-col ml-10">
				<span>Donald Knuth,</span>
				<span>amerykański matematyk</span>
				<span>pionier informatyki</span>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import TickIcon from './TickIcon.vue';
</script>

<style>
.clipper {
	clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
}
</style>
