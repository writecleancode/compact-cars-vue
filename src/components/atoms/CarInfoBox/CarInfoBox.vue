<script>
export default {
	props: {
		title: String,
		content: String,
	},
};
</script>

<template>
	<div>
		<p class="styled-title">{{ title }}</p>
		<p class="styled-info">{{ content }}</p>
	</div>
</template>

<style scoped>
.styled-title {
	margin-bottom: 0.2rem;
	font-size: 1.6rem;
	font-weight: bold;
}

.styled-info {
	font-size: 1.4rem;
}
</style>
