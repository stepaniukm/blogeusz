<template>
	<div class="my-8">
		<label>
			Dev
			<input
				v-model="choice"
				type="radio"
				name="subject"
				value="dev"
				class="cursor-pointer appearance-none bg-white border-2 w-36 h-11 checked:bg-black rounded-tl-lg rounded-bl-lg after:content-['dev'] after:text-black after:checked:text-white after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 relative border-none transition-colors duration-200 ease-in-out" />
		</label>

		<label>
			Fotografia
			<input
				v-model="choice"
				type="radio"
				name="subject"
				value="fotografia"
				class="cursor-pointer appearance-none bg-white border-2 w-36 h-11 checked:bg-black rounded-tr-lg rounded-br-lg after:content-['fotografia'] after:text-black after:checked:text-white after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 relative border-none" />
		</label>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const choice = ref<'dev' | 'fotografia'>('dev');
</script>
