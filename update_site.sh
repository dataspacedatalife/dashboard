#!/usr/bin/env bash

set -euo pipefail

git pull origin main --rebase

docker build . -t dashboard:latest
docker stop dashboard || true
docker rm dashboard || true
docker run -d --name dashboard -p 4000:3000 --restart unless-stopped dashboard:latest
