<script setup lang="ts">
import { useCarsContext } from '@/providers/useCars';

const { comparedCars } = useCarsContext();
</script>

<template>
	<div class="car-comparison-wrapper">
		<div v-if="comparedCars.length > 0" class="table-wrapper">
			<table class="styled-table">
				<tbody>
					<tr>
						<th></th>
						<td v-for="car in comparedCars" :data-brand="car.brand" :key="car.id"></td>
					</tr>
					<tr>
						<th>Brand</th>
						<td v-for="car in comparedCars">{{ car.brand || 'unknown' }}</td>
					</tr>
					<tr>
						<th>Model</th>
						<td v-for="car in comparedCars">{{ car.model || 'unknown' }}</td>
					</tr>
					<tr>
						<th>Generation</th>
						<td v-for="car in comparedCars">{{ car.generation.replace(/ .*/, ' ') || 'unknown' }}</td>
					</tr>
					<tr>
						<th>Production start</th>
						<td v-for="car in comparedCars">{{ car.productionStartYear }}</td>
					</tr>
					<tr>
						<th>Production end</th>
						<td v-for="car in comparedCars">{{ car.productionEndYear }}</td>
					</tr>
					<tr>
						<th>Facelift</th>
						<td v-for="car in comparedCars">{{ car.facelift || 'unknown' }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p v-else class="styled-paragraph">Add cars to compare...</p>
	</div>
</template>

<style lang="scss" scoped>
.car-comparison-wrapper {
	padding: 1.2rem;

	@media (width >= 440px) {
		margin-top: 1.6rem;
	}
}

.table-wrapper {
	overflow-x: auto;
}

.styled-table {
	margin: 0 auto;
	white-space: nowrap;

	tbody {
		tr:first-child {
			th {
				background-color: transparent;
			}
		}
	}

	th {
		background-color: rgba(0, 0, 0, 0.08);
	}

	td:nth-of-type(2n - 1) {
		background-color: rgba(0, 0, 0, 0.01);
	}

	td:nth-of-type(2n) {
		background-color: rgba(0, 0, 0, 0.03);
	}

	td,
	th {
		padding: 1.2rem 2rem;
		text-align: center;
	}

	td {
		&[data-brand] {
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			height: 48px;
			border-top: 10px solid transparent;
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			border-bottom: 0;
			background-image: url('/assets/img/unknown_brand.png');
		}

		&[data-brand='Alfa Romeo'] {
			background-image: url('/assets/img/emblems/emblem_alfa-romeo.png');
		}

		&[data-brand='Audi'] {
			background-image: url('/assets/img/emblems/emblem_audi.png');
		}

		&[data-brand='BMW'] {
			background-image: url('/assets/img/emblems/emblem_bmw.png');
		}

		&[data-brand='Citroen'] {
			background-image: url('/assets/img/emblems/emblem_citroen.png');
		}

		&[data-brand='Daewoo'] {
			background-image: url('/assets/img/emblems/emblem_daewoo.png');
		}

		&[data-brand='Fiat'] {
			background-image: url('/assets/img/emblems/emblem_fiat.png');
		}

		&[data-brand='Ford'] {
			background-image: url('/assets/img/emblems/emblem_ford.png');
		}

		&[data-brand='Honda'] {
			background-image: url('/assets/img/emblems/emblem_honda.png');
		}

		&[data-brand='Lancia'] {
			background-image: url('/assets/img/emblems/emblem_lancia.png');
		}

		&[data-brand='Mazda'] {
			background-image: url('/assets/img/emblems/emblem_mazda.png');
		}

		&[data-brand='Nissan'] {
			background-image: url('/assets/img/emblems/emblem_nissan.png');
		}

		&[data-brand='Opel'] {
			background-image: url('/assets/img/emblems/emblem_opel.png');
		}

		&[data-brand='Peugeot'] {
			background-image: url('/assets/img/emblems/emblem_peugeot.png');
		}

		&[data-brand='Renault'] {
			background-image: url('/assets/img/emblems/emblem_renault.png');
		}

		&[data-brand='Seat'] {
			background-image: url('/assets/img/emblems/emblem_seat.png');
		}

		&[data-brand='Toyota'] {
			background-image: url('/assets/img/emblems/emblem_toyota.png');
		}

		&[data-brand='Volkswagen'] {
			background-image: url('/assets/img/emblems/emblem_volkswagen.png');
		}
	}
}

.styled-paragraph {
	margin-top: 7.2rem;
	font-size: 1.8rem;
	text-align: center;
}

@media (-webkit-max-device-pixel-ratio: 1) {
	.styled-table {
		&[data-brand='Alfa Romeo'] {
			background-image: url('/assets/img/emblems/emblem_alfa-romeo_80p.png');
		}

		&[data-brand='Audi'] {
			background-image: url('/assets/img/emblems/emblem_audi_80p.png');
		}

		&[data-brand='BMW'] {
			background-image: url('/assets/img/emblems/emblem_bmw_80p.png');
		}

		&[data-brand='Citroen'] {
			background-image: url('/assets/img/emblems/emblem_citroen_80p.png');
		}

		&[data-brand='Daewoo'] {
			background-image: url('/assets/img/emblems/emblem_daewoo_80p.png');
		}

		&[data-brand='Fiat'] {
			background-image: url('/assets/img/emblems/emblem_fiat_80p.png');
		}

		&[data-brand='Ford'] {
			background-image: url('/assets/img/emblems/emblem_ford_80p.png');
		}

		&[data-brand='Honda'] {
			background-image: url('/assets/img/emblems/emblem_honda_80p.png');
		}

		&[data-brand='Lancia'] {
			background-image: url('/assets/img/emblems/emblem_lancia_80p.png');
		}

		&[data-brand='Mazda'] {
			background-image: url('/assets/img/emblems/emblem_mazda_80p.png');
		}

		&[data-brand='Nissan'] {
			background-image: url('/assets/img/emblems/emblem_nissan_80p.png');
		}

		&[data-brand='Opel'] {
			background-image: url('/assets/img/emblems/emblem_opel_80p.png');
		}

		&[data-brand='Peugeot'] {
			background-image: url('/assets/img/emblems/emblem_peugeot_80p.png');
		}

		&[data-brand='Renault'] {
			background-image: url('/assets/img/emblems/emblem_renault_80p.png');
		}

		&[data-brand='Seat'] {
			background-image: url('/assets/img/emblems/emblem_seat_80p.png');
		}

		&[data-brand='Toyota'] {
			background-image: url('/assets/img/emblems/emblem_toyota_80p.png');
		}

		&[data-brand='Volkswagen'] {
			background-image: url('/assets/img/emblems/emblem_volkswagen_80p.png');
		}
	}
}
</style>
