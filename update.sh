#!/bin/bash

set -o pipefail
set -eu

mkdir -p data

# Note that OS X uses a BSD date which uses "-v +1d" to indicate "tomorrow"
for d in $(date -d tomorrow +%Y-%m-%d) $(date +%Y-%m-%d) $(date -d yesterday +%Y-%m-%d); do
	echo $d
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
