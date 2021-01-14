#! /usr/bin/bash

ROOT=`pwd`

cd $ROOT

yarn publish:prepare

cd $ROOT/build

yarn link