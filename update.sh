#!/bin/bash

set -o pipefail
set -eu

mkdir -p data

for d in $(date -v +1d +%Y-%m-%d) $(date +%Y-%m-%d) $(date -v -1d +%Y-%m-%d); do
	if [[ ! -e "data/${d}.json" ]]; then
		curl https://www.nytimes.com/svc/connections/v1/${d}.json >data/${d}.json
	fi
done
git config user.name "Automated"
git config user.email "actions@users.noreply.github.com"
git add data/*.json
timestamp=$(date -u)
git commit -m "Latest: ${timestamp}" || exit 0
git pull --rebase
git push
