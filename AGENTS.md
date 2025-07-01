# AI Agent Working Principles

## 🚨 MANDATORY RULES - Follow these for EVERY task

### 1. **Single Task Focus**
- Work ONLY on the currently assigned task
- Do NOT fix issues outside the current task scope
- If you notice other problems, document them but do NOT fix them

### 2. **Task Completion Protocol**
- When a task is complete:
  - Update status: `task-master set-status --id=<id> --status=done`
  - **STOP and ASK** before proceeding to any other task
  - Never automatically continue to the next task

### 3. **Branch Management**
- Create a new branch for EACH task: `git checkout -b task/<task-id>-<description>`
- Never work directly on main/master branch
- One branch per task, no exceptions

### 4. **Granular Commits**
- Commit after each logical unit of work
- Use conventional commit format: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `test`, `refactor`, `style`, `chore`
  - Example: `git commit -m "feat(auth): add JWT token validation"`

### 5. **GitHub Issue Synchronization**
- Create/update GitHub issue for each task
- Update issue labels to match task status
- Log detailed progress as issue comments
- Close issue when task is marked as done

---

## Task Management

### Use Task Master for:
- Finding next task: `task-master next`
- Viewing task details: `task-master show <id>`
- Updating task status: `task-master set-status --id=<id> --status=<status>`
- Logging progress: `task-master update-subtask --id=<id> --prompt="notes"`

Run `task-master help` for full command reference.

---

## Work Tracking

### Use Git for:
- Branch per task: `task/<id>-<description>`
- Frequent, descriptive commits
- Clear commit messages following conventional format

### Use GitHub Issues for:
- One issue per task
- Status labels: `task-pending`, `task-in-progress`, `task-done`
- Detailed progress comments
- Linking commits to issues

---

## Standard Workflow

1. **Get task** → `task-master next`
2. **Create branch** → `git checkout -b task/<id>-<description>`
3. **Create/update issue** → GitHub issue with task details
4. **Set status** → `task-master set-status --id=<id> --status=in-progress`
5. **Work & commit** → Small, frequent commits with clear messages
6. **Log progress** → Update subtask notes and issue comments
7. **Complete** → Set status to done, close issue
8. **STOP** → Ask user before proceeding

---

## Configuration

- **API Key**: Set `ANTHROPIC_API_KEY` or `PERPLEXITY_API_KEY` in `.env`
- **Models**: Configure with `task-master models --setup`

---

## Remember

- **FOCUS** on one task at a time
- **COMMIT** frequently with meaningful messages
- **DOCUMENT** progress in both Task Master and GitHub
- **ASK** before moving to the next task
- **NEVER** work outside the assigned task scope

---

_This guide enforces strict task boundaries and proper development practices._