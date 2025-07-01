# Frontend Development Guidelines

> **Note**: This document extends the core principles in `AGENT.md`. All rules from `AGENT.md` apply here as well.

## 🎯 Frontend-Specific Rules

### 1. **Export Convention**
```typescript
// ✅ CORRECT - Named exports only
export function UserProfile() { ... }
export const UserAvatar = () => { ... }

// ❌ WRONG - No default exports
export default function UserProfile() { ... }
```
- Use named exports for ALL components
- Default exports are FORBIDDEN unless absolutely necessary (document the reason)

### 2. **Component Definition Pattern**
```typescript
// ✅ CORRECT - Main component as function declaration
export function UserDashboard() {
  return <div>...</div>
}

// Helper components as const
const DashboardHeader = () => {
  return <header>...</header>
}

const DashboardStats = () => {
  return <section>...</section>
}
```
- Main component: `export function ComponentName()`
- Sub-components: `const ComponentName = () => {}`
- This clearly distinguishes the primary component from helpers

### 3. **TypeScript Patterns**
```typescript
// ✅ CORRECT - Explicit props interface, no React.FC
interface UserCardProps {
  user: User
  onEdit: (id: string) => void
}

export function UserCard({ user, onEdit }: UserCardProps) {
  return <div>...</div>
}

// ❌ WRONG - Never use React.FC
const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return <div>...</div>
}
```
- NEVER use `React.FC` or `React.FunctionComponent`
- Always define explicit props interfaces
- Let TypeScript infer return types

### 4. **State Management Rules**
```typescript
// ✅ CORRECT - Local state for local concerns
export function TodoItem() {
  const [isEditing, setIsEditing] = useState(false)
  
  return <div>...</div>
}

// ❌ WRONG - Unnecessary global state
// Don't use Redux/Zustand/Context for component-specific state
```
- Use local state (useState, useReducer) by default
- Global state ONLY for truly global data (user auth, theme, etc.)
- If you think you need global state, STOP and ask first

### 5. **Component Size & Structure**
```typescript
// Component approaching limit
export function UserProfile() {
  // If this reaches 300 lines, STOP and refactor
  // Break into smaller components
}
```
- **Hard limit**: 300 lines per component file
- **Soft limit**: 150-200 lines is ideal
- When approaching limits:
  1. STOP current work
  2. Plan refactoring
  3. Get user approval before proceeding

### 6. **Component Depth Rule**
```typescript
// Main component (depth 0)
export function ProductPage() {
  return (
    <div>
      <ProductHeader />  {/* depth 1 */}
      <ProductDetails /> {/* depth 1 */}
    </div>
  )
}

// Sub-component (depth 1)
const ProductHeader = () => {
  return (
    <header>
      <ProductTitle />    {/* depth 2 */}
      <ProductActions />  {/* depth 2 */}
    </header>
  )
}

// Sub-sub-component (depth 2)
const ProductTitle = () => {
  return (
    <div>
      <h1>...</h1>
      <PriceTag />  {/* depth 3 - MAXIMUM! */}
    </div>
  )
}

// ⚠️ STOP HERE - depth 3 is the maximum
const PriceTag = () => {
  // If you need to add child components here, STOP and refactor
}
```
- Maximum nesting: 3 levels from main component
- If you reach depth 3 and need more nesting:
  1. **STOP immediately**
  2. Document the issue
  3. Ask user for refactoring approval

---

## Working Checklist

Before starting any frontend task:
- [ ] Read and understand the task from Task Master
- [ ] Check component structure won't exceed depth limits
- [ ] Plan component breakdown if > 150 lines expected

During development:
- [ ] Using named exports only?
- [ ] Main component uses `export function`?
- [ ] Sub-components use `const`?
- [ ] No `React.FC` usage?
- [ ] State is local unless proven otherwise?
- [ ] Component under 300 lines?
- [ ] Maximum 3 levels deep?

Before completing task:
- [ ] All components follow naming conventions?
- [ ] No unnecessary global state introduced?
- [ ] Component hierarchy is clean and shallow?
- [ ] Code is ready for review?

---

## Red Flags - STOP and ask if you see:

1. Component file approaching 250+ lines
2. Nesting depth reaching level 3
3. Considering global state for component-specific data
4. Tempted to use default exports
5. About to use `React.FC`
6. Complex component hierarchy forming

---

## Example Structure

```
src/
├── components/
│   ├── user/
│   │   ├── UserProfile.tsx      (export function UserProfile)
│   │   ├── UserAvatar.tsx       (export function UserAvatar)
│   │   └── UserStats.tsx        (export function UserStats)
│   └── dashboard/
│       ├── Dashboard.tsx         (export function Dashboard)
│       └── DashboardWidgets.tsx  (multiple named exports)
```

---

_Remember: When in doubt, keep it simple. Small, focused components are always better than large, complex ones._