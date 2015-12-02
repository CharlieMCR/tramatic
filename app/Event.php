<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Venue;

class Event extends Model
{
    //
    protected $table = 'event';
    protected $fillable = ['name', 'status'];

    public function venues() {
    	return $this->belongsTo('App\Venue', 'venue_id');
    }
}
