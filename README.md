# Role-Based Authentication App (Customer & Agent)  

## 📌 Overview  
This project is a **role-based authentication app** where users are assigned either a **Customer** or **Agent** role. The app allows:  
- **Customers** to **create and delete support tickets**  
- **Agents** to **view all tickets**  
- **Authentication & Role Management** using Firebase Authentication  
- **Data Storage** in **Firestore Database**  

## 🚀 Features  
✅ **User Authentication** (Sign Up, Login, Logout)  
✅ **Role-Based Access Control** (Customer & Agent)  
✅ **Customers** can **create and delete** tickets  
✅ **Agents** can **view** all tickets  
✅ **Firestore Database** for storing tickets  
✅ **Secure Access** with Firebase Authentication  

## 🛠️ Tech Stack  
- **React** (Frontend)  
- **Firebase Authentication** (User Management)  
- **Firestore Database** (Data Storage)  
- **React Router** (Navigation)  
- **Tailwind CSS / Bootstrap** (UI Styling)  

---

## 🏗️ Setup & Installation  

### 1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/your-username/role-based-auth.git
cd role-based-auth
```

### 2️⃣ **Install Dependencies**  
```sh
npm install
```

### 3️⃣ **Set Up Firebase**  
1. Go to [Firebase Console](https://console.firebase.google.com/)  
2. Create a new project  
3. Enable **Authentication** (Email/Password Sign-In)  
4. Create a **Firestore Database** (Set rules accordingly)  
5. Get Firebase Config & update `firebaseConfig.js`  

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
export default firebaseConfig;
```

### 4️⃣ **Run the Application**  
```sh
npm start
```

---

## 🔑 User Roles & Permissions  

| Role     | Create Ticket | Delete Ticket | View Tickets |
|----------|--------------|---------------|--------------|
| Customer | ✅           | ✅            | ❌           |
| Agent    | ❌           | ❌            | ✅           |

---

## 📂 Project Structure  
```
/role-based-auth  
 ├── /src  
 │   ├── /components      # UI Components  
 │   ├── /pages           # Screens (Login, Dashboard, etc.)  
 │   ├── /firebase        # Firebase Config & Services  
 │   ├── App.js           # Main Component  
 │   ├── index.js         # Entry Point  
 ├── /public              # Static Files  
 ├── package.json         # Dependencies  
 ├── README.md            # Documentation  
```

---

## 🔒 Firebase Firestore Rules (Security)  
Ensure only customers can create/delete their own tickets, and agents can view all tickets.  

```json
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /tickets/{ticketId} {
      allow read: if request.auth != null && request.auth.token.role == "agent";
      allow create, delete: if request.auth != null && request.auth.token.role == "customer" && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

---

## 🛠️ Future Enhancements  
🔹 **Admin Panel** for managing users and roles  
🔹 **Email Notifications** for new tickets  
🔹 **Real-time Updates** with Firestore listeners  

---

## 📜 License  
This project is licensed under the **MIT License**.  

---

## 📧 Contact  
For issues or contributions, reach out via **[GitHub Issues](https://github.com/your-username/role-based-auth/issues)**.  

---

Let me know if you need any modifications! 🚀
