#!/bin/sh
git pull origin master
CWD=`pwd`
mv $CWD/public_html/tramatic/index.php $CWD/laravel_tmp/index.php.saved
rm -rf $CWD/public_html/tramatic/*
# update project/ to your directory name
cp -a $CWD/tramatic/public/* $CWD/public_html/tramatic/
cp $CWD/tramatic/public/.* $CWD/public_html/tramatic/
rm -rf $CWD/public_html/tramatic/index.php
mv $CWD/laravel_tmp/index.php.saved $CWD/public_html/tramatic/index.php