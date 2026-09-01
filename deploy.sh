#!/bin/bash

set -e

cd /var/www/formatter

echo "Pulling latest changes..."
git pull origin master

echo "Installing dependencies..."
yarn install --frozen-lockfile

echo "export chromium config"
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

echo "Building..."
yarn build:production

echo "Deploy completed!"