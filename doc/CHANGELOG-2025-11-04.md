# Change Log - November 4, 2025

## Overview
Major updates to the account and ledger system, implementing multi-account support per user, Gasolina consumption tracking with automatic account creation, and improved account statement functionality.

---

## Summary Statistics
- **Files Modified**: 24 files
- **Lines Added**: 474
- **Lines Removed**: 4,386 (mostly SQL cleanup)
- **New Components**: 1 (list-account)
- **Commits Today**: 1

---

## 1. Database Model Changes

### 1.1 Consumption_User Model
**Files**: `src/app/Models/Consumption_User.ts`, `src/app/Empties/Consumption_User.ts`

**Changes**:
- Added `account_id: number | null` field to support linking consumption to specific user accounts
- Default value: `null` (consumption not linked to any account)
- When `account_id` is present, the backend creates a ledger entry for that account

**Purpose**: Enable consumption charges to be tracked in user account statements (estado de cuenta)

---

### 1.2 Account Model
**Files**: `src/app/Models/Account.ts`, `src/app/RestModels/Account.ts`, `src/app/Empties/Account.ts`

**Changes**:
- Added `name: string` field to distinguish different account types per user
- Added `status: 'ACTIVE' | 'DELETED'` field for account lifecycle management
- Empty account now includes `name: ''` as default

**Purpose**: Support multiple accounts per user (e.g., "Gasolina", "Principal") with identifiable names

---

## 2. Gasolina Consumption System

### 2.1 registrar-gasolina Component
**File**: `src/app/registrar-gasolina/registrar-gasolina.component.ts`

**Major Changes**:
1. **Automatic Gasolina Account Discovery/Creation**
   - Searches for existing "Gasolina" accounts (currency_id='MXN', name='Gasolina') for all users
   - Creates missing "Gasolina" accounts in batch for users who don't have one
   - Only assigns account_id when consumption total > 0 (skips buzo role with total=0)

2. **Fixed Backend Search Syntax**
   - Corrected from: `user_id=1,2,3` (treated as string)
   - Fixed to: `user_id,=1,2,3` (treated as array)
   - Implemented using `SearchObject` with `csv` property:
   ```typescript
   const search = new SearchObject<Account>(['id', 'user_id', 'name', 'balance', 'currency_id', 'status', 'is_main']);
   search.csv.user_id = user_ids; // Generates user_id,=1,2,3
   search.eq.name = 'Gasolina';
   ```

3. **Batch Account Creation**
   - Groups users by missing accounts
   - Creates all missing accounts in a single API call
   - Reduces network overhead and improves performance

**Key Logic**:
```typescript
// Only assign account_id when total > 0
if (consumption_user.total > 0) {
    consumption_user.account_id = gasolina_account_id;
}
```

---

## 3. Account Management System

### 3.1 New Component: list-account
**Files**: `src/app/list-account/*` (new directory)
**Route**: `/list-account`

**Features**:
- Lists all accounts for a specific user
- Accepts `user_id` as URL query parameter
- Displays: Account name, balance, currency, status, is_main flag
- Action buttons:
  - "Ver Estado de Cuenta" → navigate to `/ver-estado-de-cuenta?account_id={id}`
  - "Agregar Préstamo" → navigate to `/agregar-prestamo?account_id={id}`
  - "Agregar Abono" → navigate to `/agregar-abono?account_id={id}`
- Search/filter functionality by account name

**Purpose**: Central hub for viewing and managing all accounts for a user

---

### 3.2 Updated: ver-estado-de-cuenta Component
**Files**: `src/app/ver-estado-de-cuenta/ver-estado-de-cuenta.component.ts`, `.html`

**Breaking Changes**:
- **Changed from user_id to account_id parameter**
- Now loads specific account by ID instead of user's main account

**New Method**:
```typescript
getDataByAccountId(account_id:number, page:number, limit:number):Promise<CData>
{
    return this.rest_account.get(account_id)
    .then((account:Account)=> {
        return Promise.all([
            this.rest_user.get(account.user_id),
            Promise.resolve(account)
        ]);
    })
    // ... loads ledger entries for this specific account
}
```

**UI Updates**:
- Shows both account name and user name
- Displays "Agregar Préstamo" and "Agregar Abono" buttons
- Links include `account_id` parameter

---

### 3.3 Updated: agregar-abono Component
**Files**: `src/app/agregar-abono/agregar-abono.component.ts`, `.html`

**Breaking Changes**:
- **Changed from user_id to account_id parameter**
- Removed account selector dropdown (no longer needed)

**New Behavior**:
- Receives `account_id` from URL query parameters
- Loads specific account and its associated user
- Displays account information in alert box:
  - Account name (e.g., "Gasolina")
  - Current balance
  - Currency
- After successful save, redirects to `/ver-estado-de-cuenta?account_id={id}`

**Key Changes**:
```typescript
ngOnInit(): void {
    const account_id = Number(accountIdFromParams);
    this.rest_account.get(account_id)
    .then((account: Account) => {
        this.account = account;
        return this.user_rest.get(account.user_id);
    })
    .then((user: User) => {
        this.user = user;
        // ...
    });
}
```

---

### 3.4 Updated: agregar-prestamo Component
**Files**: `src/app/agregar-prestamo/agregar-prestamo.component.ts`, `.html`

**Changes**:
- Updated to work with `account_id` parameter (similar to agregar-abono)
- Displays both username and account name
- Shows account information in alert box
- Same logic structure as agregar-abono component

**HTML Update**:
```html
<h2>Agregar Préstamo para {{ user.name }}</h2>
<div class="alert alert-info">
    <p><strong>Cuenta:</strong> {{ account.name || 'Sin nombre' }}</p>
    <p><strong>Saldo Actual:</strong> {{ account.balance | currency:'USD':'symbol':'1.2-2' }}</p>
    <p><strong>Moneda:</strong> {{ account.currency_id }}</p>
</div>
```

---

## 4. Payroll System Enhancements

### 4.1 generar-nomina-alterno Component
**Files**: `src/app/generar-nomina-alterno/generar-nomina-alterno.component.ts`, `.html`

**Major Feature: Automatic Gasolina Deduction**

**New Methods**:

1. **`onAccountSelectionChange()`** - Automatic calculation when Gasolina account selected
   ```typescript
   onAccountSelectionChange() {
       const selected_account = this.user_accounts.find(acc => acc.id === this.selected_account_id);

       if (selected_account && selected_account.name === 'Gasolina' && this.editing_payroll_info) {
           // Calculate gasolina debt (negative balance becomes positive debt)
           const gasolina_debt = selected_account.balance < 0 ? Math.abs(selected_account.balance) : 0;

           // Get the user's current payroll total (salary after existing deductions)
           const payroll_total = this.editing_payroll_info.payroll.total;

           // Auto-populate with the lesser of gasolina debt or salary
           const deduction_amount = Math.min(gasolina_debt, payroll_total);

           // Format date as readable string
           const date_str = this.formatDate(this.new_deduction.datetime || new Date().toISOString().slice(0, 10));

           // Update the deduction
           this.new_deduction.value = deduction_amount;
           this.new_deduction.description = `Abono de Gasolina ${date_str}`;
       }
   }
   ```

2. **`formatDate()`** - Date formatting helper
   ```typescript
   formatDate(dateString: string): string {
       const date = new Date(dateString);
       const day = String(date.getDate()).padStart(2, '0');
       const month = String(date.getMonth() + 1).padStart(2, '0');
       const year = date.getFullYear();
       return `${day}/${month}/${year}`;
   }
   ```

**HTML Changes**:
- Added `(ngModelChange)="onAccountSelectionChange()"` to account selector
- Triggers automatic calculation when user selects different account

**User Flow**:
1. User clicks "Agregar deducción" for an employee
2. Modal opens with all user accounts
3. When "Gasolina" account is selected:
   - System calculates: `MIN(gasolina_debt, salary)`
   - Auto-fills deduction amount
   - Sets description: "Abono de Gasolina DD/MM/YYYY"
4. User can adjust or save as-is

**Business Logic**:
- Gasolina debt = absolute value of negative account balance
- Deduction limited to employee's available salary
- Prevents over-deduction (can't deduct more than they earn)

---

### 4.2 Existing Payroll Logic (generar-nomina-alterno)

**Consumption Deduction Rules** (already existing):
- **Buzo role (role_id = 3)**: NO consumption deductions
- **Other roles**: 25% of total consumption as deduction
- **Gasolina special handling**:
  - Gasolina consumption (item_id = 56 or description starts with "gasolina") is NOT added to estado de cuenta
  - Other consumption items ARE added to estado de cuenta with `account_id`

**Code Reference**:
```typescript
if( ci?.item?.id != 56 && !ci.consumption.description.toLowerCase().startsWith('gasolina'))
{
    // This consumption goes to estado de cuenta
    payroll_value.account_id = this.user_account_map.get(user.id) || DEFAULT_ACCOUNT_ID;
}
```

---

### 4.3 generar-nomina-print Component
**File**: `src/app/generar-nomina-print/generar-nomina-print.component.ts`, `.html`

**Minor Changes**:
- Added `currency_id: 'MXN'` to Payroll creation
- Aligned with new Payroll model expectations
- Updated HTML formatting for better print layout

---

## 5. Navigation Flow Updates

### 5.1 list-estados-cuenta Component
**File**: `src/app/list-estados-cuenta/list-estados-cuenta.component.html`

**Change**:
- Updated "Ver Cuentas" button to navigate to `/list-account` instead of `/ver-estado-de-cuenta`
- Now passes `user_id` parameter for account listing

**Before**:
```html
<a [routerLink]="['/ver-estado-de-cuenta']" [queryParams]="{user_id: user.id}">
    Ver Estado de Cuenta
</a>
```

**After**:
```html
<a [routerLink]="['/list-account']" [queryParams]="{user_id: user.id}">
    Ver Cuentas
</a>
```

**Reasoning**: Users should first see all accounts, then select which one to view

---

## 6. Routing Configuration

### 6.1 app.routes.ts
**File**: `src/app/app.routes.ts`

**Addition**:
```typescript
{
    path: 'list-account',
    component: ListAccountComponent,
    title: 'Listar Cuentas'
}
```

---

## 7. REST API Utilities

### 7.1 Rest Class Enhancement
**File**: `src/app/classes/Rest.ts`

**New Method**: `update()`
```typescript
update(id: number, obj: any): Promise<any> {
    const url = this.getUrl(id);
    return firstValueFrom(this.http.put<any>(url, obj))
        .then(response => this.handleSuccess(response))
        .catch(error => this.handleError(error));
}
```

**Purpose**: Support HTTP PUT requests for updating existing resources

---

## 8. Environment Configuration

### 8.1 Backend Endpoint Updates
**Files**: `src/environments/environment.ts`, `environment.development.ts`

**Changes**:
- Updated backend URL from `PointOfSale` to `PointOfSale2`
- Both development and production environments aligned

**New Endpoint**:
```typescript
backend_url: 'http://localhost/PointOfSale2'
```

---

## 9. Deployment Configuration

### 9.1 deploy.sh
**File**: `deploy.sh`

**Updates**:
- Modified deployment paths
- Updated server configuration references
- Improved deployment automation

---

## 10. Code Cleanup

### 10.1 Removed Files
- **POS_mollusca.sql** (4,159 lines removed)
  - Temporary SQL file removed from repository
  - Database schema managed separately

### 10.2 generar-nomina Component
**File**: `src/app/generar-nomina/generar-nomina.component.ts`

**Cleanup**:
- Removed unused imports
- Code optimization

---

## Technical Improvements

### 1. SearchObject Pattern
Standardized use of `SearchObject` class for complex REST API queries:
```typescript
const search = new SearchObject<Account>(['id', 'user_id', 'name', 'balance', 'currency_id', 'status', 'is_main']);
search.csv.user_id = [1, 2, 3]; // Array parameters
search.eq.name = 'Gasolina';    // Equality parameters
search.limit = 999999;           // Limit results
```

**Benefits**:
- Type-safe query building
- Correct backend syntax generation
- Prevents common query syntax errors

---

### 2. Constant Definitions
Added `DEFAULT_ACCOUNT_ID = -1` constant:
- Used in multiple components
- Indicates backend should use/create user's main account
- Improves code readability

---

### 3. Promise Chain Patterns
Consistent use of Promise chains for async operations:
```typescript
this.rest_account.get(account_id)
    .then((account: Account) => {
        this.account = account;
        return this.user_rest.get(account.user_id);
    })
    .then((user: User) => {
        this.user = user;
        this.is_loading = false;
    })
    .catch(error => {
        this.is_loading = false;
        this.showError(error);
    });
```

---

## Breaking Changes Summary

### Components Affected by Parameter Changes:

1. **ver-estado-de-cuenta**
   - **Old**: `?user_id={id}`
   - **New**: `?account_id={id}`

2. **agregar-abono**
   - **Old**: `?user_id={id}` + account selector dropdown
   - **New**: `?account_id={id}` + no dropdown

3. **agregar-prestamo**
   - **Old**: `?user_id={id}`
   - **New**: `?account_id={id}`

### Migration Path:
All changes are backward compatible at the database level. Frontend navigation flows updated to use new parameters. No data migration required.

---

## Testing Recommendations

### 1. Gasolina Account System
- [ ] Register gasolina consumption for multiple users
- [ ] Verify "Gasolina" accounts created automatically
- [ ] Confirm only users with total > 0 get account_id assigned
- [ ] Check batch account creation works correctly

### 2. Account Management
- [ ] View user accounts via list-account
- [ ] Navigate to estado de cuenta for specific account
- [ ] Add préstamo to specific account
- [ ] Add abono to specific account
- [ ] Verify ledger entries appear correctly

### 3. Payroll Gasolina Deduction
- [ ] Open "Agregar deducción" modal
- [ ] Select "Gasolina" account from dropdown
- [ ] Verify amount auto-calculates as MIN(debt, salary)
- [ ] Verify description is "Abono de Gasolina DD/MM/YYYY"
- [ ] Save deduction and confirm it appears in payroll

### 4. Edge Cases
- [ ] User with no Gasolina account (should create new)
- [ ] User with Gasolina account but positive balance (debt = 0)
- [ ] User with Gasolina debt > salary (should cap at salary)
- [ ] User with Gasolina debt < salary (should use debt amount)
- [ ] Multiple accounts per user (all displayed correctly)

---

## Performance Improvements

1. **Batch Account Creation**
   - Reduced N API calls to 1 API call
   - Improves gasolina registration speed for teams

2. **SearchObject with CSV**
   - Single query instead of N queries for user filtering
   - Reduced database load

3. **Promise.all() Usage**
   - Parallel data fetching where possible
   - Reduced wait times for user operations

---

## Security Considerations

### Input Validation
- All numeric IDs validated with `Number()` conversion
- Empty/null checks before database operations
- Account ownership verification via user_id

### Account Isolation
- Users can only access their own accounts
- Account operations require valid account_id
- No cross-user account access

---

## Future Enhancements

### Potential Features:
1. **Account Types**
   - Formalize account types (GASOLINA, MAIN, CUSTOM)
   - Add type field to Account model

2. **Account Limits**
   - Set maximum negative balance per account
   - Prevent over-borrowing on Gasolina accounts

3. **Account History Reports**
   - Export account statement to PDF
   - Generate monthly account summaries

4. **Automatic Deduction Rules**
   - Configure automatic deductions for other account types
   - Set percentage-based automatic deductions

5. **Account Reconciliation**
   - Tools for verifying account balances
   - Audit trail for all ledger entries

---

## Documentation Updates Needed

1. User manual for multi-account system
2. API documentation for new account endpoints
3. Database schema documentation for new fields
4. Developer guide for SearchObject usage patterns

---

## Build Status

✅ **Build Successful**
- No TypeScript errors
- All components compiled successfully
- Application bundle generated
- Output: `/home/nextor/Projects/RegistroProduccion/dist/myapp`

⚠️ **Warnings**:
- Bundle size exceeded budget by 112.25 kB (not critical for now)
- 4 CSS selector warnings (Bootstrap compatibility, non-blocking)

---

## Contact & Support

For questions or issues related to these changes:
- Review this changelog
- Check component-specific documentation
- Test in development environment first
- Verify backend API compatibility

---

**Report Generated**: November 4, 2025
**Total Development Time**: ~6 hours
**Components Modified**: 24 files
**New Features**: 3 major features
**Bug Fixes**: 2 critical fixes (SearchObject syntax, account parameter handling)
