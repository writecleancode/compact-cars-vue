<script>
export default {
	props: {
		content: {
			type: String,
			required: true,
		},
	},
};
</script>

<template>
	<p class="styled-title">{{ content }}</p>
</template>

<style scoped>
.styled-title {
	/* margin-bottom: ${({ $isFilterTitle }) => ($isFilterTitle ? '1.2rem' : '0.8rem')}; */
	color: #3e3e3e;
	font-size: 1.8rem;
	font-weight: bold;
	/* line-height: ${({ $isFilterTitle }) => ($isFilterTitle ? '1.5' : '1')}; */
}
</style>
