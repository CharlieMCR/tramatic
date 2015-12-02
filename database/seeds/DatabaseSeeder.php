<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\ApiCalls\ApiCalls;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		// $this->call('UserTableSeeder');
		$this->call('VenueTableSeeder');
        $this->command->info('Venue seeds finished.');

        Model::reguard();
	}

}


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
