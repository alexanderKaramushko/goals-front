#!/bin/sh

set -eu

tag=${1:?"Usage: $0 <tag>"}
project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

docker build --platform linux/amd64 \
  --build-arg VITE_VERSION="$tag" \
  -t "melkor73/goals-front:$tag" \
  -t melkor73/goals-front:latest \
  "$project_dir"

docker push "melkor73/goals-front:$tag"
docker push melkor73/goals-front:latest
