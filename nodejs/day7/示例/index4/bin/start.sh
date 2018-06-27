#!/bin/sh
if [ ! -f "pid" ]
then
    node ../lib/main.js ../conf/config.json &
    echo $! > pid
fi