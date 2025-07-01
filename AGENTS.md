# AI Agent Working Principles & Task Master Integration Guide

## 🚨 CRITICAL: Core Working Principles

### These principles MUST be followed for EVERY task, without exception:

1. **Single Task Focus**
   - Work ONLY on the currently assigned task
   - Do NOT start working on other tasks without explicit permission
   - If you notice issues outside the current task scope, document them but DO NOT fix them

2. **Task Completion Protocol**
   - When a task is complete:
     - Change status to `done` using `task-master set-status --id=<id> --status=done`
     - STOP and ASK the user before proceeding to the next task
     - Never automatically continue to the next task

3. **Branch Management**
   - ALWAYS create a new feature branch for each task:
     ```bash
     git checkout -b task/<task-id>-<brief-description>
     # Example: git checkout -b task/1.2-user-authentication
     ```
   - Never work directly on main/master branch
   - One branch per task, no exceptions

4. **Granular Commits**
   - Commit after each small, logical unit of work
   - Use descriptive commit messages:
     ```bash
     git commit -m "feat(auth): add JWT token generation logic"
     git commit -m "test(auth): add unit tests for password hashing"
     git commit -m "docs(auth): update API documentation for login endpoint"
     ```
   - Follow conventional commit format: `type(scope): description`

5. **GitHub Issue Synchronization**
   - Create/update GitHub issue for each task:
     ```bash
     gh issue create --title "Task <id>: <title>" --label "task-<status>"
     gh issue edit <number> --add-label "in-progress" --remove-label "pending"
     ```
   - Log all progress as issue comments
   - Update issue status labels to match task status
   - Close issue when task is marked as done

---

## Task Master Quick Reference

### Daily Workflow Commands

```bash
# Start work on a task
task-master next                                   # Find next task
task-master show <id>                             # Review task details
git checkout -b task/<id>-<description>           # Create task branch
task-master set-status --id=<id> --status=in-progress

# During development
task-master update-subtask --id=<id> --prompt="progress notes"
git add . && git commit -m "type(scope): description"
gh issue comment <number> --body "Progress update..."

# Complete a task
task-master set-status --id=<id> --status=done
gh issue edit <number> --add-label "done" --remove-label "in-progress"
gh issue close <number>
# STOP HERE - Ask user before proceeding to next task
```

### Essential Commands Only

```bash
# Task viewing
task-master list                                   # Show all tasks
task-master show <id>                             # View task details
task-master next                                   # Get next available task

# Task status
task-master set-status --id=<id> --status=<status>

# Task updates (with AI)
task-master update-subtask --id=<id> --prompt="notes"

# Dependencies
task-master add-dependency --id=<id> --depends-on=<id>
```

## Project Structure (Minimal)

```
project/
├── .taskmaster/
│   ├── tasks/
│   │   └── tasks.json      # Task database (do not edit manually)
│   └── config.json         # AI configuration
├── CLAUDE.md              # This file
└── .env                   # API keys
```

## MCP Tools (Essential Only)

```javascript
// Daily workflow
get_tasks;          // List all tasks
next_task;          // Get next task
get_task;           // Show task details
set_task_status;    // Update task status

// Updates
update_subtask;     // Log implementation notes
```

## Workflow Example

```bash
# 1. Start session
task-master next
# Output: Task 1.2 - Implement user authentication

# 2. Create branch
git checkout -b task/1.2-user-authentication

# 3. Create/update GitHub issue
gh issue create --title "Task 1.2: Implement user authentication" --label "task-in-progress"

# 4. Update task status
task-master set-status --id=1.2 --status=in-progress

# 5. Work on implementation
# ... make changes ...
git add src/auth.js
git commit -m "feat(auth): implement JWT token generation"

# ... make more changes ...
git add tests/auth.test.js  
git commit -m "test(auth): add auth service unit tests"

# 6. Log progress
task-master update-subtask --id=1.2 --prompt="Implemented JWT generation and unit tests"
gh issue comment 42 --body "✅ Completed JWT implementation\n✅ Added comprehensive unit tests"

# 7. Complete task
task-master set-status --id=1.2 --status=done
gh issue edit 42 --add-label "done" --remove-label "in-progress"
gh issue close 42

# 8. STOP AND ASK
# "Task 1.2 is complete. Should I proceed to the next task?"
```

## Configuration

### Required API Keys (one minimum)
- `ANTHROPIC_API_KEY` - Recommended
- `PERPLEXITY_API_KEY` - For research features

### Model Setup
```bash
task-master models --setup
```

## Important Reminders

- **NEVER** work on multiple tasks simultaneously
- **NEVER** proceed to the next task without permission
- **ALWAYS** create a task-specific branch
- **ALWAYS** commit frequently with clear messages
- **ALWAYS** sync with GitHub issues
- **FOCUS** only on the assigned task scope

---

_This guide enforces strict task boundaries and proper development practices for AI agents._