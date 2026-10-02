# Seqüències

Fent servir l'entrada/sortida de C++ (`cin` i `cout`), els
programes més útils que podrem fer (que fan una feina útil per a
nosaltres) seran aquells que processen **seqüències**, és a dir,
conjunts de dades del mateix tipus que rebem una darrere l'altra
(és a dir, seqüencialment).

Exemples de seqüències:

- Els enters des de 2 fins a 100.
- Enters positius acabats amb un 0.
- Lletres minúscules acabades amb un `'.'`.
- Parelles de coordenades $(x, y)$ acabades amb $(0, 0)$.
- 100 noms de persones.
- 100 línies i a cada línia nombres enters separats per espais.
- Tripletes amb el nom, pes i alçada de 10000 persones.

Les seqüències o bé tenen una llargada definida o bé tenen un
**sentinella**, és a dir, un element del mateix tipus que els de
la seqüència que serveix per dir que la seqüència s'ha acabat (el
`'.'` de l'exemple de les lletres minúscules o el $(0, 0)$ dels
punts bidimensionals).

## Els càlculs més simples sobre seqüències es poden fer mirant només cada element per separat

Els programes més senzills que processen seqüències la única cosa
que fan és mirar cada element per separat i processar-lo, i no
necessiten guardar ni els elements ni cap dada acumulada.

Exemples:

- Traduccions: transformar cada element en un altre segons una
  funció.
- Filtratges: mostrar elements que compleixen una condició.

Un exemple, el següent programa passa a majúscules totes les
lletres minúscules d'una seqüència fins que veu un `'.'` (si no
són lletres no les canvia).

```c++
char c;
cin >> c;
while (c != '.') {
    if (c >= 'a' && c <= 'z') {
        c = char(int(c) - 32);
    }
    cout << c;
    cin >> c;
}
cout << endl;
```

Aquests programes tant senzills no requereixen emmagatzemar res
més que l'element de la seqüència i es poden expressar en general
dient que cada element a la sortida és simplement una funció d'un
element a l'entrada:

```c++
char c;
cin >> c;
while (c != '.') {
    cout << funcio(c);
    cin >> c;
}
cout << endl;
```

En aquest cas la `funcio` seria una funció que passa a majúscules
si troba una minúscula, li direm `a_majuscula`:

```c++
char a_majuscula(char c) {
    if (c >= 'a' && c <= 'z') {
        c = char(int(c) - 32);
    }
    return c;
}
```

## Per fer certs càlculs sobre seqüències no cal emmagatzemar tots els elements de la seqüència en memòria

Tret dels programes vistos en l'apartat anterior, sovint voldrem
un resultat que és un "resum" de les dades de la seqüència: el
màxim, la suma, l'existència de cert element, etc.

Vegem com podem calcular el **màxim** d'una seqüència de nombres
naturals positius acabada en un 0:

```c++
int n;
cin >> n;
int maxim = n;
while (n != 0) {
    if (n > maxim) {
        maxim = n;
    }
    cin >> n;
}
cout << maxim << endl;
```

El programa té dues propietats molt importants:

1. Pot treballar amb seqüències d'una _llargada arbitrària_
   (milers de milions, si calgués). El programa només acaba quan
   rep un 0 a l'entrada, per tant la llargada és qualsevol.

2. Només cal recordar el màxim de la seqüència fins a aquell
   moment, per tant la _quantitat de memòria necessària per fer
   el càlcul_ és només una sola variable `int`, independentment
   del tamany de la seqüència.

Els problemes d'aquest tema tots tenen aquestes dues propietats.
Mai necessiten recordar els elements concrets de la seqüència,
perquè només es necessiten veure una vegada i podem treballar amb
resultats parcials que són un "resum" de la part de la seqüència
vista fins al moment.

A més, les dades que resumeixen la part de la seqüència que s'ha
processat són d'un tamany fixe i no depenen del tamany de la
seqüència en absolut

Exemples dels tipus de càlculs que no requereixen emmagatzemar la
seqüència i les dades necessàries:

| Càlcul                          | Dades necessàries                |
| ------------------------------- | -------------------------------- |
| Suma                            | Suma parcial                     |
| Mitjana                         | Suma parcial i número d'elements |
| Màxim                           | Màxim parcial                    |
| Mínim                           | Mínim parcial                    |
| Comptatges                      | Comptador                        |
| Ordenada                        | Element anterior                 |
| Existència d'un element (cerca) | Booleà                           |

Per comparació, aquí teniu exemples de càlculs que **sí que
requereixen** tenir tota la seqüència en memòria:

- Comptar quants elements d'una seqüència són iguals que l'últim.
- Mostrar una seqüència al revés.
- Determinar quants elements d'una seqüència superen la mitjana
  de la pròpia seqüència.

## Les seqüències de longitud fixa o bé tenen una longitud coneguda o ens donen el tamany abans del primer element

Si hem de sumar els elements d'una seqüència que sabem que té 100
elements, podem fer això:

```c++
#include <iostream>
using namespace std;

// Declarem una constant per aclarir que això és un "valor conegut"
// El fet de posar el nom en majúscules ens recorda que és una constant
const int NUM_ELEMENTS = 100;

int main() {
    int i = 0, n, suma = 0;
    while (i < NUM_ELEMENTS) {
        cin >> n;
        suma += n;
        i++;
    }
    cout << suma << endl;
}
```

En el cas que l'entrada comenci amb el nombre d'elements a
llegir:

```c++
int num_elements;
cin >> num_elements;
int n, suma = 0, i = 0;
while (i < num_elements) {
    cin >> n;
    suma += n;
    i++;
}
```

## El `for` ens permet processar seqüències de llargada fixa amb més comoditat

En un `while` com aquest:

```c++
int i = 0;       /* <- A */
// preàmbul
while (i < N) {  /* <- B */
    // cos
    i++;         /* <- C */
}
```

hi ha 3 peces d'informació que determinen com es comportarà la
iteració:

1. `A`: on comença
2. `B`: on acaba
3. `C`: com progressa

Sovint el preàmbul o el cos de la iteració és llarg i les tres
informacions estan separades entre sí, cosa que dificulta la
comprensió.

Per arreglar-ho es va inventar el `for`, que agrupa les 3 parts
en una mateixa línia:

```c++
// preàmbul
for (int i = 0; i < N; i++) {
    // cos
}
```

El `for` es comporta de forma totalment equivalent al `while`, i
funciona així:

1. Primer s'avalua la part `A` (`int i = 0`). Només una vegada.
2. Tot seguit s'avalua la condició (part `B`). Si aquesta és
   certa, s'executa el bloc. Si és falsa se salta el bloc i es
   continua passat el `for`.
3. Un cop acabat el bloc, s'executa la part `C` (`i++`) i es
   torna al pas 2.

Tanmateix, el `for` té alguna peculiaritat:

1. La variable `i` (també anomenada "iterador") està declarada a
   dins del mateix `for` i si s'intenta fer servir a fora no
   existirà. Això és bo en part perquè la podrem tornar a
   declarar en un altre `for` i queda confinada a la iteració.
   (Si volem poder accedir a la `i` a fora del `for` es pot
   declarar abans i simplement assignar-li el valor inicial a la
   part A del `for`.)

2. Els punts i coma són _separadors_ entre les parts, i n'hi ha
   sempre 2. Però no tenen el mateix significat que amb les
   instruccions normals.

## Quin haig d'utilitzar, `while` o `for`?

Donat que `while` i `for` són equivalents, es podria escriure
qualsevol programa usant només `while` o només `for`. Però a
l'hora de la veritat, cadascún té els seus punts forts i febles,
i per tant cal intentar usar el que més escaigui en el context.
L'ús de `while` o `for` sovint comunica implícitament al lector
del programa quina és la intenció del programador.

**`while`**: es fa servir amb a seqüències amb número d'elements
desconegut, o bé quan la condició d'acabament del
`while` és llarga i complexa de llegir (i per tant faria el `for`massa complicat). Per altra banda, es fa servir`while`
també si la iteració no avança amb un simple increment sinó que
fa una lectura o un càlcul més complex per passar al següent
element.

**`for`**: es fa servir quan tenim el número d'iteracions molt
clar desde bon principi i el tenim en una variable; per altra
banda, la iteració progressa amb increments d'un en un (p.e.
`i++`), i comença en un valor concret que també coneixem.

Per resumir-ho, el `for` és per iteracions molt simples i
estandaritzades, de l'estil:

```c++
for (int i = 0; i < N; i++) {
    // ...
}
```

que és on és còmode de llegir i entendre. El `while` és per totes
les altres, ja sigui perquè la condició o el pas al següent
element són més complicats i per tant és bo que estiguin en
línies separades.

### Exemple: mínim de N enters

Apliquem el `for` a un programa que calcula el mínim d'una
seqüència de la qual ens donen la longitud just al principi:

```c++
int N;
cin >> N; // llegim longitud

// Al veure el primer element, l'agafem com a mínim
int minim, x;
cin >> minim;
for (int i = 1; i < N; i++) { // i -> 1 ··· N-1!
    cin >> x;
    if (x < minim) {
        minim = x;
    }
}
```

Malgrat es pot inicialitzar el mínim amb algun valor que sapiguem
que serà més gran que els elements de la seqüència, és més robust
simplement prendre el primer element de la seqüència com el
mínim, i després llegir la resta i comparar-los amb el mínim fins
al moment.

Per altra banda, donat que el primer element ja el posem a la
variable `minim` directament, només cal llegir `N-1` elements i
per fer-ho hem començat amb `i = 1` en comptes de `i = 0`.

## El sentinella és un valor del mateix tipus que els elements de la seqüència però que marca el final

En seqüències amb un número variable d'elements, necessitem una
manera per saber quan hem de parar de llegir. Això se sol fer
utilitzant algun valor _del mateix tipus_ que els altres valors
de la seqüència, que fem servir com a senyal per parar. El que és
important és entendre que **el sentinella no forma part de la
seqüència**: l'últim element de la seqüència és el que hi ha
_abans_ del sentinella. Un cop veiem el sentinella, sabem que ja
hem _passat_ l'últim element.

Exemples:

- Naturals acabats amb -1: `9 5 10 0 2 4 4 6 -1`.
- Paraules acabades amb "THE_END":
  `and they lived happily ever after THE_END`.
- Caràcters acabats amb "#": `a bc  de--% %()[ ]$#`.

El llenguatge escrit té sentinelles, de fet: els punts de final
de frase indiquen el final d'una seqüència de paraules. Fent
servir aquest mateix sentinella, el següent programa compta
quantes `'a'`s té la seqüència d'entrada, que acaba amb `'.'`:

### Comptar quantes as hi ha a l'entrada

```c++
char c;
int num_as = 0;
cin >> c;
while (c != '.') {
    if (c == 'a') {
        num_as++;
    }
    cin >> c;
}
cout << num_as << endl;
```

Cal fixar-se en que just després de llegir un valor sempre tenim
la condició del `while`, de manera que en el moment que surti un
`'.'` saltarem el `while` i seguirem amb el programa. Això
garanteix que no tractem el sentinella com a un element més de la
seqüència, cosa que podria donar resultats erronis.

## Una lectura amb `cin` retorna `true` o `false` segons si la lectura ha tingut èxit

Fins ara hem utilitzat les instruccions de lectura com ara
`cin >> a` com a instruccions:

```c++
int a;
cin >> a;
```

però es poden utilitzar com a **expressions**, i el seu resultat
és un valor de tipus `bool`, que és `true` si la lectura ha
tingut èxit o `false` altrament.

L'èxit de la lectura té molt a veure amb el **tipus** de dada que
demanem, que ve donat pel tipus de la variable a on volem guardar
la dada llegida. Si llegim enters, no qualsevol cosa que escrigui
l'usuari del programa és un enter.

Fent servir el `cin >> ...` com una expressió podem fer un
programa que detecta si s'ha escrit un enter o no:

```c++
int n;
if (cin >> n) {
    cout << "Has escrit un enter i el seu valor és: "
         << n << endl;
} else {
    cout << "No has escrit un enter" << endl;
}
```

Donat que la condició de l'`if` és la instrucció de lectura
mateixa, cal començar per fer la lectura. Així doncs, la
instrucció `cin >> n` farà el que coneixem: pararà el programa,
esperarà que l'usuari escrigui alguna cosa i la tecla Enter (o
Return), i després interpretarà els caràcters escrits com un
valor de tipus `int`. Però donat que l'`if` està esperant a saber
què cal fer després, la instrucció retorna `true` si s'han pogut
interpretar les dades entrades com un enter o no.

## Podem evitar la doble lectura en una seqüència amb sentinella posant la lectura a la condició

Hi ha una simplificació interessant de la plantilla de lectura
d'una seqüència amb sentinella
[proposada més amunt](#comptar-quantes-as-hi-ha-a-lentrada) que permet evitar tenir dues
lectures iguals, una abans del `while` i una just al final del
bloc.

Evitar la duplicació sol ser una bona estratègia perquè el
comportament d'un programa està més controlat i no cal ajustar
vàries coses en concert per fer canvis en el funcionament del
programa.

El truc és doncs considerar la lectura com una expressió i
posar-la a la condició:

```c++
char c;
while (cin >> c && c != '.') {
    // ...
}
```

Si hi pensem amb deteniment, el programa manté el seu significat
perfectament perquè les lectures es fan en el mateix moment que
es feien abans i tot queda igual algorísmicament però alhora
escrivim una mica menys i no hi ha repetició.

## Podem llegir seqüències sense sentinella usant `cin >> ...` com a condició

Una de les raons per les quals una instrucció com `cin >> n`
retorna `false`, apart de no poder llegir el tipus requerit, és
també que l'**entrada del programa s'hagi acabat**. Normalment,
quan executem un programa, tot el que escriguem al teclat es
converteix en entrada, però podem enviar un caràcter que li diu
al programa que tanquem l'entrada i es pot donar per acabada. En
Linux i Mac, la tecla que produeix aquest caràcter és Ctrl+D (en
Windows és Ctrl+Z i tot seguit Enter). En qualsevol programa,
prémer aquesta combinació de tecles fa que el programa consideri
que ja no hi haurà més entrada.

Aprofitant aquest fet, el següent programa llegeix enters "fins
que es pugui":

```c++
int n;
while (cin >> n) {
    // ...
}
```

El programa pot parar per més d'una raó, les dues relacionades
amb que no s'ha pogut llegir un enter:

1. S'ha acabat l'entrada perquè hem premut Ctrl+D.
2. Hem escrit una cosa que _no és un enter_.

Quan volguem llegir seqüències que no tenen sentinella, podem
aprofitar aquest fet per poder llegir "fins que es pugui" i per
tant simplificar la detecció del final.

## Resum de patrons típics

En els següent patrons se suposa que hi ha una variable `element`
amb el tipus de la seqüència (que no està declarada en el codi!),
ja sigui `int`, `char`, `string`, etc.

**Seqüències amb tamany conegut**

```c++
int N;
cin >> N;
// inicialització
for (int i = 0; i < N; i++) {
    cin >> element;
    // processar element
}
// donar resultat
```

**Seqüències amb sentinella**

```c++
// inicialització
cin >> element;
while (element != VALOR_SENTINELLA) {
    // processar element
    cin >> element;
}
// donar resultat
```

o bé

```c++
// inicialització
while (cin >> element && elemement != VALOR_SENTINELLA) {
    // processar element
}
// donar resultat
```

**Seqüències sense sentinella**

```c++
// inicialització
while (cin >> element) {
    // processar cada element
}
// donar resultat
```

_(Ctrl+D per donar el senyal de "final de l'entrada".)_

# Exemples

## Calcular $n!$ (factorial d'$n$)

El $n!$ recorre tots els elements d'una seqüència d'enters d'1 a
$n$ i els multiplica.

```c++
//
int n;
cin >> n;
int resultat = 1;
for (int i = 2; i <= n; i++) {
    resultat *= i;
}
cout << resultat << endl;
```

Com a funció:

```c++
int factorial(int n) {
    int resultat = 1;
    for (int i = 2; i <= n; i++) {
        resultat *= i;
    }
    return resultat;
}
```

## Revessar els dígits d'un nombre

Revessar seria posar les xifres en ordre invers: 12345 revessat
és 54321, 482 revessat és 284, i 9995 revessat és 5999. En aquest
cas, la seqüència és de nombres en què cadascun té una xifra
menys que l'anterior (la de menys pes), amb sentinella el 0.

```c++
int n;
cin >> n;
int r = 0;
while (n > 0) {
    r = 10 * r + n % 10;
    n /= 10;
}
cout << r << endl;
```

Com a funció:

```c++
int revessar(int n) {
    int r = 0;
    while (n > 0) {
        r = 10 * r + n % 10;
        n /= 10;
    }
    return r;
}
```

Revessar tots els enters d'una seqüència sense sentinella:

```c++
#include <iostream>
using namespace std;

int revessar(int n) {
    int r = 0;
    while (n > 0) {
        r = 10 * r + n % 10;
        n /= 10;
    }
    return r;
}

int main() {
    int n;
    while (cin >> n) {
        cout << revessar(n) << endl;
    }
}
```

## Trobar un nombre més gran que el primer en una seqüència sense sentinella

En aquest exemple la seqüència ha de tenir almenys el primer
element. És una seqüència sense sentinella però es pot
interrompre la iteració si trobem el que busquem (és una _cerca_,
que explicarem amb més detall en el proper tema).

```c++
#include <iostream>
using namespace std;

int main() {
    int primer, n;
    cin >> primer;
    bool trobat = false;
    while (!trobat && cin >> n) {
        trobat = n > primer;
    }
    cout << (trobat ? "si" : "no") << endl;
}
```

## Subsequència més llarga de repeticions

Ens donen una seqüència de paraules, a on anomenarem la primera
paraula `p0`. El resultat ha de ser un natural que indica el
número més llarg de repeticions de `p0` vistes a la seqüència
(incloent la primera aparició).

```c++
string p0;
cin >> p0; // llegim la primera paraula apart

string p;
// considerem que hem vist `p0` 1 vegada
int len = 1;    // Longitud de la seqüència de repeticions en curs
int maxlen = 1; // Longitud màxima d'una seqüència de repeticions
while (cin >> p) {
    if (p != p0) {
        len = 0; // s'ha interromput la seqüència de repeticions
    } else {
        len++;
        if (len > maxlen) {
            maxlen = len;
        }
    }
}
```

## Inserir un nombre al seu lloc en una seqüència d'enters ordenada

Cal llegir un enter per separat (li direm `x`), i després una
seqüència d'enters ordenada de menor a major. Cal escriure la
mateixa seqüència però incloent `x` en el seu lloc a la
seqüència.

```c++
#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;

    // 1. Busquem el punt d'inserció
    int n;
    bool trobat = false;
    while (!trobat && cin >> n) {
        if (n >= x) {
            trobat = true;
        } else {
            cout << n << ' ';
        }
    }

    // 2. Insertem 'x' al seu lloc
    cout << x;

    // 3. Mostrem la resta de nombres (si n'hi ha!)
    if (trobat) {
        cout << ' ' << n; // encara s'havia d'escriure!
        while (cin >> n) {
            cout << ' ' << n;
        }
    }
    cout << endl;
}
```
