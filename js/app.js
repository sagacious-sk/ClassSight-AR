const demo = {
  faculty: {
    name:"Anirudh", initials:"AN", role:"Faculty",
    stats:[["Classes today","4","2 completed","mint"],["Students tracked","118","+6 this week","blue"],["Present today","104","88.1% attendance","yellow"],["Avg. focus","82%","+4.8% this week","coral"]],
  },
  student: {
    name:"Pavan Kumar", initials:"PK", role:"Student"
  }
};
let currentRole="faculty";

function selectRole(role){
  currentRole=role;
  document.querySelectorAll(".role-btn").forEach(b=>b.classList.toggle("active",b.dataset.role===role));
  document.getElementById("authTitle").textContent=role==="faculty"?"Sign in to ClassSight":"Student sign in";
  document.getElementById("authSubtitle").textContent=role==="faculty"?"Choose your role and continue to your classroom.":"Check attendance, notes and classroom updates.";
}
function togglePassword(){
  const p=document.getElementById("password"); p.type=p.type==="password"?"text":"password";
}
function handleLogin(e){e.preventDefault(); enterApp(currentRole);}
function demoLogin(){enterApp(currentRole);}
function enterApp(role){
  currentRole=role;
  document.getElementById("authPage").classList.add("hidden");
  document.getElementById("appPage").classList.remove("hidden");
  document.getElementById("facultyNav").classList.toggle("hidden",role!=="faculty");
  document.getElementById("studentNav").classList.toggle("hidden",role!=="student");
  const d=demo[role];
  document.getElementById("sidebarRole").textContent=role==="faculty"?"FACULTY PORTAL":"STUDENT PORTAL";
  document.getElementById("profileName").textContent=d.name;
  document.getElementById("profileRole").textContent=d.role;
  document.getElementById("avatar").textContent=d.initials;
  document.getElementById("greeting").textContent=role==="faculty"?"Good evening, Anirudh":"Good evening, Pavan";
  showSection(role==="faculty"?"overview":"studentOverview",document.querySelector(`#${role}Nav .nav-item`));
}
function logout(){
  document.getElementById("appPage").classList.add("hidden");
  document.getElementById("authPage").classList.remove("hidden");
}
function showSection(section,btn){
  document.querySelectorAll(".nav-item").forEach(x=>x.classList.remove("active"));
  if(btn) btn.classList.add("active");
  const titles={overview:"Overview",classes:"My Classes",students:"Students",engagement:"AI Engagement",incidents:"AI Alerts",notes:"Lecture Notes",reports:"Reports",studentOverview:"Overview",attendance:"My Attendance",studentNotes:"Lecture Notes",studentAlerts:"My Alerts",timetable:"Timetable"};
  document.getElementById("pageName").textContent=titles[section]||"Overview";
  document.getElementById("dashboardContent").innerHTML=currentRole==="faculty"?facultyPage(section):studentPage(section);
}
function facultyPage(s){
 if(s==="overview") return `
 <div class="page"><div class="section-title"><div><h3>Today's classroom pulse</h3><p>AI-generated snapshot across Anirudh's classes.</p></div><div class="date-chip">08 Oct 2026 · Thursday</div></div>
 <div class="stat-grid">${demo.faculty.stats.map(x=>`<div class="stat-card"><div class="stat-top">${x[0]}<span class="stat-icon i-${x[3]}">${x[3]==="mint"?"▣":x[3]==="blue"?"♙":x[3]==="yellow"?"✓":"◔"}</span></div><h4>${x[1]}</h4><span class="delta">${x[2]}</span></div>`).join("")}</div>
 <div class="dashboard-grid"><div class="panel"><h4>Attendance this week</h4><div class="panel-sub">Average attendance across your classes</div><div class="chart">${[76,84,82,91,88,94,88].map((v,i)=>`<div class="bar-wrap"><div class="bar ${i===5?"active":""}" style="height:${v}%"></div><span class="bar-label">${["Fri","Mon","Tue","Wed","Thu","Today","Sat"][i]}</span></div>`).join("")}</div><div class="legend"><span>Attendance</span></div></div>
 <div class="panel"><h4>Attention required</h4><div class="panel-sub">AI flags needing faculty review</div><div class="alert-box"><strong>⚠ Behaviour alert · Shree Nidhi</strong><p>Possible classroom conflict detected at 11:18 AM. Human review required.</p><button onclick="showToast('Incident marked for review.')">Review incident</button></div><div class="alert-box" style="background:#eef7fb;border-color:#d6e8f1"><strong>◔ Low focus · Shiva Shankar</strong><p>Focus score fell below 55% for 18 minutes.</p><button onclick="showToast('Student profile opened.')">View student</button></div></div>
 <div class="panel wide"><div class="section-title"><div><h4>Students needing attention</h4><div class="panel-sub">Latest AI-assisted classroom observations</div></div><button class="download" onclick="showSection('students')">View all students</button></div><table class="table"><thead><tr><th>Student</th><th>Attendance</th><th>Focus</th><th>Behaviour</th><th>Status</th></tr></thead><tbody>${studentRows()}</tbody></table></div></div></div>`;
 if(s==="students") return `<div class="page"><div class="section-title"><div><h3>Student overview</h3><p>Attendance, focus and AI observations.</p></div><button class="primary-btn" onclick="showToast('Add student form opened.')">+ Add student</button></div><div class="panel"><table class="table"><thead><tr><th>Student</th><th>Attendance</th><th>Focus</th><th>Last seen</th><th>Status</th></tr></thead><tbody>${studentRows(true)}</tbody></table></div></div>`;
 if(s==="classes") return `<div class="page"><div class="section-title"><div><h3>My classes</h3><p>Today's teaching schedule and live classroom state.</p></div></div><div class="cards-3">${[["AI & Machine Learning","CSE-A · 10:00 AM","38 students","Live"],["Data Structures","CSE-B · 12:00 PM","42 students","Completed"],["Computer Vision","CSE-A · 2:30 PM","38 students","Upcoming"]].map((x,i)=>`<div class="panel"><span class="pill ${i===0?"good":i===1?"info":"warn"}">${x[3]}</span><h4 style="margin-top:16px">${x[0]}</h4><p class="panel-sub">${x[1]}</p><div class="list"><div class="list-row"><span style="font-size:10px">Students</span><strong style="font-size:11px">${x[2]}</strong></div><div class="list-row"><span style="font-size:10px">Attendance</span><strong style="font-size:11px">${i===0?"91%":i===1?"86%":"—"}</strong></div></div></div>`).join("")}</div></div>`;
 if(s==="engagement") return `<div class="page"><div class="section-title"><div><h3>AI engagement intelligence</h3><p>Camera-derived focus signals, not disciplinary conclusions.</p></div></div><div class="dashboard-grid"><div class="panel"><h4>Class focus score</h4><div class="metric-big" style="margin-top:20px">82%</div><p class="panel-sub">+4.8% compared with last week</p><div class="progress" style="width:100%;margin-top:20px"><span style="width:82%"></span></div><div class="list"><div class="list-row"><span>Focused</span><strong>31 students</strong></div><div class="list-row"><span>Occasionally distracted</span><strong>5 students</strong></div><div class="list-row"><span>Needs attention</span><strong>2 students</strong></div></div></div><div class="panel"><h4>Focus by student</h4>${[["Pavan Kumar",91],["Shree Nidhi",87],["Shiva Shankar",54]].map(x=>`<div class="list-row"><div class="person"><div class="mini-avatar">${x[0].split(" ").map(a=>a[0]).join("")}</div><strong>${x[0]}</strong></div><div class="focus-meter"><div class="progress"><span style="width:${x[1]}%"></span></div><b style="font-size:10px">${x[1]}%</b></div></div>`).join("")}</div></div></div>`;
 if(s==="incidents") return `<div class="page"><div class="section-title"><div><h3>AI alerts & incidents</h3><p>Flags are for human review—not automatic disciplinary decisions.</p></div></div><div class="panel">${[["Possible classroom conflict","Shree Nidhi","08 Oct · 11:18 AM","High"],["Low engagement period","Shiva Shankar","08 Oct · 10:42 AM","Medium"],["Unusual movement pattern","Pavan Kumar","07 Oct · 2:06 PM","Low"]].map(x=>`<div class="note-card"><div><span class="pill ${x[3]==="High"?"danger":x[3]==="Medium"?"warn":"info"}">${x[3]}</span><h5>${x[0]}</h5><p>${x[1]} · ${x[2]}</p></div><button class="download" onclick="showToast('Incident opened for faculty review.')">Review</button></div>`).join("")}</div></div>`;
 if(s==="notes") return notesPage("Faculty lecture library");
 return `<div class="page"><div class="section-title"><div><h3>Reports</h3><p>Export classroom analytics for administration.</p></div></div><div class="cards-3">${["Daily attendance report","Weekly engagement report","Monthly classroom report"].map((x,i)=>`<div class="panel"><div class="stat-icon i-${["mint","blue","yellow"][i]}">▤</div><h4 style="margin-top:16px">${x}</h4><p class="panel-sub">Updated ${i===0?"today":"08 Oct 2026"}</p><button class="download" style="margin-top:15px" onclick="showToast('Demo report generated. Backend export will replace this.')">Download CSV</button></div>`).join("")}</div></div>`;
}
function studentRows(full=false){
 const rows=[
  ["Pavan Kumar","94%","91%","Normal","Excellent"],
  ["Shree Nidhi","88%","87%","Review pending","Good"],
  ["Shiva Shankar","79%","54%","Attention","Watch"],
  ["Senthil Kumar","92%","89%","Normal","Excellent"]
 ];
 return rows.map((x,i)=>`<tr>
   <td><div class="person"><div class="mini-avatar">${x[0].split(" ").map(a=>a[0]).join("")}</div><div><strong>${x[0]}</strong><small>${full ? "CSE-A · Roll "+(i+21) : "Today"}</small></div></div></td>
   <td>${x[1]}</td>
   <td><div class="focus-meter"><div class="progress"><span style="width:${x[2]}"></span></div><b style="font-size:10px">${x[2]}</b></div></td>
   <td>${full ? x[3] : x[3]}</td>
   <td><span class="pill ${x[4]==="Excellent"||x[4]==="Good"?"good":"warn"}">${x[4]}</span></td>
 </tr>`).join("");
}
function notesPage(title){return `<div class="page"><div class="section-title"><div><h3>${title}</h3><p>Notes are linked automatically to subject and lecture date.</p></div><button class="primary-btn" onclick="showToast('Upload dialog opened.')">+ Upload notes</button></div><div class="panel">${[["08","OCT","Computer Vision","CNN Architecture & Image Features","Prof. Senthil Kumar"],["07","OCT","AI & Machine Learning","Model Evaluation & Metrics","Prof. Senthil Kumar"],["06","OCT","Data Structures","Trees and Graph Traversal","Prof. Senthil Kumar"]].map(x=>`<div class="note-card"><div class="note-date">${x[0]}<br>${x[1]}</div><div style="flex:1"><h5>${x[2]} · ${x[3]}</h5><p>${x[4]} · Lecture notes and resources</p></div><button class="download" onclick="showToast('Opening lecture notes…')">Open</button></div>`).join("")}</div></div>`}
function studentPage(s){
 if(s==="studentOverview") return `<div class="page"><div class="section-title"><div><h3>Your learning overview</h3><p>Welcome back, Pavan. Here's your classroom snapshot.</p></div><div class="date-chip">08 Oct 2026</div></div><div class="stat-grid"><div class="stat-card"><div class="stat-top">Overall attendance</div><h4>89.6%</h4><span class="delta">Above 85% target</span></div><div class="stat-card"><div class="stat-top">Classes attended</div><h4>112</h4><span class="delta">of 125 classes</span></div><div class="stat-card"><div class="stat-top">Focus score</div><h4>91%</h4><span class="delta">Excellent</span></div><div class="stat-card"><div class="stat-top">New notes</div><h4>4</h4><span class="delta">Since Monday</span></div></div><div class="dashboard-grid"><div class="panel"><h4>Subject attendance</h4><div class="list">${[["AI & Machine Learning","94%"],["Data Structures","91%"],["Computer Vision","88%"],["Database Systems","85%"]].map(x=>`<div class="list-row"><strong>${x[0]}</strong><div class="focus-meter"><div class="progress"><span style="width:${x[1]}"></span></div><b style="font-size:10px">${x[1]}</b></div></div>`).join("")}</div></div><div class="panel"><h4>Personal alerts</h4><div class="alert-box" style="background:#fff6dc"><strong>Attention notice</strong><p>A classroom incident involving your name is pending faculty review. Please speak with your mentor if you need clarification.</p><button onclick="showSection('studentAlerts')">View details</button></div></div></div></div>`;
 if(s==="attendance") return `<div class="page"><div class="section-title"><div><h3>My attendance</h3><p>Keep your attendance above the required threshold.</p></div></div><div class="panel"><table class="table"><thead><tr><th>Subject</th><th>Attended</th><th>Total</th><th>Percentage</th><th>Status</th></tr></thead><tbody>${[["AI & Machine Learning",34,36,"94%","Excellent"],["Data Structures",32,35,"91%","Good"],["Computer Vision",29,33,"88%","Good"],["Database Systems",17,20,"85%","On track"]].map(x=>`<tr><td><strong>${x[0]}</strong></td><td>${x[1]}</td><td>${x[2]}</td><td><strong>${x[3]}</strong></td><td><span class="pill good">${x[4]}</span></td></tr>`).join("")}</tbody></table></div></div>`;
 if(s==="studentNotes") return notesPage("Your lecture notes");
 if(s==="studentAlerts") return `<div class="page"><div class="section-title"><div><h3>My alerts</h3><p>Important classroom and academic notifications.</p></div></div><div class="panel"><div class="alert-box"><strong>⚠ Attention required</strong><p><b>08 Oct 2026 · 11:18 AM</b><br>An AI classroom system flag associated with your session has been sent to faculty for human review. This notification does not itself establish wrongdoing.</p><button onclick="showToast('Your mentor contact details are shown in the backend version.')">Contact mentor</button></div></div></div>`;
 return `<div class="page"><div class="section-title"><div><h3>My timetable</h3><p>Today's classes.</p></div></div><div class="panel"><div class="schedule">${[["09:00","Database Systems","Room 204"],["10:00","AI & Machine Learning","Lab 3"],["12:00","Data Structures","Room 118"],["14:30","Computer Vision","Lab 2"]].map(x=>`<div class="time">${x[0]}</div><div class="event"><strong>${x[1]}</strong><small>${x[2]}</small></div>`).join("")}</div></div></div>`;
}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500)}
function toggleSignup(e){e.preventDefault();showToast("Account creation screen will be connected next.")}
selectRole("faculty");
