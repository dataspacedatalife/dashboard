#!/usr/bin/env bash

set -euo pipefail

git fetch origin
git reset --hard origin/devel
git clean -fd

docker build . -t dashboard:devel
docker stop dashboard-devel || true
docker rm dashboard-devel || true
docker run -d \
  --name dashboard-devel \
  -p 4001:3000 \
  --restart unless-stopped \
  dashboard:devel