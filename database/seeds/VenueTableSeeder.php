<?php

use Illuminate\Database\Seeder;
use App\ApiCalls\ApiCalls;

class VenueTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // Uncomment the below to wipe the table clean before populating
        // DB::table('venue')->delete();
        ApiCalls::seed(65,'etihad-stadium','Etihad Stadium');
        ApiCalls::seed(66,'old-trafford','Old Trafford');
        // ApiCalls::mufc();
    }
}
