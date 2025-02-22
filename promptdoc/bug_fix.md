# Bug Fixing Guide

## Problem Analysis

Reflect on 5-7 different possible sources of the problem, prioritizing them based on likelihood, impact on functionality, and frequency in similar issues. Only consider sources that align with the error logs, recent code changes, and system constraints. Ignore external dependencies unless logs indicate otherwise.

Once you've narrowed it down to 1-2 most likely sources, cross-check them against previous error logs, relevant system state, and expected behaviors. If inconsistencies arise, refine your hypothesis.

When adding logs, ensure they are strategically placed to confirm or eliminate multiple causes. If the logs do not support your assumptions, suggest an alternative debugging strategy before proceeding.

Before implementing a fix, summarize the issue, validated assumptions, and expected log outputs that would confirm the problem is solved.