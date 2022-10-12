<script lang="ts" setup>
import { Chart, Grid, Line } from 'vue3-charts'


 const series =  [
      {
        "name": "changed series",
        "data": [
          4,
          3,
          2,
          1,
          0
        ]
      }
    ]

   


</script>
<template>
    <div>
       <highstock
 :options="chartOptions"
 
/>
        </div>
</template>
<script lang="ts">
export default {
  data () {
    return {
      symbol: 'AAPL',
      watchers: ['options.series'],
      series: []
    }
  },
  computed: {
    chartOptions () {
      return {
        chart: {
          type: 'candlestick'
        },
        rangeSelector: {
          selected: 4
        },
        title: {
          text: `${this.symbol} Stock Price`
        },
        series: this.series
      }
    }
  },
  mounted () {
    this.fetchData('AAPL')
  },
  methods: {
    async fetchData (symbol) {
      const { price } = await fetch('/ohlcv.json').then(r => r.json())
      this.series.push({
        id: symbol.toLowerCase(),
        name: symbol,
        data: price.map((entry) => {
          return [
            entry.epochTime.epochTime,
            entry.open.val,
            entry.high.val,
            entry.low.val,
            entry.close.val
          ]
        })
      }, { // Example with EMA
        type: 'ema',
        linkedTo: symbol.toLowerCase()
      })
    }
  }
}
</script>