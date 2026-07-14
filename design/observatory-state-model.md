# Observatory State Model — validation & spec

The simulation (`docs/js/observatory.js`) is the world's physics engine. This
document is its validation pass: for every semantic variable it records the
inputs, the rule, ranges, evidence thresholds, edge behaviour, decay, scope, and
which visual properties may consume it. **Renderers may interpret this state;
they may never recompute it.**

Core primitives (per micro-skill, from `attempts`):
- `rawMastery = correct / attempts`
- **`command = rawMastery × t/(t+3)`** — evidence-tempered. One correct answer ≈ 0.25, not 1.0.
- `isMastered/held = attempts ≥ 3 AND rawMastery ≥ 0.8`
- `retention` (per skill) = `clamp(intervalDays/21) × (reps≥2 ? 1 : 0.6)` from SRS.

## Per-variable audit

| Variable | Inputs | Rule | Range / clamp | Min evidence | Fresh user | Sparse / contradictory | One lucky/unlucky answer | Decay over time | Scope | Visuals that may consume it |
|---|---|---|---|---|---|---|---|---|---|---|
| **structuralIntegrity** | attempts | mean `command` over hall's skills | 0–1 | grows only with reps (t/(t+3)) | 0 | untouched skills contribute 0 | ≤ ~0.03 global shift | none directly (see retention) | hall + global | overall coherence — but must not scale every effect at once |
| **boundaryStability** | attempts on earliest section | mean `command` of foundational skills | 0–1 | same | 0 | falls back to structuralIntegrity | small | none | hall | how fully/steadily the vessel's outer profile is defined |
| **accumulationCompleteness** | attempts | held skills / total skills | 0–1 | needs `held` (t≥3, ≥0.8) | 0 | partial → partial | none (needs 3 correct) | none | hall | proportion of cross-section slices assembled |
| **retentionReliability** | SRS interval/reps + time away | mean skill retention × recency | 0–1 | needs SRS records | 0 | 0 if no SRS | small | **yes** — `recency = clamp(1−max(0,days−10)/40, 0.4, 1)` | hall | slice stability & continuity (low → subtle drift, never distracting) |
| **unresolvedCracks** | attempts + errorType | count skills with t≥2, wrong>0, rawMastery<0.6 | int ≥0 | needs ≥2 attempts | 0 | one wrong ≠ crack | cannot crack on one answer | resolves when accuracy recovers | hall | localized honest gaps / unstable bands — each = a real category |
| **bridgesFormed** | mastered skills + CONNECTIONS | matched constellation edges | int ≥0 | both endpoints held | 0 | sparse by design | none | none | hall (intra) / global | sparse structural channels linking sections |
| **wisdom** *(hidden)* | held-section spread, first-try, retention | `0.5·sectionCoherence + 0.3·firstTry + 0.2·retention` | 0–1 | needs held skills across sections | 0 | low unless breadth | small | via retention term only | hall + global | **only** more coherent relationships between sections — never a score/label, never "arbitrary beauty" |
| **warmth** | integrity, retention, cracks | `(0.3·SI + 0.7·retention) × crackFactor` | 0–1 | via inputs | 0 | cools with cracks (`crackFactor=clamp(1−0.18·cracks,0.35,1)`) | small | inherits retention decay | hall | restrained spectral shift, not generic brightness |
| **lighting** | integrity, introduced | `0.2 + 0.5·SI + 0.3·introduced` | 0.2–1 | floor 0.2 always | 0.2 | monotone | small | none | hall | architectural illumination & legibility |
| **dust** | days since last visit | `introduced ? clamp((days−3)/30,0,0.5) : 0` | 0–0.5 | needs a prior visit | 0 (unbuilt ≠ dusty) | n/a | none | **yes** — grows slowly with absence, hard cap 0.5 | hall | ambient particulate; absence feels quiet, never punitive |
| **silence** | activity today | `clamp(1 − (activeToday?0.25:0), 0.6, 1)` | 0.6–1 | n/a | 1 | n/a | none | returns to high when idle | hall | motion amplitude / ambient activity (higher = stiller) |
| **word** | structuralIntegrity, retention | Unbuilt / Unstable(<.5) / Settling(<.75) / **Sound (≥.75 AND retention≥.35)** | enum | Sound needs retention evidence | Unbuilt | never Sound without retention | cannot reach Sound on one answer | can demote via retention decay | hall | overall state label |

## Learner-profile results (no absurdities)

| Profile | Global integrity | Hall word | Notable | Absurdity avoided |
|---|---|---|---|---|
| fresh | 0% | Unbuilt | all zero | — |
| practiced once, all right | 25% | Unstable | warmth 0.10 | ✅ not "high integrity from one session" |
| many attempts, poor retention | 44% | Settling | reten 0.05 | ✅ not "Sound with weak retention" |
| retention + presentation errors | 20% | Unstable | 8 cracks, warmth 0.24 | ✅ not "full warmth despite cracks" |
| procedural-strong, low wisdom | 10% | Unstable | wisdom 0.15 | ✅ not "wisdom from repetition" |
| inactive 30 days | 56% | Settling | reten 0.95→0.48, warmth 0.51, dust 0.50 | ✅ decay modeled; dust bounded, not punitive |
| one hall mastered | 46% | Settling | others Unbuilt | ✅ localized, honest |
| inconsistent | 27% | Unstable | 8 cracks, warmth 0.06 | ✅ honest instability |

Determinism verified: identical inputs → byte-identical state.

## Renderer contract (Hall of Accumulation)

The renderer consumes **only** `Observatory.hallState(5)` + the persisted
previous-session snapshot. Each visible change must trace to exactly one variable
above. Mastery **restores** the room (scaffolding → continuous, smooth solid); it
does not build it. Changes **settle between sessions** — during study only tiny
transient responses are allowed; the new snapshot is computed and persisted at
session end, and the next visit transitions once from old settled → new settled.
