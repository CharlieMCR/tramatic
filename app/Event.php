<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Venue;

class Event extends Model
{
    //
    protected $table = 'event';
    protected $fillable = ['name', 'status', 'event_name', 'start_time', 'end_time', 'duration' , 'venue_id'];

    public function venues() {
    	return $this->belongsTo('App\Venue', 'venue_id');
    }
}
