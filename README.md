# gaelic-football-tracker

App that tracks gaelic football game data

# Mono repos avec mobile & server

@To do: Installer les libs depuis la racine

## Démarrer les apps

Depuis la root du projet:</br>
`npm run start` -> Lance la version mobile</br>
`npm run dev` -> Lance la version client</br>
`npm run codegen` -> Valide le schema client graphQL utilisé et met à jour les types côté client si modifié côté back</br>
</br>
Si la base de données a été mise à jour, il faut regénérer le schema GraphQL:</br>
`npm run fetch-schema`

## Mobile

Attention à l'ordre des fragments est important, ils doivent être implémentés avant la query sinon codegen génère des erreurs de types.
