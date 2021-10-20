#!/bin/sh

pwd

echo hello world
cp ./.env.kk ./.env.production
echo copy done

echo start cat
cat ./.env.production
echo end cat

echo start
yarn run start