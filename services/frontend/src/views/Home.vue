<template>
  <div>
    <section>
      <VueApexCharts
        width="100%"
        height="350"
        type="bar"
        :options="chartOptions"
        :series="series"></VueApexCharts>

      <h1>Listado de resultados</h1>

      <div v-if="medicalResults">
        <v-container>
          <v-row>
            <v-col
              v-for="result in medicalResults"
              :key="result.id"
              cols="auto">
              <v-card class="elevation-12 w-auto h-auto">
                <v-card-title>
                  {{ result.patient_name }}
                </v-card-title>
                <v-card-subtitle>
                  {{ result.doctor.full_name }}
                </v-card-subtitle>
                <v-card-text>
                  <v-chip>
                    {{ result.gen_type }}
                  </v-chip>
                  {{ result.result_type }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div v-else>
        <p>Nothing to see. Check back later.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { computed, onBeforeMount, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useStore } from 'vuex';

const store = useStore();

const positiveResultsRef = ref(20);
const totalResultsRef = ref(50);
const positiveGenResultsRef = ref(20);
const totalGenResultsRef = ref(50);
const totalUserResultsRef = ref(20);

const medicalResults = computed(() => store.getters.stateResults);
const user = computed(() => store.getters.stateUser);

const calculatePercentage = (positiveResults, totalResults) => {
  return (positiveResults / totalResults) * 100;
};

const reduceInfo = (results) => {
  const initialValue = {
    positiveResults: 0,
    positiveGenResults: 0,
    totalResults: 0,
    totalGenResults: 0,
    totalUserResults: 0,
  };
  if (!results) return initialValue;

  const finalResults = results.reduce((acc, result) => {
    if (result.result_type === 'positive') {
      acc.positiveResults += 1;
    }
    if (result.gen_type === 'positive') {
      acc.positiveGenResults += 1;
    }
    acc.totalResults += 1;
    acc.totalGenResults += 1;
    if (result.doctor.id === user.value.id) {
      acc.totalUserResults += 1;
    }

    return acc;
  }, initialValue);
  return finalResults;
};

const series = ref([
  {
    name: 'Positive Results Percentage',
    data: [
      calculatePercentage(positiveResultsRef.value, totalResultsRef.value),
      positiveResultsRef.value,
      totalResultsRef.value,
    ],
  },
  {
    name: 'Gen Results Percentage',
    data: [
      calculatePercentage(
        positiveGenResultsRef.value,
        totalGenResultsRef.value
      ),
    ],
  },
  {
    name: 'User Results Percentage',
    data: [
      calculatePercentage(totalUserResultsRef.value, totalResultsRef.value),
      totalResultsRef.value,
    ],
  },
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val) => val + '%',
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#304758'],
    },
  },
  xaxis: {
    categories: ['Positive Results', 'General Results', 'User Results'],
    position: 'top',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    labels: {
      style: {
        offsetY: 5,
      },
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    title: {
      text: 'Percentage',
      offsetX: -15,
    },
    labels: {
      show: false,
      formatter: (val) => val + '%',
    },
  },
  title: {
    text: 'Percentage of Positive Results',
    floating: true,
    offsetY: 20,
    align: 'center',
    style: {
      color: '#444',
    },
  },
});

onBeforeMount(async () => {
  await store.dispatch('getResults');
});

onMounted(() => {
  const {
    positiveResults,
    positiveGenResults,
    totalResults,
    totalGenResults,
    totalUserResults,
  } = reduceInfo(medicalResults.value);

  positiveResultsRef.value = positiveResults;
  positiveGenResultsRef.value = positiveGenResults;
  totalResultsRef.value = totalResults;
  totalGenResultsRef.value = totalGenResults;
  totalUserResultsRef.value = totalUserResults;
  console.log('Series:', series.value);
  console.log('Chart Options:', chartOptions.value);
});
</script>
