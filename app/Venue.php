<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Event;

class Venue extends Model
{
    //
    protected $table = 'venue';
    protected $fillable = ['venue_id','venue_name', 'slug', 'address','town','postcode','latitude','longitude'];

    public function events() {
    	return $this->hasMany('App\Event', 'venue_id', 'id');
    }
}
