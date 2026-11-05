# NV Atlas: Nominal → Verbal

A bilingual corpus explorer for 500 English–Chinese sentence pairs. The project examines how English nominal key terms are rendered as Chinese verbs in subtitle data.

## Live site

https://vanessalvts.github.io/nvatlas-test/

## Pages

- `index.html` — search, category and verification filters, linked network, treemap, heat map, data table, and filtered CSV export
- `report.html` — learning report and AI use declaration
- `method.html` — method notes, data dictionary, codebook, and quality checks

## Data

- `NVAtlas-AI-Agent.csv` — original supplied data, preserved unchanged
- `data/corpus.json` — enriched browser data with required analysis fields
- `data/corpus.csv` — enriched CSV version

The supplied file does not yet document its external corpus URL, sampling seed, or candidate pool. All entries remain `human_checked = no` pending the required human verification against the original source.

## Run locally

```bash
python3 -m http.server 8765
```

Then open `http://localhost:8765/`.
