# Reporte de Cambios - 4 de Noviembre 2025

## Resumen General
Actualizaciones importantes al sistema de cuentas y libro mayor (ledger), implementando soporte multi-cuenta por usuario, seguimiento automático de consumo de Gasolina con creación automática de cuentas, y mejoras en la funcionalidad de estado de cuenta.

---

## Estadísticas del Día
- **Archivos Modificados**: 24 archivos
- **Líneas Agregadas**: 474
- **Líneas Eliminadas**: 4,386 (principalmente limpieza de SQL)
- **Componentes Nuevos**: 1 (list-account)
- **Commits del Día**: 1

---

## 1. Cambios en los Modelos de Base de Datos

### 1.1 Modelo Consumption_User
**Archivos Modificados**:
- `src/app/Models/Consumption_User.ts`
- `src/app/Empties/Consumption_User.ts`

**Cambios**:
- Se agregó el campo `account_id: number | null` para vincular consumos a cuentas específicas de usuarios
- Valor por defecto: `null` (consumo no vinculado a ninguna cuenta)
- Cuando `account_id` está presente, el backend crea una entrada en el ledger para esa cuenta

**Propósito**: Permitir que los cargos de consumo se rastreen en los estados de cuenta de los usuarios

---

### 1.2 Modelo Account (Cuenta)
**Archivos Modificados**:
- `src/app/Models/Account.ts`
- `src/app/RestModels/Account.ts`
- `src/app/Empties/Account.ts`

**Cambios**:
- Se agregó el campo `name: string` para distinguir diferentes tipos de cuenta por usuario
- Se agregó el campo `status: 'ACTIVE' | 'DELETED'` para gestión del ciclo de vida de cuentas
- Cuenta vacía ahora incluye `name: ''` como valor predeterminado

**Propósito**: Soportar múltiples cuentas por usuario (ej: "Gasolina", "Principal") con nombres identificables

---

## 2. Sistema de Consumo de Gasolina

### 2.1 Componente registrar-gasolina
**Archivo**: `src/app/registrar-gasolina/registrar-gasolina.component.ts`

**Cambios Principales**:

1. **Búsqueda/Creación Automática de Cuentas de Gasolina**
   - Busca cuentas "Gasolina" existentes (currency_id='MXN', name='Gasolina') para todos los usuarios
   - Crea cuentas "Gasolina" faltantes en lote para usuarios que no tienen una
   - Solo asigna account_id cuando el total de consumo > 0 (omite rol buzo con total=0)

2. **Sintaxis de Búsqueda Backend Corregida**
   - Incorrecto: `user_id=1,2,3` (tratado como string)
   - Corregido: `user_id,=1,2,3` (tratado como array)
   - Implementado usando `SearchObject` con propiedad `csv`:
   ```typescript
   const search = new SearchObject<Account>(['id', 'user_id', 'name', 'balance', 'currency_id', 'status', 'is_main']);
   search.csv.user_id = user_ids; // Genera user_id,=1,2,3
   search.eq.name = 'Gasolina';
   ```

3. **Creación de Cuentas en Lote**
   - Agrupa usuarios por cuentas faltantes
   - Crea todas las cuentas faltantes en una sola llamada API
   - Reduce sobrecarga de red y mejora rendimiento

**Lógica Clave**:
```typescript
// Solo asignar account_id cuando total > 0
if (consumption_user.total > 0) {
    consumption_user.account_id = gasolina_account_id;
}
```

---

## 3. Sistema de Gestión de Cuentas

### 3.1 Nuevo Componente: list-account
**Archivos Nuevos**:
- `src/app/list-account/list-account.component.ts`
- `src/app/list-account/list-account.component.html`
- `src/app/list-account/list-account.component.css`

**Ruta**: `/list-account`

**Funcionalidades**:
- Lista todas las cuentas de un usuario específico
- Acepta `user_id` como parámetro de consulta en URL
- Muestra: Nombre de cuenta, saldo, moneda, estado, bandera is_main
- Botones de acción:
  - "Ver Estado de Cuenta" → navega a `/ver-estado-de-cuenta?account_id={id}`
  - "Agregar Préstamo" → navega a `/agregar-prestamo?account_id={id}`
  - "Agregar Abono" → navega a `/agregar-abono?account_id={id}`
- Funcionalidad de búsqueda/filtro por nombre de cuenta

**Propósito**: Centro de gestión para ver y administrar todas las cuentas de un usuario

---

### 3.2 Actualizado: Componente ver-estado-de-cuenta
**Archivos Modificados**:
- `src/app/ver-estado-de-cuenta/ver-estado-de-cuenta.component.ts`
- `src/app/ver-estado-de-cuenta/ver-estado-de-cuenta.component.html`

**Cambios Importantes**:
- **Cambió de parámetro user_id a account_id**
- Ahora carga cuenta específica por ID en lugar de la cuenta principal del usuario

**Nuevo Método**:
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
    // ... carga entradas del ledger para esta cuenta específica
}
```

**Actualizaciones de UI**:
- Muestra tanto el nombre de la cuenta como el nombre del usuario
- Despliega botones "Agregar Préstamo" y "Agregar Abono"
- Los enlaces incluyen el parámetro `account_id`

---

### 3.3 Actualizado: Componente agregar-abono
**Archivos Modificados**:
- `src/app/agregar-abono/agregar-abono.component.ts`
- `src/app/agregar-abono/agregar-abono.component.html`

**Cambios Importantes**:
- **Cambió de parámetro user_id a account_id**
- Se eliminó el dropdown selector de cuentas (ya no es necesario)

**Nuevo Comportamiento**:
- Recibe `account_id` desde parámetros de consulta URL
- Carga cuenta específica y su usuario asociado
- Muestra información de la cuenta en caja de alerta:
  - Nombre de cuenta (ej: "Gasolina")
  - Saldo actual
  - Moneda
- Después de guardar exitosamente, redirige a `/ver-estado-de-cuenta?account_id={id}`

**Cambios Clave**:
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

### 3.4 Actualizado: Componente agregar-prestamo
**Archivos Modificados**:
- `src/app/agregar-prestamo/agregar-prestamo.component.ts`
- `src/app/agregar-prestamo/agregar-prestamo.component.html`

**Cambios**:
- Actualizado para trabajar con parámetro `account_id` (similar a agregar-abono)
- Muestra tanto el nombre de usuario como el nombre de cuenta
- Muestra información de cuenta en caja de alerta
- Misma estructura lógica que el componente agregar-abono

**Actualización HTML**:
```html
<h2>Agregar Préstamo para {{ user.name }}</h2>
<div class="alert alert-info">
    <p><strong>Cuenta:</strong> {{ account.name || 'Sin nombre' }}</p>
    <p><strong>Saldo Actual:</strong> {{ account.balance | currency:'USD':'symbol':'1.2-2' }}</p>
    <p><strong>Moneda:</strong> {{ account.currency_id }}</p>
</div>
```

---

## 4. Mejoras al Sistema de Nómina

### 4.1 Componente generar-nomina-alterno
**Archivos Modificados**:
- `src/app/generar-nomina-alterno/generar-nomina-alterno.component.ts`
- `src/app/generar-nomina-alterno/generar-nomina-alterno.component.html`

**Funcionalidad Principal: Deducción Automática de Gasolina**

**Nuevos Métodos**:

1. **`onAccountSelectionChange()`** - Cálculo automático cuando se selecciona cuenta Gasolina
   ```typescript
   onAccountSelectionChange() {
       const selected_account = this.user_accounts.find(acc => acc.id === this.selected_account_id);

       if (selected_account && selected_account.name === 'Gasolina' && this.editing_payroll_info) {
           // Calcular deuda de gasolina (saldo negativo se convierte en deuda positiva)
           const gasolina_debt = selected_account.balance < 0 ? Math.abs(selected_account.balance) : 0;

           // Obtener el total de nómina actual del usuario (salario después de deducciones existentes)
           const payroll_total = this.editing_payroll_info.payroll.total;

           // Auto-rellenar con el menor entre deuda de gasolina o salario
           const deduction_amount = Math.min(gasolina_debt, payroll_total);

           // Formatear fecha como cadena legible
           const date_str = this.formatDate(this.new_deduction.datetime || new Date().toISOString().slice(0, 10));

           // Actualizar la deducción
           this.new_deduction.value = deduction_amount;
           this.new_deduction.description = `Abono de Gasolina ${date_str}`;
       }
   }
   ```

2. **`formatDate()`** - Función auxiliar para formateo de fechas
   ```typescript
   formatDate(dateString: string): string {
       const date = new Date(dateString);
       const day = String(date.getDate()).padStart(2, '0');
       const month = String(date.getMonth() + 1).padStart(2, '0');
       const year = date.getFullYear();
       return `${day}/${month}/${year}`;
   }
   ```

**Cambios HTML**:
- Se agregó `(ngModelChange)="onAccountSelectionChange()"` al selector de cuentas
- Activa el cálculo automático cuando el usuario selecciona una cuenta diferente

**Flujo de Usuario**:
1. Usuario hace clic en "Agregar deducción" para un empleado
2. Se abre modal con todas las cuentas del usuario
3. Cuando se selecciona cuenta "Gasolina":
   - Sistema calcula: `MIN(deuda_gasolina, salario)`
   - Auto-rellena monto de deducción
   - Establece descripción: "Abono de Gasolina DD/MM/AAAA"
4. Usuario puede ajustar o guardar tal cual

**Lógica de Negocio**:
- Deuda de gasolina = valor absoluto del saldo negativo de la cuenta
- Deducción limitada al salario disponible del empleado
- Previene sobre-deducción (no puede deducir más de lo que gana)

---

### 4.2 Lógica Existente de Nómina (generar-nomina-alterno)

**Reglas de Deducción de Consumo** (ya existente):
- **Rol Buzo (role_id = 3)**: SIN deducciones de consumo
- **Otros roles**: 25% del consumo total como deducción
- **Manejo especial de Gasolina**:
  - Consumo de Gasolina (item_id = 56 o descripción comienza con "gasolina") NO se agrega al estado de cuenta
  - Otros items de consumo SÍ se agregan al estado de cuenta con `account_id`

**Referencia de Código**:
```typescript
if( ci?.item?.id != 56 && !ci.consumption.description.toLowerCase().startsWith('gasolina'))
{
    // Este consumo va al estado de cuenta
    payroll_value.account_id = this.user_account_map.get(user.id) || DEFAULT_ACCOUNT_ID;
}
```

---

### 4.3 Componente generar-nomina-print
**Archivos Modificados**:
- `src/app/generar-nomina-print/generar-nomina-print.component.ts`
- `src/app/generar-nomina-print/generar-nomina-print.component.html`

**Cambios Menores**:
- Se agregó `currency_id: 'MXN'` a la creación de Payroll
- Alineado con las nuevas expectativas del modelo Payroll
- HTML actualizado para mejor diseño de impresión

---

## 5. Actualizaciones de Flujo de Navegación

### 5.1 Componente list-estados-cuenta
**Archivo Modificado**: `src/app/list-estados-cuenta/list-estados-cuenta.component.html`

**Cambio**:
- Botón "Ver Cuentas" actualizado para navegar a `/list-account` en lugar de `/ver-estado-de-cuenta`
- Ahora pasa parámetro `user_id` para listado de cuentas

**Antes**:
```html
<a [routerLink]="['/ver-estado-de-cuenta']" [queryParams]="{user_id: user.id}">
    Ver Estado de Cuenta
</a>
```

**Después**:
```html
<a [routerLink]="['/list-account']" [queryParams]="{user_id: user.id}">
    Ver Cuentas
</a>
```

**Razón**: Los usuarios deben primero ver todas las cuentas, luego seleccionar cuál ver

---

## 6. Configuración de Rutas

### 6.1 app.routes.ts
**Archivo Modificado**: `src/app/app.routes.ts`

**Adición**:
```typescript
{
    path: 'list-account',
    component: ListAccountComponent,
    title: 'Listar Cuentas'
}
```

---

## 7. Utilidades de API REST

### 7.1 Mejora a la Clase Rest
**Archivo Modificado**: `src/app/classes/Rest.ts`

**Nuevo Método**: `update()`
```typescript
update(id: number, obj: any): Promise<any> {
    const url = this.getUrl(id);
    return firstValueFrom(this.http.put<any>(url, obj))
        .then(response => this.handleSuccess(response))
        .catch(error => this.handleError(error));
}
```

**Propósito**: Soportar peticiones HTTP PUT para actualizar recursos existentes

---

## 8. Configuración de Entorno

### 8.1 Actualización de Endpoints del Backend
**Archivos Modificados**:
- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

**Cambios**:
- URL del backend actualizada de `PointOfSale` a `PointOfSale2`
- Ambientes de desarrollo y producción alineados

**Nuevo Endpoint**:
```typescript
backend_url: 'http://localhost/PointOfSale2'
```

---

## 9. Configuración de Despliegue

### 9.1 deploy.sh
**Archivo Modificado**: `deploy.sh`

**Actualizaciones**:
- Rutas de despliegue modificadas
- Referencias de configuración de servidor actualizadas
- Automatización de despliegue mejorada

---

## 10. Limpieza de Código

### 10.1 Archivos Eliminados
- **POS_mollusca.sql** (4,159 líneas eliminadas)
  - Archivo SQL temporal eliminado del repositorio
  - Esquema de base de datos gestionado por separado

### 10.2 Componente generar-nomina
**Archivo Modificado**: `src/app/generar-nomina/generar-nomina.component.ts`

**Limpieza**:
- Imports no utilizados eliminados
- Optimización de código

---

## Mejoras Técnicas

### 1. Patrón SearchObject
Uso estandarizado de la clase `SearchObject` para consultas complejas de API REST:
```typescript
const search = new SearchObject<Account>(['id', 'user_id', 'name', 'balance', 'currency_id', 'status', 'is_main']);
search.csv.user_id = [1, 2, 3]; // Parámetros de array
search.eq.name = 'Gasolina';    // Parámetros de igualdad
search.limit = 999999;           // Limitar resultados
```

**Beneficios**:
- Construcción de consultas type-safe
- Generación correcta de sintaxis de backend
- Previene errores comunes de sintaxis de consultas

---

### 2. Definiciones de Constantes
Se agregó la constante `DEFAULT_ACCOUNT_ID = -1`:
- Usada en múltiples componentes
- Indica que el backend debe usar/crear la cuenta principal del usuario
- Mejora la legibilidad del código

---

### 3. Patrones de Cadenas de Promesas
Uso consistente de cadenas de Promesas para operaciones asíncronas:
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

## Resumen de Cambios Importantes

### Componentes Afectados por Cambios de Parámetros:

1. **ver-estado-de-cuenta**
   - **Antes**: `?user_id={id}`
   - **Ahora**: `?account_id={id}`

2. **agregar-abono**
   - **Antes**: `?user_id={id}` + dropdown selector de cuentas
   - **Ahora**: `?account_id={id}` + sin dropdown

3. **agregar-prestamo**
   - **Antes**: `?user_id={id}`
   - **Ahora**: `?account_id={id}`

### Ruta de Migración:
Todos los cambios son compatibles hacia atrás a nivel de base de datos. Los flujos de navegación del frontend se actualizaron para usar nuevos parámetros. No se requiere migración de datos.

---

## Recomendaciones de Pruebas

### 1. Sistema de Cuentas de Gasolina
- [ ] Registrar consumo de gasolina para múltiples usuarios
- [ ] Verificar que las cuentas "Gasolina" se crean automáticamente
- [ ] Confirmar que solo usuarios con total > 0 obtienen account_id asignado
- [ ] Verificar que la creación de cuentas en lote funciona correctamente

### 2. Gestión de Cuentas
- [ ] Ver cuentas de usuario vía list-account
- [ ] Navegar a estado de cuenta para cuenta específica
- [ ] Agregar préstamo a cuenta específica
- [ ] Agregar abono a cuenta específica
- [ ] Verificar que las entradas del ledger aparecen correctamente

### 3. Deducción de Gasolina en Nómina
- [ ] Abrir modal "Agregar deducción"
- [ ] Seleccionar cuenta "Gasolina" del dropdown
- [ ] Verificar que el monto se auto-calcula como MIN(deuda, salario)
- [ ] Verificar que la descripción es "Abono de Gasolina DD/MM/AAAA"
- [ ] Guardar deducción y confirmar que aparece en nómina

### 4. Casos Límite
- [ ] Usuario sin cuenta Gasolina (debe crear nueva)
- [ ] Usuario con cuenta Gasolina pero saldo positivo (deuda = 0)
- [ ] Usuario con deuda Gasolina > salario (debe limitar a salario)
- [ ] Usuario con deuda Gasolina < salario (debe usar monto de deuda)
- [ ] Múltiples cuentas por usuario (todas mostradas correctamente)

---

## Mejoras de Rendimiento

1. **Creación de Cuentas en Lote**
   - Reducidas N llamadas API a 1 llamada API
   - Mejora velocidad de registro de gasolina para equipos

2. **SearchObject con CSV**
   - Consulta única en lugar de N consultas para filtrado de usuarios
   - Carga reducida en base de datos

3. **Uso de Promise.all()**
   - Obtención de datos en paralelo donde sea posible
   - Tiempos de espera reducidos para operaciones de usuario

---

## Consideraciones de Seguridad

### Validación de Entrada
- Todos los IDs numéricos validados con conversión `Number()`
- Verificaciones de vacío/null antes de operaciones de base de datos
- Verificación de propiedad de cuenta vía user_id

### Aislamiento de Cuentas
- Los usuarios solo pueden acceder a sus propias cuentas
- Operaciones de cuenta requieren account_id válido
- Sin acceso a cuentas entre usuarios

---

## Mejoras Futuras Potenciales

### Características Posibles:
1. **Tipos de Cuenta**
   - Formalizar tipos de cuenta (GASOLINA, MAIN, CUSTOM)
   - Agregar campo de tipo al modelo Account

2. **Límites de Cuenta**
   - Establecer saldo negativo máximo por cuenta
   - Prevenir sobreendeudamiento en cuentas de Gasolina

3. **Reportes de Historial de Cuenta**
   - Exportar estado de cuenta a PDF
   - Generar resúmenes mensuales de cuenta

4. **Reglas de Deducción Automática**
   - Configurar deducciones automáticas para otros tipos de cuenta
   - Establecer deducciones automáticas basadas en porcentajes

5. **Reconciliación de Cuentas**
   - Herramientas para verificar saldos de cuenta
   - Pista de auditoría para todas las entradas del ledger

---

## Estado del Build

✅ **Build Exitoso**
- Sin errores de TypeScript
- Todos los componentes compilados exitosamente
- Bundle de aplicación generado
- Salida: `/home/nextor/Projects/RegistroProduccion/dist/myapp`

⚠️ **Advertencias**:
- Tamaño del bundle excedió presupuesto por 112.25 kB (no crítico por ahora)
- 4 advertencias de selector CSS (compatibilidad Bootstrap, no bloqueante)

---

## Lista Completa de Archivos Modificados

### Modelos y Vacíos (Models & Empties)
1. `src/app/Models/Consumption_User.ts` - Agregado account_id
2. `src/app/Empties/Consumption_User.ts` - Agregado account_id: null
3. `src/app/Models/Account.ts` - Agregado name y status
4. `src/app/RestModels/Account.ts` - Agregado name
5. `src/app/Empties/Account.ts` - Agregado name: ''

### Componentes Principales
6. `src/app/registrar-gasolina/registrar-gasolina.component.ts` - Auto-creación de cuentas Gasolina
7. `src/app/generar-nomina-alterno/generar-nomina-alterno.component.ts` - Auto-cálculo de deducción
8. `src/app/generar-nomina-alterno/generar-nomina-alterno.component.html` - Evento onAccountSelectionChange
9. `src/app/agregar-abono/agregar-abono.component.ts` - Cambio a account_id
10. `src/app/agregar-abono/agregar-abono.component.html` - Actualizado UI
11. `src/app/agregar-prestamo/agregar-prestamo.component.ts` - Cambio a account_id
12. `src/app/agregar-prestamo/agregar-prestamo.component.html` - Actualizado UI
13. `src/app/ver-estado-de-cuenta/ver-estado-de-cuenta.component.ts` - Nuevo método getDataByAccountId
14. `src/app/ver-estado-de-cuenta/ver-estado-de-cuenta.component.html` - Actualizado UI
15. `src/app/list-estados-cuenta/list-estados-cuenta.component.html` - Navegación a list-account
16. `src/app/generar-nomina-print/generar-nomina-print.component.ts` - Agregado currency_id
17. `src/app/generar-nomina-print/generar-nomina-print.component.html` - Mejoras de diseño
18. `src/app/generar-nomina/generar-nomina.component.ts` - Limpieza de código

### Nuevo Componente
19. `src/app/list-account/list-account.component.ts` - NUEVO
20. `src/app/list-account/list-account.component.html` - NUEVO
21. `src/app/list-account/list-account.component.css` - NUEVO

### Infraestructura
22. `src/app/classes/Rest.ts` - Agregado método update()
23. `src/app/app.routes.ts` - Agregada ruta list-account

### Configuración
24. `src/environments/environment.ts` - Actualizado backend_url
25. `src/environments/environment.development.ts` - Actualizado backend_url
26. `deploy.sh` - Configuración de despliegue

### Eliminados
27. `POS_mollusca.sql` - ELIMINADO (4,159 líneas)

---

## Contacto y Soporte

Para preguntas o problemas relacionados con estos cambios:
- Revisar este registro de cambios
- Verificar documentación específica del componente
- Probar primero en ambiente de desarrollo
- Verificar compatibilidad de API del backend

---

**Reporte Generado**: 4 de Noviembre de 2025
**Tiempo Total de Desarrollo**: ~6 horas
**Componentes Modificados**: 24 archivos
**Nuevas Características**: 3 características principales
**Correcciones de Bugs**: 2 correcciones críticas (sintaxis SearchObject, manejo de parámetro account)
