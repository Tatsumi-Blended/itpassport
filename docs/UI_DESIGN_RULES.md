# UI Design Rules

本プロジェクトのUIデザインルール・コンポーネント規約。
新規コンポーネント作成時や既存UIの修正時に参照すること。

**Brand Identity**: Inky Blue (Ink Navy) + Teal Blue (focus/interaction only)

---

## Color Philosophy（重要）

### 原則: 色に意味を持たせない

- **ラベル/テキストで意味を伝える**（色ではなく）
- **ニュートラルカラー（Slate系）を基本とする**
- **色による区別は極力避ける**

### 色の使用許可

| Color | Usage | Example |
|-------|-------|---------|
| **Ink Navy** | Primary UI（ボタン、ナビ、見出し） | `bg-ink-navy-800` |
| **Slate** | 全般（バッジ、背景、テキスト） | `bg-slate-100` |
| **Teal** | Focus ringのみ | `ring-teal-500` |
| **Red** | **重大なエラー・警告のみ** | システムエラー、削除確認 |
| **Yellow** | **注意喚起のみ** | 期限超過、未保存警告 |

### 色の使用禁止

| Color | Reason |
|-------|--------|
| **Green** | Success表示に使用しない → ラベル「完了」で代替 |
| **Blue** | Info表示に使用しない → ラベル「情報」で代替 |
| **Indigo** | 廃止 → Ink Navyに統一 |
| **Teal (badges)** | バッジには使用しない → Slateに統一 |

---

## 1. Core Identity & Signature

### 1.1 Primary Color (Solid)

グラデーションは使用禁止。ソリッドカラーで統一する。

#### Ink Navy Palette (Primary Brand)

| Token | Hex | Usage |
|-------|-----|-------|
| `ink-navy-950` | `#0B0E14` | サイドバー、最上位背景 |
| `ink-navy-900` | `#111827` | メイン見出し、強調テキスト |
| `ink-navy-800` | `#1A2233` | ナビ、アクティブ状態 |
| `ink-navy-700` | `#2A344A` | 選択中背景、構造の強調 |

#### Role-based Colors

| Role | Color | Hex | CSS Variable |
|------|-------|-----|--------------|
| Primary Action | Ink Navy 800 | `#1A2233` | `var(--ink-navy-800)` |
| Primary Hover | Ink Navy 700 | `#2A344A` | `var(--ink-navy-700)` |
| Primary Text | Ink Navy 900 | `#111827` | `var(--ink-navy-900)` |
| Interaction/Focus | Teal | `#0D9488` | `bg-teal-600` |
| Interaction Hover | Teal Dark | `#0F766E` | `hover:bg-teal-700` |

**禁止事項**:
- `linear-gradient()` の使用
- `bg-gradient-*` Tailwindクラスの使用
- 背景色のグラデーション全般
- Indigo系カラー（`indigo-*`）の使用

### 1.2 Elevation System (Shadows)

影はelevation levelで管理する。tinted shadowは浮遊要素のみに使用。

| Level | Context | Shadow | Class |
|-------|---------|--------|-------|
| 0 | Default (cards, containers) | None | — |
| 1 | Subtle lift (optional card hover) | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-sm` |
| 2 | Floating (popover, dropdown, tooltip) | Ink Navy tinted small | `.elevation-2` |
| 3 | Modal, dialog | Ink Navy tinted large | `.elevation-3` |

```css
/* Elevation 2: Floating elements */
.elevation-2 {
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.15),
              0 2px 4px -1px rgba(79, 70, 229, 0.1);
}

/* Elevation 3: Modal only */
.elevation-3 {
  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.2),
              0 4px 6px -2px rgba(79, 70, 229, 0.1);
}
```

**Rule**: Cards default to Level 0 (no shadow). Use border instead.

### 1.4 Asymmetric Anchor

左上角のみ大きく丸める非対称デザイン。視覚的アンカーとして機能。

```css
border-radius: 12px 4px 4px 4px;
```

**適用対象（限定）**:
- Modal container (always)
- Featured/KPI cards (dashboard main metrics)
- Critical warning panels
- Decision-target cards

**Max per screen**: 2 elements (excluding modals)

**適用禁止**:
- Standard cards
- Table rows
- Form containers
- List items

---

## 2. Design Tokens

### 2.1 Colors

#### Brand Colors (Ink Navy)

| Token | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| `ink-navy-950` | `#0B0E14` | `var(--ink-navy-950)` | Sidebar, top-level bg |
| `ink-navy-900` | `#111827` | `var(--ink-navy-900)` | Headings, emphasis text |
| `ink-navy-800` | `#1A2233` | `var(--ink-navy-800)` | Primary buttons, nav active |
| `ink-navy-700` | `#2A344A` | `var(--ink-navy-700)` | Hover states, selected bg |

#### Interaction Colors (Teal)

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `brand-teal` | `#0D9488` | `teal-600` | Focus rings, links |
| `brand-teal-dark` | `#0F766E` | `teal-700` | Active states |

#### Surface Colors

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `surface-page` | `#F8FAFC` | `bg-slate-50` | Page background |
| `surface-card` | `#FFFFFF` | `bg-white` | Card background |
| `surface-input` | `#F8FAFC` | `bg-slate-50` | Input default |
| `surface-input-focus` | `#FFFFFF` | `bg-white` | Input focused |

#### Text Colors

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `text-primary` | `#1E293B` | `text-slate-800` | Headings, body |
| `text-secondary` | `#64748B` | `text-slate-500` | Descriptions |
| `text-muted` | `#94A3B8` | `text-slate-400` | Placeholder, disabled |

#### Border Colors

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `border-default` | `#E2E8F0` | `border-slate-200` | Card, input borders |
| `border-subtle` | `#F1F5F9` | `border-slate-100` | Dividers |
| `border-focus` | `#0D9488` | `border-teal-500` | Focus state |

### 2.2 Semantic Colors（最小限の使用）

**原則**: 色による意味づけは極力避ける。ラベルテキストで意味を明示すること。

#### 警告色（限定使用）

赤・黄は**強力な警告・注意が必要な場合のみ**使用を許可。

| Type | Background | Text | Tailwind | Usage |
|------|------------|------|----------|-------|
| Error/Critical | `#FEE2E2` | `#B91C1C` | `bg-red-100 text-red-700` | システムエラー、削除確認、重大な問題 |
| Warning/Caution | `#FEF3C7` | `#A16207` | `bg-yellow-100 text-yellow-700` | 注意喚起、未保存の変更、期限超過 |

**使用禁止**: 単なるステータス表示、優先度表示、カテゴリ分類には赤・黄を使用しない。

#### 汎用ステータス・バッジ（推奨）

Status/Priority/Severityは全て**ニュートラルカラー**で統一。ラベルで意味を伝える。

| Type | Background | Text | Tailwind |
|------|------------|------|----------|
| Primary/Active | `#1A2233` | `#FFFFFF` | `bg-ink-navy-800 text-white` |
| Secondary | `#E2E8F0` | `#1E293B` | `bg-slate-200 text-slate-800` |
| Default/Neutral | `#F1F5F9` | `#475569` | `bg-slate-100 text-slate-600` |
| Muted/Inactive | `#F8FAFC` | `#94A3B8` | `bg-slate-50 text-slate-400` |

#### 廃止された色

以下の色は使用禁止:
- Green（Success表示）→ ラベル「完了」「成功」で代替
- Blue（Info表示）→ ラベル「情報」で代替
- Teal（Badge背景）→ Slateに統一

### 2.3 Typography

#### Font Stack

```css
font-family: 'Inter', 'Noto Sans JP', system-ui, sans-serif;
font-feature-settings: 'tnum' on, 'lnum' on;
```

#### Size Scale

| Token | Size | Tailwind | Usage |
|-------|------|----------|-------|
| `text-page-title` | 24px | `text-2xl` | Page headings |
| `text-section-title` | 20px | `text-xl` | Section headings |
| `text-card-title` | 18px | `text-lg` | Card headings |
| `text-body` | 14px | `text-sm` | Body text |
| `text-caption` | 12px | `text-xs` | Labels, helpers |

#### Weight Scale

| Token | Weight | Tailwind | Usage |
|-------|--------|----------|-------|
| `font-heading` | 700 | `font-bold` | Headings |
| `font-label` | 600 | `font-semibold` | Form labels |
| `font-button` | 500 | `font-medium` | Buttons |
| `font-body` | 400 | `font-normal` | Body text |

### 2.4 Spacing

4px grid system.

| Token | Value | Tailwind |
|-------|-------|----------|
| `space-1` | 4px | `p-1`, `gap-1` |
| `space-2` | 8px | `p-2`, `gap-2` |
| `space-3` | 12px | `p-3`, `gap-3` |
| `space-4` | 16px | `p-4`, `gap-4` |
| `space-6` | 24px | `p-6`, `gap-6` |
| `space-8` | 32px | `p-8`, `gap-8` |

### 2.5 Border Radius

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `radius-sm` | 4px | `rounded` | Small elements |
| `radius-md` | 6px | `rounded-md` | Buttons, badges, inputs |
| `radius-lg` | 8px | `rounded-lg` | Cards |
| `radius-xl` | 12px | `rounded-xl` | Avatars, featured elements |
| `radius-anchor` | 12px 4px 4px 4px | `.asymmetric-anchor` | Modal, KPI cards |

---

## 3. Component Rules

### 3.1 Buttons

#### Primary Button

主要アクションに使用。Ink Navy 800。

```tsx
<button className="bg-ink-navy-800 text-white px-6 py-2.5 rounded-md font-medium hover:bg-ink-navy-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
  Save
</button>
```

| State | Style |
|-------|-------|
| Default | `bg-ink-navy-800 text-white` (`#1A2233`) |
| Hover | `bg-ink-navy-700` (`#2A344A`) |
| Focus | `ring-2 ring-teal-500 ring-offset-2` |
| Disabled | `opacity-50 cursor-not-allowed` |

#### Primary Button with Motion (Create actions only)

新規作成アクションのみtranslate-yを許可。

```tsx
// Create/New actions only
<button className="bg-ink-navy-800 text-white px-6 py-2.5 rounded-md font-medium hover:bg-ink-navy-700 hover:-translate-y-0.5 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all">
  Create New
</button>
```

**Motion allowed for**: Create, New, Add
**Motion prohibited for**: Save, Update, Delete, Submit, Cancel

#### Secondary Button

```tsx
<button className="px-5 py-2.5 text-slate-700 bg-white border border-slate-200 rounded-md font-medium hover:bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors">
  Cancel
</button>
```

#### Destructive Button

```tsx
<button className="px-5 py-2.5 text-red-700 bg-white border border-red-200 rounded-md font-medium hover:bg-red-50 hover:border-red-300 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">
  Delete
</button>
```

#### Icon Button

```tsx
<button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors">
  <X className="w-5 h-5" />
</button>
```

### 3.2 Cards & Containers

#### Standard Card (Level 0)

```tsx
<div className="bg-white rounded-lg border border-slate-200 p-6">
  <h3 className="text-lg font-bold text-slate-800 mb-4">Card Title</h3>
  {/* content */}
</div>
```

**Rule**: No shadow by default. Border provides visual boundary.

#### Featured Card (Asymmetric Anchor)

KPIカード、重要な意思決定カードにのみ使用。1画面最大2つ。

```tsx
<div className="bg-white asymmetric-anchor border border-slate-200 p-6">
  <h3 className="text-lg font-bold text-ink-navy-900 mb-4">Key Metric</h3>
  <p className="text-3xl font-bold text-slate-800">1,234</p>
</div>
```

### 3.3 Data Tables

#### Table Structure

```tsx
<div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
  <table className="w-full">
    <thead>
      <tr className="bg-slate-50 border-b border-slate-200">
        <th className="w-12 px-4 py-3">
          <input type="checkbox" className="rounded border-slate-300" />
        </th>
        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Name
        </th>
        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Status
        </th>
        <th className="w-12 px-4 py-3">
          {/* Action column - always rightmost */}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
        <td className="px-4 py-4">
          <input type="checkbox" className="rounded border-slate-300" />
        </td>
        <td className="px-4 py-4 text-sm text-slate-800">Item Name</td>
        <td className="px-4 py-4">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-ink-navy-800 text-white rounded-md">Active</span>
        </td>
        <td className="px-4 py-4 text-right">
          <button className="p-1 text-slate-400 hover:text-slate-600">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Table Interaction Rules

| Interaction | Behavior | Visual Indicator |
|-------------|----------|------------------|
| Row click | Navigate to detail | `cursor-pointer`, hover bg |
| Checkbox | Bulk selection | Checkbox in first column |
| Selected row | Indicate selection | `bg-teal-50` + left border `border-l-2 border-teal-500` |
| Action menu | Row-specific actions | `...` icon, fixed right column |
| Sort active | Show sort direction | Arrow icon + bold header |
| Filter active | Show removable chips | Chip with × above table |

#### Selected Row Style

```tsx
<tr className="border-b border-slate-100 bg-teal-50 border-l-2 border-l-teal-500">
  {/* selected row content */}
</tr>
```

#### Filter Chips

```tsx
<div className="flex gap-2 mb-4">
  <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
    Status: Active
    <button className="ml-1 text-slate-400 hover:text-slate-600">
      <X className="w-3 h-3" />
    </button>
  </span>
</div>
```

### 3.4 Inputs & Forms

#### Text Input

デフォルトでボーダーを表示し、視認性を確保。

```tsx
<input
  type="text"
  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors"
  placeholder="Enter value"
/>
```

| State | Style |
|-------|-------|
| Default | `bg-slate-50`, `border-slate-200` |
| Hover | `border-slate-300` |
| Focus | `bg-white`, `border-teal-500`, `ring-2 ring-teal-500/20` |
| Error | `border-red-500`, `ring-2 ring-red-500/20` |

#### Select

```tsx
<select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 hover:border-slate-300 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors">
  <option value="">Select option</option>
</select>
```

#### Form Label

```tsx
<label className="block text-sm font-semibold text-slate-700 mb-1.5">
  Field Label <span className="text-red-500">*</span>
</label>
```

#### Helper & Error Text

```tsx
<p className="text-xs text-slate-500 mt-1.5">Helper text description</p>
<p className="text-xs text-red-600 mt-1.5">Error message</p>
```

### 3.5 Badges

**原則**: 色ではなくラベルテキストで意味を伝える。

#### Standard Badges（ニュートラル）

```tsx
// Primary / Active - 強調したい項目
<span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-ink-navy-800 text-white rounded-md">
  Active
</span>

// Secondary - やや強調
<span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-slate-200 text-slate-800 rounded-md">
  In Progress
</span>

// Default - 通常
<span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">
  Pending
</span>

// Muted - 非アクティブ、完了済み
<span className="inline-flex items-center px-2.5 py-1 text-xs bg-slate-50 text-slate-400 rounded-md">
  Completed
</span>
```

#### Warning Badges（限定使用）

**強力な警告・注意が必要な場合のみ使用。**

```tsx
// Error - システムエラー、重大な問題のみ
<span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-md">
  Error
</span>

// Warning - 注意喚起、期限超過のみ
<span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-md">
  Overdue
</span>
```

#### Priority / Level Badges

優先度・レベル表示には色を使わない。ラベルで区別。

```tsx
// すべて同じスタイル、ラベルで区別
<span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-slate-200 text-slate-800 rounded-md">
  High
</span>

<span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">
  Medium
</span>

<span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">
  Low
</span>
```

#### Unset/Empty State

```tsx
<span className="inline-flex items-center px-2.5 py-1 text-xs bg-slate-50 text-slate-400 rounded-md">
  Not set
</span>
```

### 3.6 Modals

Modals always use Asymmetric Anchor + Elevation 3.

```tsx
<div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-white asymmetric-anchor elevation-3 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    {/* Header */}
    <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Modal Title</h2>
        <p className="text-sm text-slate-500 mt-1">Description text</p>
      </div>
      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
        <X className="w-5 h-5" />
      </button>
    </div>

    {/* Content */}
    <div className="p-6">
      {/* content */}
    </div>

    {/* Footer */}
    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
      <button className="px-5 py-2.5 text-slate-700 bg-white border border-slate-200 rounded-md font-medium hover:bg-slate-50 transition-colors">
        Cancel
      </button>
      <button className="bg-ink-navy-800 text-white px-6 py-2.5 rounded-md font-medium hover:bg-ink-navy-700 transition-colors">
        Save
      </button>
    </div>
  </div>
</div>
```

### 3.7 Breadcrumbs (Required)

全ての詳細ページ・編集ページにパンくずナビゲーションを必須とする。

#### Basic Breadcrumb

```tsx
<nav aria-label="Breadcrumb" className="mb-6">
  <ol className="flex items-center gap-2 text-sm">
    <li>
      <a href="/" className="text-slate-500 hover:text-teal-600 transition-colors">
        Home
      </a>
    </li>
    <li className="text-slate-400">/</li>
    <li>
      <a href="/stakeholders" className="text-slate-500 hover:text-teal-600 transition-colors">
        Stakeholders
      </a>
    </li>
    <li className="text-slate-400">/</li>
    <li>
      <span className="text-slate-800 font-medium">John Smith</span>
    </li>
  </ol>
</nav>
```

#### Breadcrumb with Icon

```tsx
<nav aria-label="Breadcrumb" className="mb-6">
  <ol className="flex items-center gap-2 text-sm">
    <li>
      <a href="/" className="text-slate-500 hover:text-teal-600 transition-colors">
        <Home className="w-4 h-4" />
      </a>
    </li>
    <li>
      <ChevronRight className="w-4 h-4 text-slate-400" />
    </li>
    <li>
      <a href="/stakeholders" className="text-slate-500 hover:text-teal-600 transition-colors">
        Stakeholders
      </a>
    </li>
    <li>
      <ChevronRight className="w-4 h-4 text-slate-400" />
    </li>
    <li>
      <span className="text-slate-800 font-medium">John Smith</span>
    </li>
  </ol>
</nav>
```

#### Breadcrumb Rules

| Rule | Description |
|------|-------------|
| Placement | ページタイトルの上、ヘッダー直下に配置 |
| Required pages | 詳細ページ、編集ページ、作成ページ |
| Not required | ダッシュボード、一覧ページ（トップレベル） |
| Current page | 最後の項目はリンクなし、`font-medium` |
| Separator | `/` または `ChevronRight` アイコン |
| Max depth | 4階層まで（それ以上は省略記号`...`使用） |

#### Deep Breadcrumb (4+ levels)

```tsx
<nav aria-label="Breadcrumb" className="mb-6">
  <ol className="flex items-center gap-2 text-sm">
    <li>
      <a href="/" className="text-slate-500 hover:text-teal-600">Home</a>
    </li>
    <li className="text-slate-400">/</li>
    <li>
      <span className="text-slate-400">...</span>
    </li>
    <li className="text-slate-400">/</li>
    <li>
      <a href="/projects/123" className="text-slate-500 hover:text-teal-600">Project Alpha</a>
    </li>
    <li className="text-slate-400">/</li>
    <li>
      <span className="text-slate-800 font-medium">Task Details</span>
    </li>
  </ol>
</nav>
```

### 3.8 Alerts & Messages

**原則**: Error/Warningのみ色を使用。それ以外はニュートラル。

```tsx
// Error - システムエラー、重大な問題
<div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-md">
  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
  <div>
    <p className="text-sm font-medium text-red-800">Error title</p>
    <p className="text-sm text-red-700 mt-1">Error description</p>
  </div>
</div>

// Warning - 注意喚起、確認が必要
<div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
  <div>
    <p className="text-sm font-medium text-yellow-800">Warning title</p>
    <p className="text-sm text-yellow-700 mt-1">Warning description</p>
  </div>
</div>

// Info / Notice - ニュートラル（青・緑は使用しない）
<div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-md">
  <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
  <div>
    <p className="text-sm font-medium text-slate-800">Notice</p>
    <p className="text-sm text-slate-600 mt-1">Information message</p>
  </div>
</div>

// Success - ニュートラル（緑は使用しない）
<div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-md">
  <CheckCircle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
  <div>
    <p className="text-sm font-medium text-slate-800">Completed</p>
    <p className="text-sm text-slate-600 mt-1">Operation completed successfully</p>
  </div>
</div>
```

---

## 4. Layout Philosophy

### 4.1 Container Widths

| Context | Max Width | Tailwind |
|---------|-----------|----------|
| Detail page | 64rem (1024px) | `max-w-5xl` |
| List page | 80rem (1280px) | `max-w-7xl` |
| Narrow form | 32rem (512px) | `max-w-lg` |

### 4.2 Container Pattern

```tsx
<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {/* content */}
</div>
```

### 4.3 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Small desktop |
| xl | 1280px | Desktop |

### 4.4 Grid Patterns

```tsx
// 2-column (detail page)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// 3-column (form sections)
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// 4-column (dashboard KPIs)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

### 4.5 Spacing Patterns

| Context | Value | Example |
|---------|-------|---------|
| Section gap | 24-32px | `space-y-6`, `space-y-8` |
| Card padding | 16-24px | `p-4`, `p-6` |
| Form field gap | 24px | `gap-6` |
| Label to input | 6px | `mb-1.5` |
| Input to helper | 6px | `mt-1.5` |

---

## 5. Language & Copy Rules (EN/JP)

### 5.1 Text Casing (EN-only UI)

| Element | Casing | Example |
|---------|--------|---------|
| Page title | Title Case | "Stakeholder Management" |
| Section heading | Sentence case | "Basic information" |
| Table header | Sentence case | "Created at" |
| Button label | Sentence case | "Save changes" |
| Form label | Sentence case | "Email address" |
| Placeholder | Sentence case | "Enter your name" |

**Note**: `uppercase` on table headers is allowed for EN but use `tracking-wide` (not `tracking-widest`).

### 5.2 Table Headers (EN)

```tsx
// EN: Sentence case with uppercase transform
<th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">
  Created at
</th>
```

### 5.3 Table Headers (JP)

```tsx
// JP: No uppercase (uppercase has no effect on Japanese)
<th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">
  作成日時
</th>
```

### 5.4 Button Labels

| Action | EN | JP |
|--------|----|----|
| Create | "Create" / "Add" | "作成" / "追加" |
| Save | "Save" | "保存" |
| Update | "Update" | "更新" |
| Delete | "Delete" | "削除" |
| Cancel | "Cancel" | "キャンセル" |
| Edit | "Edit" | "編集" |
| Export | "Export" | "エクスポート" |
| Import | "Import" | "インポート" |

**Rule**: Verb-first, single word preferred. Avoid "Click to save" or "Please save".

### 5.5 Width Considerations (EN)

EN labels are typically longer than JP. Avoid fixed widths on buttons.

```tsx
// Good: min-width with padding
<button className="min-w-[80px] px-4 py-2.5">Save</button>

// Bad: fixed width
<button className="w-20 py-2.5">Save</button>
```

### 5.6 Bilingual Badge Labels

ラベルで意味を伝える。色に依存しない。

| Type | EN | JP | Style |
|------|----|----|-------|
| Active/Primary | "Active" | "有効" | `bg-ink-navy-800 text-white` |
| In Progress | "In Progress" | "進行中" | `bg-slate-200 text-slate-800` |
| Pending | "Pending" | "保留" | `bg-slate-100 text-slate-600` |
| Completed | "Completed" | "完了" | `bg-slate-50 text-slate-400` |
| High | "High" | "高" | `bg-slate-200 text-slate-800` |
| Medium | "Medium" | "中" | `bg-slate-100 text-slate-600` |
| Low | "Low" | "低" | `bg-slate-100 text-slate-600` |
| Unset | "Not set" | "未設定" | `bg-slate-50 text-slate-400` |
| Error (警告のみ) | "Error" | "エラー" | `bg-red-100 text-red-700` |
| Overdue (警告のみ) | "Overdue" | "期限超過" | `bg-yellow-100 text-yellow-700` |

---

## 6. Tailwind Configuration

Prefer Tailwind config tokens over raw CSS.

### 6.1 tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Ink Navy - Primary brand colors
      colors: {
        'ink-navy': {
          950: '#0B0E14', // Sidebar, top-level bg
          900: '#111827', // Headings, emphasis text
          800: '#1A2233', // Primary buttons, nav active
          700: '#2A344A', // Hover states, selected bg
        },
      },
      boxShadow: {
        'elevation-2': '0 4px 6px -1px rgba(26, 34, 51, 0.15), 0 2px 4px -1px rgba(26, 34, 51, 0.1)',
        'elevation-3': '0 10px 15px -3px rgba(26, 34, 51, 0.2), 0 4px 6px -2px rgba(26, 34, 51, 0.1)',
      },
      borderRadius: {
        'anchor': '12px 4px 4px 4px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

**Note**: グラデーション関連の設定は禁止のため削除。Indigo系は使用禁止。
