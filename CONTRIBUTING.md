# Guide de Contribution

Merci de votre intérêt pour contribuer au projet ! Ce document fournit les lignes directrices pour contribuer au projet.

## 🌟 Comment Contribuer

1. **Fork & Clone**
   - Créez un fork du projet
   - Clonez votre fork localement

2. **Branches**
   - Créez une branche pour chaque fonctionnalité ou correction
   - Utilisez des noms descriptifs pour vos branches
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```

3. **Commits**
   - Faites des commits atomiques et clairs
   - Utilisez des messages de commit descriptifs
   ```bash
   git commit -m "feat: ajoute la gestion des matières"
   ```

4. **Style de Code**
   - Respectez les conventions TypeScript
   - Suivez les bonnes pratiques React
   - Utilisez Prettier pour le formatage
   - Assurez-vous que ESLint ne signale aucune erreur

5. **Tests**
   - Ajoutez des tests pour les nouvelles fonctionnalités
   - Assurez-vous que tous les tests passent

6. **Documentation**
   - Mettez à jour la documentation si nécessaire
   - Commentez le code complexe
   - Ajoutez des types TypeScript appropriés

## 🚀 Processus de Pull Request

1. Mettez à jour votre branche avec la dernière version de main
```bash
git remote add upstream [url-du-depot-original]
git fetch upstream
git rebase upstream/main
```

2. Créez une Pull Request avec :
   - Un titre clair
   - Une description détaillée
   - Des références aux issues concernées

3. Attendez la revue de code
   - Répondez aux commentaires
   - Effectuez les modifications demandées

## ⚠️ À Éviter

- Ne commitez pas directement sur main
- Évitez les fichiers trop volumineux
- Ne commitez pas de données sensibles
- Évitez les modifications non liées dans une même PR

## 📝 Rapport de Bugs

Pour signaler un bug, créez une issue avec :
- Une description claire du problème
- Les étapes pour reproduire
- Le comportement attendu vs actuel
- Des captures d'écran si pertinent

## 💡 Suggestions

Les suggestions d'amélioration sont les bienvenues ! Créez une issue avec :
- Une description détaillée
- Les bénéfices attendus
- Des exemples d'implémentation si possible