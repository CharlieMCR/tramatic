<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVenueTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('venue', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('slug');
            $table->string('venue_name');
            $table->string('address')->nullable();
            $table->string('town')->nullable();
            $table->string('postcode')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('venue', function(Blueprint $table)
		{
			Schema::drop('venue');
		});
	}

}
