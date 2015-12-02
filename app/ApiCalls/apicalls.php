<?php namespace App\ApiCalls;

use App\Event;
use App\Venue;
use Ixudra\Curl\Facades\Curl as Curl;
use Carbon\Carbon;

class ApiCalls {

	public static function eventful_key() {
		return $_ENV['EVENTFUL'];
	}

	public static function foo() {
		// return self::eventful_key();
		return self::eventful();
	}

	public static function mcfc() {
		$response = Curl::get('http://api.football-data.org/alpha/teams/65/fixtures/?venue=home&timeFrame=n28');
        if (!empty($response)) {
            $fixtures = json_decode($response)->fixtures;
            foreach ($fixtures as $fixture) {
                $fixture->slug = 'etihad-stadium';
                $fixture->venue_name = 'Etihad Stadium';
                $fixture->event_name = $fixture->homeTeamName.' vs '.$fixture->awayTeamName;
                $fixture->start_time = Carbon::parse($fixture->date);
                $fixture->duration = 90;
                unset($fixture->_links);
                unset($fixture->result);
                unset($fixture->matchday);
                unset($fixture->status);
                // $venue = Venue::firstOrCreate($fixture);
                // $venue->events()->attach($fixture);
            }
            return $fixtures;
        }
	}

	public static function mufc() {
		$response = Curl::get('http://api.football-data.org/alpha/teams/66/fixtures/?venue=home&timeFrame=n28');
        if (!empty($response)) {
            $fixtures = json_decode($response)->fixtures;
            foreach ($fixtures as $fixture) {
                $fixture->slug = 'old-trafford';
                $fixture->venue_name = 'Old Trafford';
                $fixture->event_name = $fixture->homeTeamName.' vs '.$fixture->awayTeamName;
                $fixture->start_time = Carbon::parse($fixture->date);
                $fixture->duration = 90;
                unset($fixture->_links);
                unset($fixture->result);
                unset($fixture->matchday);
                unset($fixture->status);
                // $venue = Venue::firstOrCreate($fixture);
                // $venue->events()->attach($fixture);
            }
            return $fixtures;
        }
	}

    public static function seed($id,$slug,$name) {
        $response = Curl::get('http://api.football-data.org/alpha/teams/'.$id.'/fixtures/?venue=home&timeFrame=n28');
        if (!empty($response)) {
            $fixtures = json_decode($response)->fixtures;
            foreach ($fixtures as $fixture) {
            $end_time = Carbon::parse($fixture->date);
            $end_time->minute = 90;
                $venue = array(
                    'slug' => $slug,
                    'venue_name' => $name,
                    );
                $venue = Venue::firstOrCreate($venue);
                $event = array(
                    'event_name' => $fixture->homeTeamName.' vs '.$fixture->awayTeamName,
                    'start_time' => Carbon::parse($fixture->date),
                    'end_time' => $end_time,
                    'duration' => 90,
                    'venue_id' => $venue->id
                    );
                $event = Event::firstOrCreate($event);
            }
            return;
        }
    }

	public static function eventful() {
		$key = self::eventful_key();
		$response = Curl::get('http://api.eventful.com/json/events/search?app_key='.$key.'&location=53.4779,-2.2437&within=5&page_size=100&date=Future&sort_order=popularity&include=categories&category=music');
		if (!empty($response)) {
	    	$eventful = json_decode($response)->events->event;
	    	return $eventful;
		}
	}

	public static function foo_event() {
		// $date = date('c', mktime(date("H")+2, date("i"), 0, date("m")  , date("d"), date("Y")));
		$date = Carbon::now()->addHour(2);
        $foo = array(
                'event_name' => 'foo',
                'start_time' => $date,
                'venue_id' => 1,
            );
        // Events::create($foo);
	}


	public static function fixtures($fixtures) {
		$events = array();
        $plusWeek = Carbon::now()->addWeek();
        $plusMonth = Carbon::now()->addMonth();
		foreach ($fixtures as $fixture) {
            unset($fixture->_links);
            if ($fixture->date < $plusMonth && $fixture->date > Carbon::now()) {
                if (!Event::where('start_time', '=', $fixture->date)->where('event_name', '=', $fixture->homeTeamName.' vs '.$fixture->awayTeamName)->exists()) {
                    $event = array(
                        'event_name' => $fixture->homeTeamName.' vs '.$fixture->awayTeamName, 
                        'start_time' => $fixture->date, 
                        'venue_id' => $fixture->venue_id,
                        );
                    Event::create($event);
                }
            }
        }
	}
}


 ?>