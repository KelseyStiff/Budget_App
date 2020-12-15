<!-- no template -->

<script>

import { Pie, mixins } from 'vue-chartjs'
let { reactiveProp } = mixins

export default {
  extends: Pie,
  name: 'BudgetChart',
  mixins: [ reactiveProp ],
  data() {
    return {
      chartOptions: {
        scales: {
          xAxes: [
            {
              type: 'Pie'
            }
          ]
        }
      }
    }},
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>
