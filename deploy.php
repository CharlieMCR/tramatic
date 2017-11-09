<?php

namespace Deployer;

use Dotenv\Dotenv;

require __DIR__ . DIRECTORY_SEPARATOR . 'vendor/autoload.php';
require __DIR__ . DIRECTORY_SEPARATOR . 'vendor/deployer/deployer/recipe/common.php';

$dotenv = new Dotenv(__DIR__);
$dotenv->load();

// Project name
set('localhost_path', getenv('LOCALHOST_PATH'));
set('staging_path', getenv('STAGING_PATH'));
set('application_path', getenv('PRODUCTION_PATH'));

// Shared files/dirs between deploys
set('shared_files', []);
set('shared_dirs', []);

// Writable dirs by web server
set('writable_dirs', []);
set('allow_anonymous_stats', false);

// Hosts

host('tramatic-staging')
    ->stage('staging')
    ->set('http_user', getenv('HTTP_USER'))
    ->set('deploy_path', '{{staging_path}}');

host('tramatic')
    ->stage('production')
    ->set('http_user', getenv('HTTP_USER'))
    ->set('deploy_path', '{{application_path}}');

localhost()
    ->stage('local')
    ->roles('test', 'build')->set('deploy_path', '{{localhost_path}}');

// Tasks

task('upload', function () {
    upload(__DIR__ . '/dist/', '{{release_path}}');
});

task('release', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'upload',
    'deploy:shared',
    'deploy:writable',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
]);

desc('Deploy your project');
task('deploy', [
    'release',
    'cleanup',
    'success'
]);

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
