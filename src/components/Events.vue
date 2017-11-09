<template>
  <div>
    {{ message }}
    <section>
      <h3>Upcoming events</h3>
      <ul>
        <li v-for="event in events">
          <p>{{ event.event_name }}</p>
          <p>{{ formatDate(event.date_time) }}</p>
        </li>
      </ul>
    </section>
  </div>

</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

  export default {
    name: 'Events',
    data () {
      return {
        message: 'You know the tram\'s going to be busy!',
        events: []
      }
    },
    methods: {
      fetchEvents () {
        axios.get('https://api.tramatic.co.uk/events').then(results => {
          this.events = results.data
        })
      },
      formatDate (date) {
        let moment2 = moment(date)
        return moment2.utcOffset(moment2.utcOffset()).format('LLLL')
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.fetchEvents()
      })
    }
  }
</script>

<style scoped>

</style>
