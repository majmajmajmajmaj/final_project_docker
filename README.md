# ✨ **Quick Past** ✨

---

## **Équipe**

Ce projet a été réalisé par :  
- 👩‍💻 **Majid BENMERAH** - TD 45  
- 👨‍💻 **Sofiane DOUMI** - TD 45  
- 👩‍💻 **Sacha VANNIER** - TD 47
- 👨‍💻 **Balthasar SAUBOT** - TD 44
- 👨‍💻 **Joseph BONTEMPS** - TD 44

---

## **📖 Introduction**

**Quick Past** est une application web intuitive qui permet de partager **texte** et **code** temporairement. Il va être possible de générer des liens qui vont permettre à d'autres utilisateurs d'accéder directement aux contenus partagés, qu'il s'agisse de texte, de code. Ces liens peuvent être personnalisés pour expirer après une période définie ou pour être protégés par un mot de passe.

**Rapide** et **facile d'utilisation**.

---

## **🔧 Architecture**

L'application suit une architecture en trois couches : **frontend**, **backend**, et **base de données**.

### **🌐 Frontend**
- ✨ **Technologies** :  
  - React.js pour des interfaces dynamiques.  
  - React Router pour une navigation fluide.  
- 💡 **Fonctionnalités** :  
  - Formulaires pour créer et gérer vos pastes.  
  - Interface pour afficher les pastes en temps réel.
  - Suppression des pastes.

### **🖥️ Backend**
- ⚙️ **Technologies** :  
  - Node.js et Express.js pour le serveur.  
  - bcrypt pour le hachage des mots de passe.
  - nanoid pour la génération de liens uniques.
- 🔗 **Endpoints Principaux** :  
  - **POST** `/api/paste` : Création d'un paste avec texte, mot de passe optionnel, et lien unique.
  - **GET** `/:link` : Récupération d'un paste par son lien unique.
  - **POST** `/:link` : Authentification et récupération d'un paste protégé par mot de passe.
  - **GET** `/api/pastes` : Liste des liens de tous les pastes existants.
  - **DELETE** `/api/pastes/:link` : Suppression d'un paste par son lien unique.

### **🗂️ Base de Données**
- 💿 **Technologies** :  
  - MongoDB pour le stockage des données.  
  - Mongoose pour la modélisation des données.  
- 📁 **Collections** :  
  - **Pastes** : Contient les champs suivants :  
    - `text` : Contenu du paste.  
    - `link` : Identifiant unique pour accéder au paste.  
    - `password` : (Optionnel) Mot de passe haché pour protéger le paste.

---

## **🚀 Utilisation**

1. **Créer un paste** :  
   - Écrivez un texte ou du code.  
   - Cliquez sur le bouton **Upload** pour générer un lien.  
   ![Créer un paste](assets/etape1.png)
   ![Créer un paste](assets/etape2.png)

2. **Consulter un paste** :  
   - Cliquez sur le lien.  
   ![Créer un paste](assets/etape3.png)

3. **Lister et supprimer un paste** :
   - Cliquez sur l'onglet **List All Pastes** pour consulter tous vos pastes. 
   - Dans la liste, cliquez sur l'icône de suppression à côté du paste souhaité.  
   ![Supprimer un paste](assets/etape4.png)

---

## **⚙️ Installation et Exécution**

### **1 Pré-requis**
- Docker et Docker Compose installés.

### **2 Installation**
1. Clonez le dépôt :  
   ```bash
   git clone https://github.com/majmajmajmajmaj/final_project_docker.git
   cd final_project_docker
   ```
2. Construisez les images Docker :  
   ```bash
   docker-compose build
   ```

### **3 Lancement**
Démarrez les services :  
   ```bash
   docker-compose up
   ```  
Accédez à l'application :  
- `http://localhost:80`  

---
