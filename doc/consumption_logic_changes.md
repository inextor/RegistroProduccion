# Consumption Logic Changes

## Summary
Modified the consumption deduction logic in `generar-nomina-alterno` component to use **role-based calculations** instead of individual user assignments.

## Changes Made

### 1. Updated User Model
**File**: `src/app/Models/User.ts`
- Added `role_id` field to the User interface

### 2. Modified Consumption Processing Logic
**File**: `src/app/generar-nomina-alterno/generar-nomina-alterno.component.ts` (lines 263-310)

#### Previous Logic
- Consumption deductions were based on individual user assignments stored in `consumption.users[]`
- Only users explicitly assigned to a consumption with `price > 0` would receive deductions
- This caused issues when:
  - Users were changed in the production area
  - Users had `price = 0` assignments
  - Old consumptions were linked to previous team members

#### New Logic
**Role-based consumption distribution:**

1. **BUZO users (role_id = 3)**:
   - **NO consumption deductions** at all
   - They are exempt from all consumption costs

2. **Non-BUZO users (all other roles)**:
   - Receive **25% of the total consumption value** as a deduction
   - Calculation: `(consumption.price × consumption.qty) × 0.25`
   - Applied equally to all non-Buzo team members

### 3. Bug Fix
**Line 298**: Fixed logical operator bug
- **Before**: `if( ci?.item?.id != 56 || !ci.consumption.description...)`
- **After**: `if( ci?.item?.id != 56 && !ci.consumption.description...)`
- This fixes the account_id assignment logic for gasolina items

## Role IDs Reference
Based on database query results:
- `1` = Marinero
- `2` = Capitan
- `3` = **Buzo** (exempt from consumption deductions)
- `4` = LIDER
- `5` = LIDER 2

## Example Calculation

### Scenario
- Consumption: 50 liters of gasolina @ $23.89/liter
- Total consumption value: $1,194.50
- Team: 3 users (1 Buzo + 2 Non-Buzo)

### Results
- **User 67** (Buzo, role_id=3): **$0.00** deduction
- **User 68** (Capitan, role_id=2): **$298.625** deduction (25% of $1,194.50)
- **User 69** (Marinero, role_id=1): **$298.625** deduction (25% of $1,194.50)

## Benefits

1. **Consistency**: All consumptions are now applied regardless of when users joined the team
2. **Simplicity**: No need to manage individual user assignments in consumption records
3. **Fairness**: Clear role-based rules that are easy to understand
4. **Historical Data**: Old consumptions with previous team members are now properly included

## Testing
Build completed successfully with no TypeScript errors.
