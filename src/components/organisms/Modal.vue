<script setup lang="ts">
import { onClickOutside, type MaybeElement, type OnClickOutsideHandler } from '@vueuse/core';
import { useTemplateRef, type PropType } from 'vue';

const { closeModal } = defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
	closeModal: {
		type: Function as PropType<() => void>,
	},
});

const modal = useTemplateRef<MaybeElement>('my-modal');

onClickOutside(modal, closeModal as OnClickOutsideHandler);
</script>

<template>
	<Teleport to="body">
		<div v-if="isOpen" class="modal-overlay" :class="{ active: isOpen }">
			<div class="modal-wrapper" ref="my-modal">
				<slot />
				<button id="close-modal-btn" class="close-modal-btn" @click="closeModal">Close</button>
			</div>
		</div>
	</Teleport>
</template>

<style lang="scss" scoped>
.modal-overlay {
	display: none;
	position: fixed;
	inset: 0;
	z-index: 2;
	background-color: rgba(255, 255, 255, 0.75);

	&.active {
		display: block;
	}
}

.modal-wrapper {
	padding: 1.6rem;
	max-height: 100vh;
	background-color: #fff;
	box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
	overflow-y: auto;
}

.close-modal-btn {
	display: inline-block;
	padding: 0.4rem 0.8rem;
	width: 100%;
	font-size: 1.5rem;
	text-transform: uppercase;
	font-weight: bold;
}

@media (min-width: 640px) and (min-height: 560px) {
	.modal-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		width: 80vw;
		max-width: 560px;
		box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
	}
}

@media (min-width: 1200px) {
	.modal-overlay {
		&.active {
			display: none;
		}
	}
}
</style>
