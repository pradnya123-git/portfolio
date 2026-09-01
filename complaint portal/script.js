 let users = JSON.parse(localStorage.getItem("dyp_users_v7")) || [];
      let complaints = JSON.parse(localStorage.getItem("dyp_comps_v7")) || [];
      let currentUser = null;

      function setView(id) {
        document
          .querySelectorAll(".view")
          .forEach((v) => v.classList.add("hidden"));
        document
          .querySelectorAll(".pill")
          .forEach((p) => p.classList.remove("active"));
        document.getElementById(id).classList.remove("hidden");
      }

      // AUTH
      document.getElementById("signupForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const prn = document.getElementById("regPrn").value;
        if (users.find((u) => u.prn === prn))
          return alert("PRN already exists");
        users.push({
          name: document.getElementById("regName").value,
          prn: prn,
          pass: document.getElementById("regPass").value,
        });
        localStorage.setItem("dyp_users_v7", JSON.stringify(users));
        alert("Registration Complete!");
        setView("st-login");
      });

      function loginStudent() {
        const user = users.find(
          (u) =>
            u.prn === document.getElementById("logPrn").value &&
            u.pass === document.getElementById("logPass").value,
        );
        if (user) {
          currentUser = user;
          document.getElementById("welcomeText").innerText =
            `Hello, ${user.name}`;
          setView("st-profile");
          renderStudentHistory();
        } else {
          alert("Invalid login");
        }
      }

      // AI MODAL LOGIC
      function openAI() {
        const base = document.getElementById("sIssue").value;
        if (base.length < 5) return alert("Please type your complaint first");
        document.getElementById("opt1").innerText =
          `I am writing to formally report an issue regarding ${base}. I kindly request the administration to examine this matter.`;
        document.getElementById("opt2").innerText =
          `Subject: Urgent Assistance Required. I am facing significant challenges with ${base} and would appreciate an immediate resolution from the concerned department.`;
        document.getElementById("aiModal").style.display = "flex";
      }

      function selectAI(num) {
        document.getElementById("sIssue").value = document.getElementById(
          "opt" + num,
        ).innerText;
        closeAI();
      }
      function closeAI() {
        document.getElementById("aiModal").style.display = "none";
      }

      // COMPLAINTS
      function submitComplaint() {
        if (!document.getElementById("sIssue").value)
          return alert("Empty complaint!");
        complaints.push({
          id: Date.now(),
          prn: currentUser.prn,
          name: currentUser.name,
          stream: document.getElementById("sStream").value,
          issue: document.getElementById("sIssue").value,
          status: "Pending",
        });
        localStorage.setItem("dyp_comps_v7", JSON.stringify(complaints));
        document.getElementById("sIssue").value = "";
        renderStudentHistory();
        alert("Submitted!");
      }

      function renderStudentHistory() {
        const div = document.getElementById("myHistory");
        const my = complaints
          .filter((c) => c.prn === currentUser.prn)
          .reverse();
        div.innerHTML = my.length
          ? ""
          : '<p style="color:#64748b">No records yet.</p>';
        my.forEach((c) => {
          div.innerHTML += `<div style="background:white; border:1px solid #e2e8f0; padding:20px; border-radius:20px; margin-bottom:15px; animation:fadeIn 0.5s ease">
                <div style="display:flex; justify-content:space-between"><b>${c.stream}</b><span class="status ${c.status.toLowerCase()}">${c.status}</span></div>
                <p style="margin:10px 0; font-size:0.9rem">${c.issue}</p>
            </div>`;
        });
      }

      // ADMIN
      function loginAdmin() {
        if (document.getElementById("adminKey").value === "dyp") {
          setView("ad-dash");
          renderAdminTable();
        } else {
          alert("Access Denied");
        }
      }

      function renderAdminTable() {
        const tbody = document.getElementById("adminTable");
        tbody.innerHTML = "";
        complaints
          .slice()
          .reverse()
          .forEach((c) => {
            tbody.innerHTML += `<tr>
                <td><b>${c.name}</b><br><small>${c.prn}</small></td>
                <td>${c.stream}</td>
                <td style="font-size:0.85rem">${c.issue}</td>
                <td><span class="status ${c.status.toLowerCase()}">${c.status}</span></td>
                <td>${c.status === "Pending" ? `<button onclick="markDone('${c.id}')" style="background:var(--success); color:white; border:none; padding:8px 12px; border-radius:8px; cursor:pointer">Mark Action</button>` : "✅"}</td>
            </tr>`;
          });
      }

      function markDone(id) {
        complaints.find((c) => c.id == id).status = "Resolved";
        localStorage.setItem("dyp_comps_v7", JSON.stringify(complaints));
        renderAdminTable();
      }

      function logout() {
        currentUser = null;
        setView("st-login");
      }
    
