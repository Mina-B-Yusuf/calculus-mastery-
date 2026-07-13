#!/usr/bin/env bash
# Copies data/taxonomy/*.json (the canonical source) into docs/data/taxonomy/
# (the deployed app's fetchable copy) and regenerates docs/data/taxonomy/index.json.
# Run this any time a taxonomy file is added or changed, before committing.
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p docs/data/taxonomy docs/data/past-papers
rm -f docs/data/taxonomy/*.json
cp data/taxonomy/*.json docs/data/taxonomy/
rm -f docs/data/taxonomy/schema.md
cp data/past-papers/past-papers.json docs/data/past-papers/past-papers.json

python3 - <<'PY'
import json, glob, os

chapters = []
for path in sorted(glob.glob('docs/data/taxonomy/*.json')):
    with open(path) as f:
        d = json.load(f)
    chapters.append({
        "file": os.path.basename(path),
        "chapter": d.get("chapter"),
        "chapter_title": d.get("chapter_title"),
        "course": d.get("course"),
    })

index = {
    "version": str(int(os.environ.get("SOURCE_DATE_EPOCH", 0)) or __import__("time").time()),
    "chapters": chapters,
}
with open('docs/data/taxonomy/index.json', 'w') as f:
    json.dump(index, f, indent=2)

print(f"Wrote index.json with {len(chapters)} chapters:")
for c in chapters:
    print(f"  Ch.{c['chapter']:>2} {c['chapter_title']}  ({c['course']})")
PY
