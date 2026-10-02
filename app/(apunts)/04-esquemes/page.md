# Esquemes

## Els esquemes ens permeten classificar tots els programes que tracten seqüències

La pregunta que ens hem de fer sempre en un problema de seqüències és la
següent:

> El resultat es pot donar _sense haver de processar tots els elements_ de la
> seqüència??

Segons si responem sí o no, podem distingir entre:

1. **Recorreguts**: per calcular el resultat s'han de processar tots els
   elements per força.
2. **Cerques**: per calcular el resultat no cal veure tots els elements.

No hi ha més opcions, per tant donat qualsevol problema, és molt important
detectar d'entrada (per l'experiència d'haver practicat) de quin subtipus de
problema es tracta per plantejar-lo correctament.

Exemples de recorreguts:

-   Suma d'una seqüència.
-   Màxim d'una seqüència.
-   Recompte de parelles d'elements consecutius iguals.

Exemples de cerques:

-   Algun element té un valor concret (o compleix una condició).
-   Cap element és negatiu (o compleix una condició).
-   Com a màxim hi ha 5 repeticions seguides d'un element.

És molt útil, un cop s'han fet problemes de diferents tipus, repassar l'argument
de perquè són d'un tipus o d'un altre, i poder fer un anàlisi ràpid.

## Un recorregut és un càlcul sobre una seqüència que requereix processar _tots_ els elements

Podem destil·lar tots els problemes de tipus recorregut en un codi genèric que
el següent:

```c++
Inicialitzacio;
Obtenir 1r Element;
while (!Últim Element) {
    Processar Element;
    Obtenir Següent Element;
}
```

Per exemple:

```c++
// quantes 'a' hem vist?

char c;
int as = 0;     // inicialització
cin >> c;       // obtenir primer element
while (c != '.' /* últim element */) {
    if (c == 'a') {
        as++;   // processar element
    }
    cin >> c;   // obtenir següent element
}
cout << as << endl;
```

Un altre exemple:

```c++
// sumar les xifres (seqüència de dígits!)
int n, suma = 0;
cin >> n;   // Obtenir primer element (p.e. 12345)
while (n > 0) {     // Últim element = 0
    suma += n % 10; // Element: n, fem servir la última xifra.
    n /= 10;        // Següent: n / 10, traiem una xifra.
}
cout << suma << endl;
```

## Una cerca és un càlcul sobre una seqüència en el qual podem donar el resultat _sense haver vist tots els elements_

Tots els problemes de tipus "cerca" tenen un codi genèric com el següent:

```c++
Inicialització;
Obtenir 1r Element;
bool trobat = false;
while (!trobat && !Últim Element) {
    if (Condició Cerca) {
        trobat = true;
    } else {
        Obtenir Següent Element;
    }
}
```

Aquest esquema introdueix una variable `trobat` que en cada cas es pot adaptar
(i segurament cal, per ajudar a la comprensió) al programa que es fa. Per
exemple, si busquem divisor per determinar si un nombre és primer, llavors podem
posar `es_primer` en compte de `trobat` i començar a `true` en comptes de
`false`.

Però... perquè hi ha un `if-else` en la part de comprovar la condició i la
obtenció del següent element es fa al `else`?? És important veure que quan fem
una cerca, ens pot interessar saber a quina posició o qui era l'element cercat.
Si volem mantenir les coses com estaven quan l'hem trobat, no hem de llegir cap
més element, hem de passar directamnent a fora del bucle. Per aconseguir-ho, és
important posar aquest `else`.

Apliquem l'esquema a determinar si un enter té la xifra 9:

```c++
int n;
cin >> n;
bool te_un_9 = false;
while (!te_un_9 && n > 0) {
    if (n % 10 == 9) {
        te_un_9 = true;
    } else {
        n /= 10;
    }
}
```

En aquest cas, el fet de posar `else` en l'obtenció del següent element ens
permet tenir el valor de `n` en el moment que hem vist la xifra 9. Si no hi fos,
passariem al següent valor i el 9 es perdria.

Si el programa ens demana _en quina posició_ (començant pel final) apareix certa
xifra, llavors és força important aplicar el patró exacte:

```c++
int posicio_xifra(int n, int xifra) {
    bool trobada = false;
    int index = 1;
    while (!trobada && n > 0) {
        if (n % 10 == xifra) {
            trobada = true;
        } else {
            n /= 10;
            index++;
        }
    }
    return trobada ? index : - 1;
}
```

La funció retorna -1 si no s'ha trobat la `xifra` i l'índex de la xifra de la
primera que es troba.

## Finestres

🚧 Pendent... 🚧

## Seqüències de seqüències

🚧 Pendent... 🚧

<!-- Trampita de que hay que leer todo aunque el algoritmo de las secuencias pequeñas sea una búsqueda! -->
