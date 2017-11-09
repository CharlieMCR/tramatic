<template>
  <div>
    {{ message }}
    <section>
      <h3>Upcoming events</h3>
      <ul>
        <li v-for="event in upcomingEvents">
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
    computed: {
      upcomingEvents: function () {
        if (this.events && this.events.length) {
          return this.events.filter(function (event) {
            return moment(event.date_time).diff(moment(), 'months') < 1
          })
        }
      }
    },
    methods: {
      fetchEvents () {
        axios.get('https://api.tramatic.co.uk/events').then(results => {
          this.storeEvents(results.data)
          this.updateDisplayedEvents()
        })
      },
      formatDate (date) {
        let eventDate = moment(date)
        return eventDate.utcOffset(eventDate.utcOffset()).format('LLLL')
      },
      storeEvents (events) {
        localStorage.setItem('events', JSON.stringify(events))
        localStorage.setItem('events-updated', moment().format())
      },
      getEventsFromStorage () {
        return localStorage.getItem('events')
      },
      updateDisplayedEvents () {
        this.events = JSON.parse(this.getEventsFromStorage(), (key, value) => {
          return value
        })
      },
      displayEvents () {
        let lastUpdateTime = localStorage.getItem('events-updated')
        let now = moment(lastUpdateTime)
        this.updateDisplayedEvents()
        if (lastUpdateTime && now.isValid()) {
          if (moment().diff(now, 'minutes') > 30) {
            this.fetchEvents()
            return
          }
          return
        }
        this.fetchEvents()
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.displayEvents()
      })
    }
  }
</script>

<style scoped>

</style>
