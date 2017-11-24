<template>
  <div>
    <h2 v-if="todaysEvents && todaysEvents.length">{{ message.today }}</h2>
    <h2 v-else>{{ message.notToday }}</h2>
    <section v-if="todaysEvents && todaysEvents.length">
      <h3>Today's events</h3>
      <ul>
        <li v-for="event in todaysEvents">
          <p>{{ event.event_name }}</p>
          <p>{{ formatDate(event.date_time) }} {{ fromNow(event.date_time) }}</p>
        </li>
      </ul>
    </section>
    <section>
      <h3>Upcoming events</h3>
      <ul>
        <li v-for="event in upcomingEvents">
          <p>{{ event.event_name }}</p>
          <p>{{ formatDate(event.date_time) }} {{ fromNow(event.date_time) }}</p>
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
        message: {
          today: 'You know the tram\'s going to be busy!',
          notToday: 'Business as usual.'
        },
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
      },
      todaysEvents: function () {
        if (this.events && this.events.length) {
          return this.events.filter(function (event) {
            return moment(event.date_time).isSame(moment(), 'day')
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
      fromNow (date) {
        return moment(date).fromNow()
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
