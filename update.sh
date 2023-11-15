#!/bin/bash

set -o pipefail
set -eu

mkdir -p data
curl https://www.nytimes.com/svc/connections/v1/$(date +%Y-%M-%d).json >data/$(date +%Y-%M-%d).json
git config user.name "Automated"
git config user.email "actions@users.noreply.github.com"
git add data/*.json
timestamp=$(date -u)
git commit -m "Latest: ${timestamp}" || exit 0
git pull --rebase
git push
